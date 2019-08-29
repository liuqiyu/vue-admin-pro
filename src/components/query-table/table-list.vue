<template>
  <div class="table-list"
       style="width: 100%">
    <el-table v-bind="attr"
              border
              stripe
              class="v-table"
              :height="tableHeight"
              :data="tableData"
              :default-sort="{prop: 'name', order: 'descending'}"
              style="width: 100%"
              @sort-change="sortChange"
              @row-dblclick="rowDblClick"
              @selection-change="handleSelectionChange">
      <el-table-column prop="index"
                       fixed="left"
                       label="序号"
                       width="50">
      </el-table-column>
      <el-table-column v-if="options.type === 'selection'"
                       type="selection"
                       fixed="left"
                       width="50">
      </el-table-column>
      <template v-for="(col, i) in columns">
        <el-table-column class="table-column"
                         sortable="custom"
                         :prop="col.key"
                         :key="col.key + i"
                         :label="col.label"
                         :width="col.width">
          <template slot-scope="scope">
            <!--文本-->
            <span v-if="col.type === undefined || col.type === 'text'">{{scope.row[col.key]}}</span>

            <!--标签-->
            <el-tag v-else-if="col.type === 'tag'"
                    type="success">标签二</el-tag>

            <!--字体可点击按钮-->
            <span v-else-if="col.type === 'btn-text'"
                  :style="{color: col.style}"
                  class="text-btn"
                  @click.stop="handleCommand(col, scope.row)">{{scope.row[col.key]}}</span>

            <!--文本带红点-->
            <div v-else-if="col.type === 'point'"
                 class="text-point">
              <span class="point"
                    :style="{background: setColor(col, scope.row)}"></span>
              {{scope.row[col.key]}}
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column v-if="operation && operation.options.length > 0"
                       header-align="left"
                       :fixed="operation.fixed"
                       :label="operation.label"
                       :width="operation.width">
        <template slot-scope="scope">
          <template v-for="(btn, i) in operation.options">
            <el-button v-if="!btn.type || btn.type === 'text'"
                       class="table-btn"
                       :key="btn.label+i"
                       :icon="btn.icon"
                       :size="btn.size || 'mini'"
                       v-show="operationShow(btn, scope.row)"
                       type="text"
                       :disabled="operationDisabled(btn, scope.row)"
                       @click.stop="handleCommand(btn, scope.row)">
              {{btn.label}}
            </el-button>
            <el-tooltip v-else-if="btn.type === 'icon'"
                        class="item"
                        effect="dark"
                        :content="btn.label"
                        placement="top-start"
                        :key="btn.label+i">
              <span class="operation-icon"
                    :class="btn.icon"
                    @click.stop="handleCommand(btn, scope.row)"></span>
            </el-tooltip>
          </template>
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
      default: () => { }
    },
    // 表格选项
    options: {
      type: Object,
      default: () => { }
    },
    // 表头
    columns: {
      type: Array,
      default: () => []
    },
    // 按钮
    operation: {
      type: Object,
      default: () => { }
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
      tableHeight: '100%'
    }
  },
  mounted () {
    this.handleResize()
    this.$bus.$on('GLOBAL_RESIZE', this.handleResize)
  },
  beforeDestroy () {
    this.$bus.$off('GLOBAL_RESIZE', this.handleResize)
  },
  methods: {
    setColor (col, row) {
      if (!col.color) {
        return '#fff'
      }
      if (typeof col.color === 'function') {
        return col.color(row)
      }
      return col.color
    },
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
      // console.log(column)
      // console.log(prop)
      // console.log(order)
      this.$emit('sortChange', { column, prop, order })
    },
    handleResize () {
      // const bodyHeight = window.innerHeight || document.documentElement.clientHeight
      // const topbarHeight = document.querySelector('.v-tool-bar').clientHeight || 0
      // const queryFormHeight = document.querySelector('.query-form').clientHeight || 0
      // const vPaginationHeight = document.querySelector('.v-pagination').clientHeight || 0
      // this.tableHeight = `${bodyHeight - topbarHeight - queryFormHeight - vPaginationHeight - 60 - 36 - 20 - 1}px`
    }
  }
}
</script>

<style scoped lang="scss">
@import "./../../style/variable";
.table-btn {
  margin-right: 8px;
  cursor: pointer;
}

.v-table {
  .text-btn {
    color: #409eff;
    cursor: pointer;
  }
  .text-point {
    .point {
      display: inline-block;
      margin-right: 10px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #fff;
    }
  }
}

.operation-icon {
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: #000;
  }
}
</style>
