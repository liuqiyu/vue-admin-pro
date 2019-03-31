<template>
  <div class="query-table" v-loading="loading">
    <!--<search-pager :option="option"-->
                  <!--:tools="tools"></search-pager>-->

    <!--<query-form :form-fields="formFields"></query-form>-->

    <slot name="middle-tools"></slot>

    <table-list
      :columns="tables.columns"
      :operation="tables.operation"
      :tableData="tableData"></table-list>
    <el-pagination
      class="lqy-pagination"
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
  computed: {
    // total () {
    //   // const obj = this.$store.state.queryTable[this.tables.url.uniqueKey]
    //   return obj.res.rowTotal
    // }
  },
  created () {
    this.initTables()
    // this.registerStoreModule()
  },
  methods: {
    initTables () {
      this.fetchTable()
    },
    loadTable () {
      this.fetchTable()
    },
    async fetchTable () {
      this.loading = true
      const data = await this.$http.get(this.tables.url.method)
      this.tableData = data.data
      this.tableData.forEach((item, index) => {
        this.$set(this.tableData[index], 'index', ((this.currentPage - 1) * this.pageSize) + (1 + index))
      })
      this.total = data.total
      // this.$store.commit(`queryTable/${this.tables.url.uniqueKey}/SET_QUERY_TABLE`, data)
      this.loading = false
    },
    // registerStoreModule() {
    //   this.$store.registerModule(['queryTable', this.tables.url.uniqueKey], createStoreMoudle())
    // },
    handleSizeChange (val) {
      this.pageSize = val
      console.log(val + '换1')
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(val + '换2')
    }
  }
}
</script>

<style scoped></style>
