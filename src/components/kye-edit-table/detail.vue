<template>
  <div class="kye-edit-table">
    <el-table :max-height="tableMaxHeight"
              ref="multipleTable"
              :data="tData.data"
              :row-class-name="'is-add'"
              border
              highlight-current-row
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
                        :width="column.fixed && column.width"
                        :min-width="!column.fixed && column.width">
        <template slot-scope="scope">
            <div v-if="column.type == 'download'">
              <a v-if="scope.row[column.key] && scope.row[column.key].length > 0"
                 target="_blank"
                 :href="scope.row[column.key]"
                 class="kye-label-click">下载</a>
            </div>
            <div v-else :class="column.click ? 'kye-label-click' : ''">
              <cell-render v-if="column.render && (typeof column.render === 'function')"
                            :index="scope.$index"
                            :value="scope.row[column.key]"
                            :column="column"
                            :crender="column.render" />
              <kye-button @click="clickRow(scope.$index, scope.row, column.click, column.key)"
                          v-else-if="column.click || scope.row.hasOwnProperty(column.key + 'Mask')"
                          type="text"
                          :auth="column.auth">
                {{getButtonText(column.buttonText, scope.row, column.key)}}
              </kye-button>
              <tips @click="clickRow(scope.$index, scope.row, column.click)"
                    v-else
                    :width="column.width || '100px'"
                    :content="format(column, scope.row[column.key])" />
            </div>
        </template>
      </el-table-column>
      <slot name="handle"></slot>
    </el-table>
    <div v-if="pages">
      <el-pagination style="margin-top:16px"
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
  import cellRender from './cell-render'
  import tips from './tips'
  import { decrypt } from './../../utils'
  export default {
    name: 'kye-detail-table',
    components: {
      cellRender,
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
      moduleCode: {
        type: [Number, String],
        default: ''
      }
    },
    data () {
      return {
        currentPage: 1,
        tData: {
          data: []
        },
        columnConfig: []
      }
    },
    computed: {
      tableMaxHeight () {
        return this.maxHeight
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
        this.tData.data = []
        for (let item of data) {
          item._tIndex = index
          this.tData.data.push({ ...item })
          index += 1
        }
      },
      // 行点击事件
      clickRow (index, row, fn, key) {
        if (row.hasOwnProperty(key + 'Mask')) {
          this.monitor(row, key)
        } else {
          fn && fn(index, row)
        }
      },
      // 监控方法
      async monitor (row, key) {
        const mk = `${key}Mask`
        const res = await decrypt({
          dataId: row.id || '11',
          moduleCode: this.moduleCode,
          fieldName: key,
          fieldContent: row[mk]
        })
        delete row[mk]
        row[key] = res
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
      // 页码改变
      pageSizeChange (size) {
        this.$emit('pageSize', size)
      },
      // 页码改变
      pageCurrentChange (page) {
        this.$emit('pageChange', page)
      },
      rowClick (row, event, column) {
        if (this.showCheckbox) {
          this.$refs.multipleTable.toggleRowSelection(row)
        }
      },
      // 获取双向绑定的数据
      getData () {
        return this.tData.data
      },
      getRealData () {
        return this.tData.data
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
      }
    },
    created () {
      this.columnConfig = this.column
      this.toCatch(this.data)
    },
    watch: {
      data (val) {
        this.toCatch(val)
      },
      column: {
        handler (val) {
          this.columnConfig = val
        }
      }
    }
  }
</script>

<style lang="scss">
  .kye-edit-table {
    .el-form-item {
      margin-top: 13px;
      margin-bottom: 13px !important;
    }
    .el-form-item__content {
      border: none !important;
    }
    .is-add td {
      padding: 7px 0;
      .cell {
        line-height: 29px;
      }
    }
    .is-edit td {
      padding: 0;
      .cell {
        line-height: normal;
      }
    }
    .pagination-warp {
      margin: 16px -16px 0;
      border-top: 1px solid #dcdae2;
    }
    .pagination {
      padding: 16px 16px 0;
    }
    .el-input--mini {
      min-width: 60px;
    }
  }
</style>
