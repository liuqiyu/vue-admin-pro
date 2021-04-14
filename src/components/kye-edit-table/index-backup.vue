<template>
  <div class="kye-edit-table">
    <kye-form :model.sync="tData"
              ref="editTableRule">
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
        <el-table-column v-if="showIndex"
                         :resizable="false"
                         fixed
                         type="index"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column v-if="showCheckbox"
                         :resizable="false"
                         fixed
                         type="selection"
                         width="50">
        </el-table-column>
        <el-table-column v-for="(column, index) in columnConfig"
                         :key="index"
                         :fixed="column.fixed"
                         :resizable="!column.fixed"
                         :prop="column.key"
                         :label="column.label"
                         :render-header="renderHeader"
                         :width="column.fixed && column.width"
                         :min-width="!column.fixed && column.width"
                         :class-name="column.type === 'text' ? 'kye-edit-table__column-bg' : ''">
          <template slot-scope="scope">
            <div v-if="column.type == 'upload'"
                 :class="scope.row._type=='edit' ? 'downloadEdit' : ''">
              <el-upload :show-file-list="(column.option && column.option.showList) ? column.option.showList : false"
                         :code="(column.option && column.option.code) ? column.option.code : ''"
                         :disabled="setDisabled(column, scope.row)"
                         :id="(column.option && column.option.id) ? column.option.id : scope.row._uuid"
                         btn-type="text"
                         btn-icon=""
                         :limit="(column.option && column.option.limit) ? column.option.limit : undefined"
                         :size="(column.option && column.option.size) ? column.option.size : undefined"
                         :list-type="(column.option && column.option.listType) ? column.option.listType : 'text'"
                         :accept="(column.option && column.option.accept) ? column.option.accept : ['excel', 'word', 'pdf', 'image', 'zip']"
                         v-model="scope.row[column.key]"
                         @success="e => uploadSuccess(e, scope.$index, scope.row, column)">
                <el-button size="small"
                           type="primary">点击上传
                </el-button>
              </el-upload>
            </div>
            <div v-else-if="column.type == 'download'"
                 :class="scope.row._type=='edit' ? 'downloadEdit' : ''">
              <a v-if="scope.row[column.key] && scope.row[column.key].length > 0"
                 target="_blank"
                 :href="scope.row[column.key]"
                 class="kye-label-click">下载</a>
            </div>
            <div v-else
                 :class="scope.row._type=='edit' ? 'formItemEdit' : 'formItemText'">
              <kye-form-item :label="(tData.data[scope.$index][`${column.key}Mask`]||tData.data[scope.$index][`${column.key}Virtual`]) && tData.data[scope.$index][`${column.key}`].includes('****') ? '解密' : ''"
                             :label-width="(tData.data[scope.$index][`${column.key}Mask`]||tData.data[scope.$index][`${column.key}Virtual`]) && tData.data[scope.$index][`${column.key}`].includes('****') ? '28px' : '0px'"
                             :biz-id="scope.row[column.bizIdKey]"
                             :module-code="column.moduleCode"
                             :field-name="column.fieldName"
                             :prop="'data.' + scope.$index + '.' + column.key">
                <template v-if="column.type && column.type != 'text' && scope.row._type=='edit'">
                  <div @click="disablRowClick">
                    <el-input :clearable="!!column.clearable"
                              :disabled="setDisabled(column, scope.row)"
                              :maxlength="column.maxlength"
                              :minlength="column.minlength"
                              placeholder=" "
                              v-if="column.type == 'input'"
                              v-model="scope.row[column.key]"
                              v-on:keyup.enter.native="inputEnter(scope.$index, scope.row, column)"
                              @clear="clearEdit(scope.$index, scope.row, column)"
                              @blur="inputBlur(scope.$index, scope.row, column)"
                              @input="inputChange(scope.$index, scope.row, column)" />
                    <el-input-number :clearable="!!column.clearable"
                                     :disabled="setDisabled(column, scope.row)"
                                     :symbol="column.symbol"
                                     :unit="column.unit"
                                     :precision="column.precision"
                                     :max="column.max"
                                     :min="column.min"
                                     :maxlength="column.maxlength"
                                     :minlength="column.minlength"
                                     placeholder=" "
                                     v-else-if="column.type == 'input-number'"
                                     v-model="scope.row[column.key]"
                                     @clear="clearEdit(scope.$index, scope.row, column)"
                                     @blur="inputBlur(scope.$index, scope.row, column)"
                                     @input="inputChange(scope.$index, scope.row, column)" />
                    <el-checkbox v-else-if="column.type == 'checkbox'"
                                 :disabled="setDisabled(column, scope.row)"
                                 :true-label="column.trueLabel || 1"
                                 :false-label="column.falseLabel || 0"
                                 v-model="scope.row[column.key]"
                                 @change="checkboxChange(scope.$index, scope.row, column)" />
                    <e-select v-else-if="column.type == 'select'"
                              :disabled="setDisabled(column, scope.row)"
                              :model="scope.row[column.key]"
                              :index="scope.$index"
                              placeholder=" "
                              :column="column"
                              :row="scope.row"
                              @clear="(select) => { clearSelectEdit(scope.$index, scope.row, column, select) }"
                              @selectRemote="selectRemote" />
                    <el-date-picker v-else-if="column.type == 'date-picker'"
                                    :clearable="!!column.clearable"
                                    :disabled="setDisabled(column, scope.row)"
                                    v-model="scope.row[column.key]"
                                    :format="(column.option && column.option.format) ? column.option.format : 'yyyy-MM-dd HH:mm:ss'"
                                    :type="(column.option && column.option.type) ? column.option.type : 'datetime'"
                                    :value-format="(column.option && column.option.valueFormat) ? column.option.valueFormat : 'yyyy-MM-dd HH:mm:ss'"
                                    :picker-options="(column.option && column.option.pickerOptions) ? column.option.pickerOptions : {}"
                                    placeholder=" "
                                    @clear="clearEdit(scope.$index, scope.row, column)"
                                    @change="datetimeChange(scope.$index, scope.row, column)" />
                    <search-tips v-else-if="column.type == 'search-tips'"
                                 :index="scope.$index"
                                 :column="column"
                                 :data="scope.row"
                                 :model="scope.row[column.key]"
                                 @clear="clearEdit(scope.$index, scope.row, column)"
                                 @select="searchTipsSelect"
                                 @close="searchTipsClose" />
                    <el-time-select v-else-if="column.type == 'time-select'"
                                    v-model="scope.row[column.key]"
                                    :disabled="setDisabled(column, scope.row)"
                                    :clearable="!!column.clearable"
                                    :picker-options="(column.options && column.options.pickerOptions) ? column.options.pickerOptions : {
                        start: '07:00',
                        step: '00:15',
                        end: '22:30'
                      }"
                                    placeholder=" "
                                    @clear="clearEdit(scope.$index, scope.row, column)"
                                    @change="timeSelectChange(scope.$index, scope.row, column)" />
                    <el-time-picker v-else-if="column.type == 'time-picker'"
                                    v-model="scope.row[column.key]"
                                    :clearable="!!column.clearable"
                                    :disabled="setDisabled(column, scope.row)"
                                    :format="(column.option && column.option.format) ? column.option.format : 'HH:mm:ss'"
                                    :picker-options="(column.options && column.options.pickerOptions) ? column.options.pickerOptions : {selectableRange: '00:00:00 - 23:59:59'}"
                                    placeholder=" "
                                    @clear="clearEdit(scope.$index, scope.row, column)"
                                    @change="timePickerChange(scope.$index, scope.row, column)" />
                    <kye-area-remote v-if="column.type == 'area'"
                                     v-model="scope.row[column.key]"
                                     :level="column.level ? column.level : 5"
                                     @change="(data) => { areaRemoteChange(scope.$index, scope.row, column, data) }" />
                  </div>
                </template>
                <template v-else>
                  <div :class="column.click ? 'kye-label-click' : ''">
                    <cell-render v-if="column.render && (typeof column.render === 'function')"
                                 :index="scope.$index"
                                 :value="scope.row[column.key]"
                                 :column="column"
                                 :crender="column.render" />
                    <kye-button @click="clickRow(scope.$index, scope.row, column.click)"
                                v-else-if="column.click"
                                type="text"
                                :auth="column.auth">
                      {{getButtonText(column.buttonText, scope.row, column.key)}}
                    </kye-button>
                    <tips @click="clickRow(scope.$index, scope.row, column.click)"
                          v-else
                          :width="column.width"
                          :content="format(column, scope.row[column.key])" />
                  </div>
                </template>
              </kye-form-item>
            </div>
          </template>
        </el-table-column>
        <slot name="handle"></slot>
      </el-table>
    </kye-form>
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
import eSelect from './select'
import cellRender from './cell-render'
import searchTips from './search-tips'
import tips from './tips'
import hideDrop from './../../mixins/hide-dropdown'
import Schema from 'async-validator'
const ustr = () => Math.random().toString(36).substr(3)
const uuid = () => ustr() + ustr()
const editClassReg = /input|select|picker|search|area/
export default {
  name: 'kye-edit-table',
  mixins: [hideDrop],
  components: {
    eSelect,
    cellRender,
    searchTips,
    tips
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
    },
    // highlightCurrentRow: {
    //   type: Boolean,
    //   default: true
    // }
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
          if (t.filter && t.filter.type === 'lookup') {
            if (Array.isArray(t.rule)) {
              rules[t.key][0].transform = (val) => {
                return String(val)
              }
            } else {
              rules[t.key].transform = (val) => {
                return String(val)
              }
            }
          }
          if (t.type === 'input-number') {
            if (Array.isArray(t.rule)) {
              rules[t.key][0].type = 'number'
              rules[t.key][0].transform = (val) => {
                return Number(val)
              }
            } else {
              rules[t.key].type = 'number'
              rules[t.key].transform = (val) => {
                return Number(val)
              }
            }
          }
        }
      })
      return rules
    }
  },
  methods: {
    // 格式化数据
    format (column, val) {
      let value = val
      if (column.filter && value) {
        if (column.filter.type && column.filter.args) {
          let func = this.$filter[column.filter.type]
          if (func) {
            value = func(value, ...column.filter.args)
          }
        } else {
          let func = this.$filter[column.filter]
          if (func) {
            value = func(value)
          }
        }
      }
      let type = Object.prototype.toString.call(value)
      if (type.indexOf('Null') > -1 || type.indexOf('Undefined') > -1) {
        value = ''
      }
      return value + ''
    },
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
    // 输入框改变事件
    inputChange (index, row, column) {
      clearInterval(this.inputTimer)
      this.inputTimer = setTimeout(() => {
        if (typeof row[column.key] === 'string') {
          row[column.key] = row[column.key].trim()
        }
        column.change && column.change(index, row, row[column.key])
      }, 250)
    },
    // 输入框失去焦点事件
    inputBlur (index, row, column) {
      column.blur && column.blur(index, row, row[column.key])
    },
    // checkbox改变事件
    checkboxChange (index, row, column) {
      column.change && column.change(index, row)
    },
    // datetimeChange 事件
    datetimeChange (index, row, column) {
      column.change && column.change(index, row, row[column.key])
    },
    // 远程select获取选择
    selectRemote (prams) {
      const { index, val, column, data } = prams
      this.tData.data[index][column.key] = val
      column.change && column.change(index, this.tData.data[index], data)
    },
    // 行点击事件
    clickRow (index, row, fn) {
      fn && fn(index, row)
    },
    inputEnter (index, row, col) {
      col.enter && col.enter(index, row, col)
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
      let i = this.hIndex
      let c = this.column[$index - i]
      if (c && c.rule) {
        let isRender = false
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
        if (isRender) {
          return h('span', {}, [
            h('i', { style: { color: '#ff5555', paddingRight: '3px' } }, '*'),
            label
          ])
        } else {
          return h('span', label)
        }
      } else {
        return h('span', label)
      }
    },
    rowClick (row, event, column) {
      if (this.showCheckbox) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },
    // 输入框点击的时候会阻止冒泡
    disablRowClick (e) {
      e.stopPropagation()
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
    searchTipsSelect (val) {
      let { index, column, str, ids, data, tags } = val
      this.tData.data[index][column.key] = str
      if (column.ids) {
        this.tData.data[index][column.ids] = ids
      }
      if (column.change) {
        column.change(index, this.tData.data[index], data, tags)
      }
    },
    searchTipsClose (val) {
      let { index, column, str, ids, tags } = val
      this.tData.data[index][column.key] = str
      if (column.ids) {
        this.tData.data[index][column.ids] = ids
      }
      if (column.tagClose) {
        column.tagClose(index, this.tData.data[index], tags)
      }
    },
    // time select change
    timeSelectChange (index, row, column) {
      if (column.change) {
        let value = row[column.key]
        column.change(index, row, column, value)
      }
    },
    timePickerChange (index, row, column) {
      if (column.change) {
        let value = row[column.key]
        column.change(index, row, column, value)
      }
    },
    clearEdit (index, row, column) {
      column.clear && column.clear(index, row, column)
    },
    clearSelectEdit (index, row, column, select) {
      this.tData.data[index][column.key] = Array.isArray(select) ? [] : ''
      column.clear && column.clear(index, row, column)
    },
    uploadSuccess (data, index, row, column) {
      column.change && column.change(index, row, data)
    },
    areaRemoteChange (index, row, column, data) {
      column.change && column.change(index, row, data)
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
    getButtonText (buttonText, row, key) {
      let str = ''
      if (buttonText) {
        str = typeof buttonText === 'function' ? buttonText(row) : buttonText
      } else {
        str = row[key]
      }
      return str
    },
    setDisabled (col, row) {
      if (col.disabled && typeof col.disabled === 'function') {
        return col.disabled(row)
      }
      return !!col.disabled
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
}
</style>
