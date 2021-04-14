<template>
  <el-table-column class-name="table-column"
                   :sortable="col.sort ? 'custom' : false"
                   :prop="col.field"
                   :label="col.label"
                   :width="col.width"
                   :fixed="col.fixed ? col.fixed: false"
                   :min-width="col['min-width']"
                   :show-overflow-tooltip="true">
    <template slot-scope="scope">
      <template v-if="scope.row.isEdit && col.editType">
        <el-form-item :prop="'tableData.' + scope.$index + '.' + col.field"
                      :rules="col.rules">
          <!--input 文本-->
          <el-input v-if="col.editType === 'input'"
                    v-model="scope.row[col.field]"
                    :placeholder="col.placeholder"
                    clearable>
          </el-input>

          <!-- 下拉框 -->
          <el-select v-if="col.editType === 'select'"
                     v-model="scope.row[col.field]"
                     placeholder="请选择">
            <el-option v-for="(item, i) in col.options"
                       :key="i"
                       :label="col.optionsValue ? item[col.optionsValue] : item.label"
                       :value="col.optionsLabel ? item[col.optionsLabel] : item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </template>
      <template v-else>
        <!--文本-->
        <span v-if="col.type === undefined || col.type === 'text'">
          <span :style="{color: setColor(col, scope.row)}">{{scope.row[col.field]}}</span>
        </span>

        <!--告警-->
        <asp-alarm-tag :type="handleTag(col, scope.row)"
                       v-else-if="col.type === 'alarm'"
                       @handleClick="handleCommand(col, scope.row)">{{scope.row[col.field]}}</asp-alarm-tag>

        <!--标签-->
        <el-tag v-else-if="col.type === 'tag'"
                type="success">{{scope.row[col.field]}}</el-tag>

        <!--字体可点击按钮-->
        <template v-else-if="col.type === 'btn-text'">
          <!-- 没有tooltip -->
          <span v-if="!setToolTip(col, scope.row)"
                :style="{color: setColor(col, scope.row)}"
                class="text-btn"
                @click.stop="handleCommand(col, scope.row)">{{scope.row[col.field]}}</span>
          <!-- 有tooltip -->
          <el-tooltip v-else
                      class="item"
                      effect="dark"
                      :content="setToolTip(col, scope.row)"
                      placement="top">

            <span :style="{color: setColor(col, scope.row)}"
                  class="text-btn"
                  @click.stop="handleCommand(col, scope.row)">{{scope.row[col.field]}}</span>
          </el-tooltip>
        </template>

        <!--字体图标可点击按钮-->
        <el-tooltip v-else-if="col.type === 'btn-icon'"
                    :disabled='!col.tooltip'
                    :content="col.tooltipContent"
                    placement="top">
          <span :style="{color: setColor(col, scope.row)}"
                class="icon-btn iconfont"
                :class='col.className'
                @click.stop="handleIconCommand(col, scope.row)"></span>
        </el-tooltip>

        <!--文本带红点-->
        <div v-else-if="col.type === 'point'"
             class="text-point">
          <span class="point"
                :style="{background: setColor(col, scope.row)}"></span>
          {{scope.row[col.field]}}
        </div>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'table-column',
  props: {
    col: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    setColor (col, row) {
      if (typeof col.color === 'function') {
        return col.color(row)
      }
      return col.color
    },
    setToolTip (col, row) {
      if (typeof col.tooltip === 'function') {
        return col.tooltip(row)
      }
      return col.tooltip
    },
    handleCommand (btn, row) {
      if (!btn.func) {
        return
      }
      btn.func(row)
    },
    handleIconCommand (btn, row) {
      if (!btn.func) {
        return
      }
      btn.func(row)
    },
    handleTag (tag, row) {
      if (typeof tag.tag === 'function') {
        return tag.tag(row)
      }
      return tag.tag
    }
  }
}
</script>

<style scoped lang="scss">
.text-btn {
  color: #409eff;
  cursor: pointer;
}
.icon-btn {
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
</style>
