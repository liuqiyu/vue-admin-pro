<template>
  <div class="query-table">
    <smart-query-form ref="queryForm"
                      class="query-form"
                      v-if="forms && forms.formFields && forms.formFields.length > 0"
                      :forms="forms"
                      @formSubmit="formSubmit"></smart-query-form>

    <slot name="middle-tools"></slot>

    <div class="table-wrapper">
      <smart-tool-list ref="smartButtonList"
                       class="smart-tool-list"
                       v-if="tools.length > 0"
                       :tools="tools">
      </smart-tool-list>

      <table-list ref="tableList"
                  class="smart-table-list"
                  v-loading="loading"
                  :columns="tables.columns"
                  :operation="tables.operation"
                  :options="tables.options"
                  :tableData="tableData"
                  @sort-change="sortChange"></table-list>
      <el-pagination v-if="!tables.options.noPagination"
                     class="smart-pagination"
                     ref="smartPagination"
                     background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <slot name="bottom-tools"></slot>
  </div>
</template>

<script>
import TableList from './table-list'
export default {
  name: 'smart-query-table',
  components: {
    TableList
  },
  props: {
    tools: {
      type: Array,
      default: () => []
    },
    forms: {
      type: Object,
      default: () => { }
    },
    tables: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      queryModel: {}
    }
  },
  async created () {
    // initHttp 控制初始化表格是否请求
    if (this.tables.options && this.tables.options.initHttp !== false) {
      this.initTables()
    }
    // 自定义表头
    if (this.tables.options && this.tables.options.renderHeader && typeof this.tables.options.renderHeader === 'function') {
      this.tables.columns = await this.tables.options.renderHeader()
    }
  },
  methods: {
    // 初始化
    initTables () {
      const obj = this.getModel()
      this.fetchTable(obj)
    },
    // 主动
    loadTable (callback) {
      const obj = this.getModel()
      this.fetchTable(obj, callback)
    },
    // 搜索
    formSubmit (model = {}) {
      this.currentPage = 1
      this.queryModel = {} // 清空条件
      this.tables.url.obj = {} // 清空传递默认条件
      this.fetchTable(model)
    },
    // 请求数据
    async fetchTable (model = {}, callback) {
      const obj = this.tables.url.obj || {}
      this.queryModel = Object.assign({}, obj, this.queryModel)

      let paginationObj = {}
      if (this.tables.options && !this.tables.options.noPagination) {
        // 有分页
        paginationObj = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }

      this.queryModel = Object.assign({}, this.queryModel, {
        ...model,
        ...paginationObj
      })
      console.log('queryModel', this.queryModel)
      // 请求前回调函数
      if (this.tables.options && typeof this.tables.options.beforeHttp === 'function') {
        this.tables.options.beforeHttp()
      }
      try {
        this.loading = true
        const { data } = await this.$http.post(this.tables.url.method, this.queryModel)
        console.log('query-table请求数据！', data)
        if (this.tables.type === 'customHeader') {
          this.tables.columns = data.header
        }
        this.tableData = Object.freeze(data.data)

        // 请求成功后回调函数
        if (this.tables.options && typeof this.tables.options.afterHttp === 'function') {
          this.tables.options.afterHttp(this.tableData, data)
        }

        this.tableData.forEach((item, index) => {
          this.$set(this.tableData[index], 'index', ((this.currentPage - 1) * this.pageSize) + (1 + index))

          // 自定义列表输出文字
          if (this.tables.formatter && Object.keys(this.tables.formatter).length > 0) {
            Object.keys(this.tables.formatter).forEach((key) => {
              if (Object.keys(item).indexOf(key)) {
                this.$set(this.tableData[index], key, this.tables.formatter[key](item))
              }
            })
          }
        })
        this.total = data.total

        // 为了解决异步队列问题
        if (callback && typeof callback === 'function') {
          callback(this.tableData)
        }
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    // 获取form表单参数
    getModel () {
      const obj = {}
      this.forms.formFields.forEach((item, index) => {
        // 初始化数据
        obj[item.field] = !item.defaultValue && item.defaultValue !== 0 ? null : item.defaultValue
      })
      return obj
    },
    // 切换条数
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchTable()
    },
    // 切换页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchTable()
    },
    // 排序
    sortChange (val) {
      this.fetchTable(val)
    }
  }
}
</script>

<style scoped lang="scss">
.query-table {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.query-form {
  flex: none;
}
.table-wrapper {
  flex: 1;
  height: 0;
  background: #ffffff;
  border: 1px solid #dee8f8;
  margin-top: 12px;
  padding: 12px 12px 8px 12px;
  display: flex;
  flex-direction: column;
  .smart-table-list {
    flex: 1;
    height: 0;
    overflow: hidden;
  }
  .smart-tool-list {
    flex: none;
    padding-bottom: 5px;
  }
  .smart-pagination {
    flex: none;
    text-align: right;
    padding: 8px 0 0 0;
    ::v-deep .btn-next {
      margin-right: 0;
    }
    ::v-deep .el-pagination__total,
    ::v-deep .el-pagination__sizes {
      float: left;
    }
  }
}
</style>
