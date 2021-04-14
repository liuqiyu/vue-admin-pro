<template>
  <div class="kye-edit-table">
    <el-table :max-height="tableMaxHeight"
              ref="multipleTable"
              :data="tData.data"
              :row-class-name="rowClassName"
              row-key="_uuid"
              :stripe="false"
              border
              @header-dragend="headerDragend"
              @current-change="selectRow"
              @selection-change="selectionRow"
              @row-click="rowClick">
      <el-table-column v-if="showCheckbox"
                       :resizable="false"
                       fixed
                       type="selection"
                       width="40">
      </el-table-column>
      <el-table-column v-if="showIndex"
                       :resizable="false"
                       fixed
                       type="index"
                       label="序号"
                       width="50">
      </el-table-column>
      <slot name="handle"></slot>
      <el-table-column v-for="(column, index) in columnConfig"
                       :key="index"
                       :fixed="column.fixed"
                       :resizable="!column.fixed"
                       :prop="column.key"
                       :label="column.label"
                       :width="column.fixed && column.width"
                       :min-width="!column.fixed && column.width"
                       :render-header="renderHeader"
                       :class-name="(column.type === 'text' || !column.type) ? 'kye-edit-table__column-bg' : ''">
        <template slot-scope="scope">
          <edit-content :row="scope.row"
                        :column="column"
                        :tIndex="scope.$index"
                        :val="scope.row[column.key]"
                        @selectChange="selectChange"
                        @searchTipsSelect="searchTipsSelect"
                        @searchTipsClose="searchTipsClose"
                        @clearSelectEdit="clearSelectEdit"
                        @inputChange="inputChange"
                        @datetimeChange="datetimeChange"
                        @decrypt="decrypt" />
        </template>
      </el-table-column>
      <slot name="handleRight"></slot>
    </el-table>
    <div v-if="pages">
      <el-pagination style="margin-top: 12px;"
                     background
                     @size-change="pageSizeChange"
                     @current-change="pageCurrentChange"
                     :page-size="pages.size"
                     :total="pages.total"
                     :current-page="currentPage"
                     :page-sizes="$pagination.pageSizes"
                     :layout="$pagination.layout">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { differenceWith, isEqual } from 'lodash'
import cellRender from './cell-render'
import tips from './tips'
import hideDrop from './../../mixins/hide-dropdown'
import Schema from 'async-validator'
import EditContent from './edit-form'
import { date } from './../../utils/filter'
const ustr = () => Math.random().toString(36).substr(3)
const uuid = () => ustr() + ustr()
const editClassReg = /input|select|picker|search|area/
export default {
  name: 'kye-edit-table',
  mixins: [hideDrop],
  components: {
    cellRender,
    tips,
    EditContent
  },
  props: {
    status: {
      type: String,
      default: 'add'
    },
    column: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    pages: Object,
    showIndex: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [Number, String]
    }
  },
  data () {
    return {
      currentPage: 1,
      tData: {
        data: []
      },
      hIndex: 0,
      inputTimer: null,
      catchData: [],
      originData: [],
      columnConfig: []
    }
  },
  computed: {
    tableMaxHeight () {
      return this.maxHeight
    },
    rules () {
      let rules = {}
      this.columnConfig.forEach((t, i) => {
        if (t.rule) {
          rules[t.key] = t.rule
          if (t.type === 'input-number') {
            if (Array.isArray(t.rule)) {
              rules[t.key][0].type = 'number'
              rules[t.key][0].transform = v => Number(v)
            } else {
              rules[t.key].type = 'number'
              rules[t.key].transform = v => Number(v)
            }
          } else if (t.type === 'date-picker') {
            const format = t.option ? t.option.valueFormat || 'YYYY-MM-DD' : ''
            if (Array.isArray(t.rule)) {
              rules[t.key][0].transform = v => date(v, format)
            } else {
              rules[t.key].transform = v => date(v, format)
            }
          } else if (t.filter && t.filter.type === 'lookup') {
            if (Array.isArray(t.rule)) {
              rules[t.key][0].transform = v => String(v)
            } else {
              rules[t.key].transform = v => String(v)
            }
          }
        }
      })
      return rules
    }
  },
  methods: {
    // 缓存数据
    toCatch (data) {
      let index = 0
      this.originData = JSON.parse(JSON.stringify(data))
      this.tData.data = []
      this.catchData = []
      for (let item of data) {
        if (this.status === 'edit') {
          item._type = 'edit'
        } else if (!item._type) {
          item._type = 'add'
        }
        if (!item._uuid) {
          item._uuid = uuid()
        }
        item._tIndex = index
        this.tData.data.push({ ...item })
        this.catchData.push({ ...item })
        index += 1
      }
    },
    // 选择行事件
    selectRow (row) {
      let obj = { ...row }
      let index = obj._tIndex
      this.$emit('selectRow', index, obj)
    },
    selectionRow (val) {
      let arr = val.map(item => ({ ...item }))
      arr.sort((old, fresh) => fresh._tIndex - old._tIndex)
      this.$emit('checkboxRow', arr)
    },
    // 添加
    addRow (item) {
      let index = this.tData.data.length
      if (this.status === 'edit') {
        item._type = 'edit'
      } else if (!item._type) {
        item._type = 'add'
      }
      item._isNew = true
      item._uuid = uuid()
      item._tIndex = index
      this.tData.data.push({ ...item })
      this.catchData.push({ ...item })
    },
    // 编辑行
    editeRow (index) {
      this.tData.data[index]._type = 'edit'
    },
    // 保存数据
    async saveRow (index, row) {
      if (row._isNew) {
        row._isNew = false
      }
      Object.keys(row).forEach(item => {
        this.catchData[index][item] = this.tData.data[index][item]
      })
      this.tData.data[index]._type = 'add'
    },
    // 取消编辑
    cancelRow (index, row) {
      if (row._isNew) {
        this.delRow(index)
        return
      }
      Object.keys(row).forEach(item => {
        this.tData.data[index][item] = this.catchData[index][item]
      })
      this.tData.data[index]._type = 'add'
    },
    // 删除一行
    delRow (index) {
      this.tData.data.splice(index, 1)
      this.catchData.splice(index, 1)
      this.changeIndex()
    },
    // 页码改变
    pageSizeChange (size) {
      this.$emit('pageSize', size)
    },
    // 页码改变
    pageCurrentChange (page) {
      this.$emit('pageChange', page)
    },
    // 表单验证
    // validate (formName) {
    //   return new Promise((resolve, reject) => {
    //     this.$refs.editTableRule.validate((valid) => {
    //       if (valid) {
    //         resolve(true)
    //       } else {
    //         resolve(false)
    //       }
    //     })
    //   })
    // },
    validate (index) {
      const self = this
      let validator = new Schema(self.rules)
      const valid = (i) => {
        return new Promise((resolve, reject) => {
          validator.validate(self.tData.data[i], (errors, fields) => {
            if (errors) {
              const key = Object.keys(fields)[0] || ''
              const col = self.columnConfig.find(col => col.key === key)
              let label = col ? col.label : ''
              self.$message.error(`${label}-第${self.tData.data[i]._tIndex + 1}行：${errors[0].message}`)
              resolve(false)
            } else {
              resolve(true)
            }
          })
        })
      }

      const returnPromise = (p) => {
        return new Promise((resolve, reject) => {
          resolve(p)
        })
      }

      const loop = async (arr) => {
        for (let t of arr) {
          let v = await valid(t._tIndex)
          if (!v) {
            return returnPromise(false)
          }
        }
        return returnPromise(true)
      }
      if (index !== undefined) {
        return valid(index)
      } else {
        let arr = self.tData.data.filter(k => k._type === 'edit')
        return loop(arr)
      }
    },
    getEditTableFrom () {
      return this.$refs.editTableRule
    },
    // 表头渲染
    renderHeader (h, { column, $index }) {
      let label = column.label || ''
      let c = this.column[$index - this.hIndex]
      let isRender = false
      if (c && c.rule) {
        if (Array.isArray(c.rule)) {
          for (let obj of c.rule) {
            if (obj.required) {
              isRender = true
              break
            }
          }
        } else if (c.rule.required) {
          isRender = true
        }
      }
      if (isRender) {
        return h('span', {}, [
          h('i', { style: { color: '#ff5555', paddingRight: '3px' } }, '*'),
          label
        ])
      } else {
        return h('span', label)
      }
    },
    // 获取双向绑定的数据
    getData () {
      return this.tData.data
    },
    // 获取双向绑定真实的数据
    getRealData () {
      let data = JSON.parse(JSON.stringify(this.tData.data))
      return data.map(x => {
        delete x._type
        delete x._tIndex
        delete x._uuid
        delete x._isNew
        return x
      })
    },
    // 获取改变后的数据
    getDiffData () {
      return differenceWith(this.getRealData(), this.originData, isEqual)
    },
    // change index
    changeIndex () {
      if (this.tData.data.length > 0) {
        for (let i = 0, len = this.tData.data.length; i < len; i++) {
          this.tData.data[i]._tIndex = i
          this.catchData[i]._tIndex = i
        }
      }
    },
    toChangeStatus () {
      if (this.tData.data.length > 0) {
        for (let i = 0, len = this.tData.data.length; i < len; i++) {
          this.tData.data[i]._type = this.status
        }
      }
    },
    rowClassName ({ row }) {
      if (row._type === 'edit' && this.columnConfig.some(v => editClassReg.test(v.type))) {
        return 'is-edit'
      }
      return 'is-add'
    },
    headerDragend (newWidth, oldWidth, column, event) {
      for (const col of this.columnConfig) {
        if (col.key === column.property) {
          if (col.hasOwnProperty('width')) {
            col.width = newWidth
          } else {
            this.$set(col, 'width', newWidth)
          }
          break
        }
      }
    },
    rowClick (row, event, column) {
      if (this.showCheckbox) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },
    selectChange (prams) {
      const { index, val, column, data } = prams
      const prow = this.tData.data[index]
      prow[column.key] = val
      column.change && column.change(index, prow, data)
    },
    searchTipsSelect (val) {
      let { index, column, str, ids, data, tags } = val
      const prow = this.tData.data[index]
      prow[column.key] = str
      if (column.ids) {
        prow[column.ids] = ids
      }
      if (column.change) {
        column.change(index, prow, data, tags)
      }
    },
    searchTipsClose (val) {
      let { index, column, str, ids, tags } = val
      const prow = this.tData.data[index]
      prow[column.key] = str
      if (column.ids) {
        prow[column.ids] = ids
      }
      if (column.tagClose) {
        column.tagClose(index, prow, tags)
      }
    },
    clearSelectEdit (val) {
      const { index, row, column, select } = val
      const prow = this.tData.data[index]
      prow[column.key] = Array.isArray(select) ? [] : ''
      column.clear && column.clear(index, row, column)
    },
    inputChange (val) {
      const { index, column, text } = val
      const prow = this.tData.data[index]
      prow[column.key] = text
      column.change && column.change(index, prow, text)
    },
    datetimeChange (val) {
      const { index, column, text } = val
      const prow = this.tData.data[index]
      prow[column.key] = text
      column.change && column.change(index, prow, text)
    },
    decrypt (val) {
      const { index, column, text } = val
      this.tData.data[index][column.key] = text
    }
  },
  created () {
    this.columnConfig = this.column
    this.toCatch(this.data)
    if (this.showIndex) {
      this.hIndex++
    }
    if (this.showCheckbox) {
      this.hIndex++
    }
    if (this.$slots.handle) {
      this.hIndex++
    }
  },
  watch: {
    data (val) {
      this.toCatch(val)
    },
    column: {
      handler (val) {
        this.columnConfig = val
      },
      deep: true
    },
    status () {
      this.toChangeStatus()
    }
  }
}
</script>

<style lang="scss">
.kye-edit-table {
  .el-table__empty-block {
    border-bottom: 1px solid #dcdae2;
  }
  .el-table tr,
  .el-table td {
    height: 32px !important;
    max-height: 32px;
    line-height: 32px;
  }
  .el-form-item__label {
    float: left;
    padding-right: 0;
  }
  .formItemText {
    .el-form-item--mini.el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__error {
      height: 0;
    }
  }
  .downloadEdit {
    height: 28px;
    line-height: 28px;
    .el-upload {
      line-height: 28px;
    }
    a.kye-label-click {
      line-height: 28px;
    }
  }
  .el-form-item {
    margin-bottom: 0 !important;
    &.is-required .el-form-item__label:before {
      display: none;
    }
  }
  .el-form-item__content {
    border: none !important;
    .el-icon- {
      display: none;
    }
  }
  .el-form-item__error {
    position: static;
  }
  .is-edit .kye-edit-table__column-bg {
    background-color: #f5f5f5 !important;
  }
  .is-edit .cell {
    padding: 0 6px;
    .el-input__inner:focus {
      border-color: #dcdae2;
      background-color: #fff;
    }
  }
  .pagination-warp {
    margin: 16px -16px 0;
    border-top: 1px solid #dcdae2;
  }
  .pagination {
    padding: 16px 16px 0;
  }
  .cell .el-input--mini {
    min-width: 60px;
    .el-input__inner {
      border-color: transparent;
      background-color: transparent;
    }
  }
  .tableContent {
    flex: 1;
  }
  .tableContentText {
    line-height: 28px;
    width: 100%;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 8px;
  }
}
</style>
