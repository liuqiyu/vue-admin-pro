<template>
  <div class="table-list"
       style="width: 100%">
    <el-table v-bind="attr"
              border
              stripe
              class="smart-table"
              :height="tableHeight"
              :data="tableData"
              :default-sort="options.defaultSort ? {prop: options.defaultSort.prop, order: options.defaultSort.order} : {}"
              style="width: 100%"
              @sort-change="sortChange"
              @row-dblclick="rowDblClick"
              @selection-change="handleMutilSelectionChange">

      <el-table-column v-if="options.expand"
                       type="expand">
        <template slot-scope="props">
          <slot name="expand"
                :data="props"></slot>
        </template>
      </el-table-column>

      <!-- 序号列 -->
      <el-table-column v-if="options.showIndex !== undefined ? options.showIndex : 'true'"
                       prop="index"
                       :fixed="options.indexSelectionFixed ? 'left' : false"
                       label="序号"
                       width="40">
      </el-table-column>

      <!-- 多选列 -->
      <el-table-column v-if="options.showMutilSelection"
                       type="selection"
                       :fixed="options.mutilSelectionFixed ? 'left' : false"
                       width="40">
      </el-table-column>

      <!-- 单选列 -->
      <el-table-column v-if="options.showSingleSelection"
                       :fixed="options.singleSelectionFixed ? 'left' : false"
                       width="36">
        <template slot-scope="scope">
          <el-radio class="table-single-selection"
                    v-model="tableSingleSelection"
                    :label="scope.$index"
                    @change="handleSingleSelection"></el-radio>
        </template>
      </el-table-column>

      <template v-for="(col, i) in columns">
        <table-column-parent v-if="col.isParent"
                             :col="col"
                             :key="i"></table-column-parent>
        <table-column v-else
                      :col="col"
                      :key="i"></table-column>
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
                       v-auth="btn.auth || null"
                       v-show="operationShow(btn, scope.row)"
                       type="text"
                       :disabled="operationDisabled(btn, scope.row)"
                       @click.stop="handleCommand(btn, scope.row)">
              {{btn.label}}
            </el-button>
            <el-tooltip v-else-if="btn.type === 'icon'"
                        class="item"
                        effect="dark"
                        v-auth="btn.auth || null"
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
      <!-- <template slot="empty">
        <div class="empty">
          <h2>页面暂无内容</h2>
          <p>抱歉，页面暂无内容，请看看其他页面</p>
        </div>
      </template> -->
    </el-table>
  </div>
</template>

<script>
import TableColumn from './table-column'
import TableColumnParent from './table-column-parent'
export default {
  name: 'smart-table-list',
  components: {
    TableColumn,
    TableColumnParent
  },
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
      tableSingleSelection: '',
      multipleSelection: [],
      tableHeight: '100%'
    }
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
    // 表格多选
    handleMutilSelectionChange (val) {
      if (!this.options.mutilSelectionChange || typeof this.options.mutilSelectionChange !== 'function') {
        console.log('为空或者不是函数')
        return
      }
      this.options.mutilSelectionChange(val)
    },
    // 表格单选
    handleSingleSelection (e) {
      if (!this.options.singleSelectionChange || typeof this.options.singleSelectionChange !== 'function') {
        console.log('为空或者不是函数')
        return
      }
      this.options.singleSelectionChange(this.tableData[e])
    },
    // 双击行
    rowDblClick (row, column, event) {
      if (!this.options.rowDblClick || typeof this.options.rowDblClick !== 'function') {
        console.log('为空或者不是函数')
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
      this.$emit('sort-change', { prop, order })
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

.smart-table {
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
  &::hover {
    color: #000;
  }
}

.table-single-selection {
  ::v-deep .el-radio__label {
    display: none;
  }
}
</style>
