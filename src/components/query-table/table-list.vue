<template>
  <div class="table-list" style="width: 100%">
    <el-table
      v-bind="attr"
      class="default-table"
      :height="tableHeight"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="index"
        fixed="left"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        type="selection"
        fixed="left"
        width="50">
      </el-table-column>
      <template v-for="(col, i) in columns">
        <el-table-column
          :prop="col.key"
          :key="col.key + i"
          :label="col.label"
          :width="col.width">
        </el-table-column>
      </template>
      <el-table-column
        v-if="operation && operation.options.length > 0"
        :fixed="operation.fixed"
        :label="operation.label"
        :width="operation.width">
        <template slot-scope="scope">
          <a class="table-btn"
             v-show="operationShow(btn, scope.row)"
             v-for="(btn, i) in operation.options"
             :key="btn.label+i"
             type="text"
             :disabled="operationDisabled(btn, scope.row)"
             @click.stop="handleCommand(btn, scope.row)">
            {{btn.label}}
          </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'table-list',
  props: {
    // 参数
    attr: {
      type: Object,
      default: () => {}
    },
    // 表头
    columns: {
      type: Array,
      default: () => []
    },
    // 按钮
    operation: {
      type: Object,
      default: () => {}
    },
    // 数据
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      multipleSelection: [],
      tableHeight: null
    }
  },
  mounted () {
    this.handleResize()
    // this.$bus.$on('GLOBAL_RESIZE', this.handleResize);
  },
  beforeDestroy () {
    // this.$bus.$off('GLOBAL_RESIZE', this.handleResize);
  },
  methods: {
    handleCommand (btn, row) {
      if (!btn.func) {
        return
      }
      btn.func(row)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    operationDisabled (btn, row) {
      if (typeof btn.disabled === 'function') {
        return btn.disabled(row)
      }
      return !!btn.disabled
    },
    operationShow (btn, row) {
      if (!btn.show) {
        return true
      }
      if (typeof btn.show === 'function') {
        return btn.show(row)
      }
      return btn.show
    },
    handleResize () {
      // const bodyHeight = window.innerHeight || document.documentElement.clientHeight
      // const topbarHeight = document.querySelector('.topbar').clientHeight
      // const lqySearchPagerHeight = document.querySelector('.lqy-search-pager').clientHeight
      // const lqyPaginationHeight = document.querySelector('.lqy-pagination').clientHeight
      // this.tableHeight = `${bodyHeight - topbarHeight - lqySearchPagerHeight - lqyPaginationHeight - 60}px`
    }
  }
}
</script>

<style scoped lang="scss">
  @import './../../assets/scss/variable';
  .table-btn {
    color: $primary;
    margin-right: 8px;
    cursor: pointer;
  }
</style>
