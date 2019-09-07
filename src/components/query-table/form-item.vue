<template>
  <el-form-item class="query-form-item"
                :label="item.label">
    <!--input 文本-->
    <el-input v-if="item.type === 'text'"
              :value="value"
              @input="bindChange"
              :disabled="isDisabled(item)"
              :placeholder="item.placeholder"
              clearable>
      <i v-if="!!item.icon"
         :slot="doIcon(item)"
         class="el-input__icon"
         :class="typeof item.icon === 'object' ? item.icon.class : item.icon"></i>
      <template v-if="!!item.complex"
                :slot="doComplex(item)">
        {{ typeof item.complex === 'object' ? item.complex.val : item.complex }}</template>
    </el-input>

    <!--select 下拉框-->
    <el-select v-else-if="item.type === 'select'"
               :disabled="isDisabled(item)"
               :value="value"
               :multiple="item.multiple || false"
               :placeholder="item.placeholder"
               clearable
               :collapse-tags="item.multiple || false"
               @change="bindChange">
      <el-option v-for="(cell, index) in item.options"
                 :key="cell.value + index"
                 :label="cell.label"
                 :value="cell.value">
      </el-option>
    </el-select>

    <!--daterange 日期旋选择器-->
    <el-date-picker v-else-if="item.type === 'daterange'"
                    :value="value"
                    type="daterange"
                    :format="item.format || 'yyyy-MM-dd'"
                    :value-format="item.valueFormat || 'yyyy-MM-dd'"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @input="datePickerChange">
    </el-date-picker>

    <!--datetimerange 时间选择器-->
    <el-date-picker v-else-if="item.type === 'datetimerange'"
                    :value="value"
                    type="datetimerange"
                    :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                    :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @input="datePickerChange">
    </el-date-picker>
  </el-form-item>
</template>

<script>
export default {
  name: 'form-item',
  props: ['value', 'item'],
  data () {
    return {
      datea: ''
    }
  },
  methods: {
    bindChange (e) {
      this.$emit('input', e)
    },
    datePickerChange (val) {
      this.bindChange(val)
    },
    isDisabled (item) {
      if (typeof item.disabled === 'function') {
        const obj = { key: item.columnName, model: this.model }
        return item.disabled(obj)
      }
      return !!item.disabled
    },
    doIcon (item) {
      if (typeof item.icon === 'object') {
        return item.icon.slot
      }
      return 'suffix'
    },
    doComplex (item) {
      if (typeof item.complex === 'object') {
        return item.complex.slot
      }
      return 'append'
    },
    doSelectOptions () {
      // if ()
      //   return data
    }
  }
}
</script>

<style scoped lang="scss">
.query-form-item {
  margin-bottom: 10px !important;
  width: 100%;
  display: flex !important;
  flex-direction: row;
  /deep/ .el-form-item__label {
    flex: none;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
    .el-select,
    .el-input-number {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
      .el-range-separator {
        width: 6%;
      }
    }
  }
}
</style>
