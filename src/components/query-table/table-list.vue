<template>
  <div class="table-list" style="width: 100%">
    <el-table
      v-bind="attr"
      class="default-table"
      :height="tableHeight"
      :data="tableData"
      :default-sort = "{prop: 'name', order: 'descending'}"
      style="width: 100%"
      @sort-change="sortChange"
      @row-dblclick="rowDblClick"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="index"
        fixed="left"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="options.type === 'selection'"
        type="selection"
        fixed="left"
        width="50">
      </el-table-column>
      <template v-for="(col, i) in columns">
        <el-table-column
          sortable="custom"
          :prop="col.key"
          :key="col.key + i"
          :label="col.label"
          :width="col.width">
        </el-table-column>
      </template>
      <el-table-column
        v-if="operation && operation.options.length > 0"
        header-align="center"
        :fixed="operation.fixed"
        :label="operation.label"
        :width="operation.width">
        <template slot-scope="scope">
          <el-button class="table-btn"
             v-for="(btn, i) in operation.options"
             :key="btn.label+i"
             :icon="btn.icon"
             :size="btn.size || 'mini'"
             v-show="operationShow(btn, scope.row)"
             :type="btn.type || 'primary'"
             :disabled="operationDisabled(btn, scope.row)"
             @click.stop="handleCommand(btn, scope.row)">
            {{btn.label}}
          </el-button>
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
    // 表格选项
    options: {
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
    // 选中
    handleSelectionChange (val) {
      // this.multipleSelection = val
      if (!this.options.selectionChange) {
        return
      }
      this.options.selectionChange(val)
    },
    // 双击行
    rowDblClick (row, column, event) {
      // console.log(row, column, event)
      if (!this.options.rowDblClick) {
        return
      }
      this.options.rowDblClick(row)
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
    // 自定义排序 custom
    sortChange ({ column, prop, order }) {
      console.log(column)
      console.log(prop)
      console.log(order)
      this.$emit('sortChange', { column, prop, order })
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
    margin-right: 8px;
    cursor: pointer;
  }
</style>
