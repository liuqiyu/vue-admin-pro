<template>
  <div class="query-table" v-loading="loading">
    <tool-bar :tools="tools"></tool-bar>

    <query-form :form-fields="formFields"
                @formSubmit="formSubmit"></query-form>

    <slot name="middle-tools"></slot>

    <table-list
      :columns="tables.columns"
      :operation="tables.operation"
      :options="tables.options"
      :tableData="tableData"
      @sort-change="sortChange"></table-list>
    <el-pagination
      class="asp-pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total">
    </el-pagination>
    <slot name="bottom-tools"></slot>
  </div>
</template>

<script>
// import createStoreMoudle from './../../store/module/queryTable/factory'
export default {
  name: 'query-table',
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    tools: {
      type: Array,
      default: () => []
    },
    formFields: {
      type: Array,
      default: () => []
    },
    tables: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  created () {
    this.initTables()
  },
  methods: {
    initTables () {
      this.fetchTable()
    },
    loadTable () {
      this.fetchTable()
    },
    // 搜索
    formSubmit (model) {
      this.fetchTable()
    },
    async fetchTable () {
      try {
        this.loading = true
        // const data = await this.$http.get(this.tables.url.method, {
        //   params: {
        //     id: 1234
        //   }
        // })
        // this.tableData = data.data
        this.tableData = [
          {
            name: 1,
            gender: 1,
            age: 1
          },
          {
            name: 1,
            gender: 1,
            age: 1
          },
          {
            name: 1,
            gender: 1,
            age: 1
          }
        ]
        this.tableData.forEach((item, index) => {
          this.$set(this.tableData[index], 'index', ((this.currentPage - 1) * this.pageSize) + (1 + index))
        })
        // this.total = data.total
        this.total = 100
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      console.log(val + '换1')
      this.fetchTable()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(val + '换2')
      this.fetchTable()
    },
    sortChange (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
.asp-pagination {
  text-align: right;
  padding: 10px 0;
}
</style>
