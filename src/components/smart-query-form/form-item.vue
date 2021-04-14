<template>
  <el-form-item class="query-form-item"
                :class="'form-item__' + item.type"
                :label="item.label"
                :prop="item.field"
                :rules="item.rules || []">
    <!--input 文本-->
    <el-input v-if="!item.type || item.type === 'text'"
              :value="value"
              v-bind="item.props"
              :disabled="getDisabled(item)"
              :readonly="getReadonly(item)"
              @input="handleInput"
              @change="handleChange">
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
               :value="value"
               v-bind="item.props"
               :disabled="getDisabled(item)"
               @input="handleInput"
               @change="handleChange">
      <el-option v-for="(cell, index) in item.options"
                 :key="index"
                 :label="cell[item.props.optionsLabel]"
                 :value="cell[item.props.optionsValue]"
                 :disabled="item.disabled">
      </el-option>
    </el-select>

    <!-- TimePicker 时间选择器 -->
    <el-time-picker v-else-if="item.type ==='timePicker'"
                    :value="value"
                    placeholder="任意时间点"
                    v-bind="item.props"
                    :disabled="getDisabled(item)"
                    :readonly="getReadonly(item)"
                    @input="handleInput"
                    @change="handleChange">
    </el-time-picker>

    <!--DatePicker 日期选择器  date/week/month/year -->
    <el-date-picker v-else-if="item.type === 'datePicker'"
                    :value="value"
                    v-bind="item.props"
                    :disabled="getDisabled(item)"
                    :readonly="getReadonly(item)"
                    @input="handleInput"
                    @change="handleChange">
    </el-date-picker>

    <!-- region 省市区联动 -->
    <el-cascader v-if="item.type === 'region'"
                 :options="regionOptions"
                 :value="value"
                 v-bind="item.props"
                 :disabled="getDisabled(item)"
                 :readonly="getReadonly(item)"
                 @input="handleInput"
                 @change="handleChange">
    </el-cascader>
  </el-form-item>
</template>

<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText } from 'element-china-area-data'
import baseProps from './baseProps'
export default {
  name: 'form-item',
  props: {
    value: {
      type: [Array, String, Number]
    },
    item: {
      type: Object,
      default: () => { }
    },
    model: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      provinceAndCityData,
      provinceAndCityDataPlus,
      regionData,
      regionDataPlus
    }
  },
  computed: {
    // 省市区联动选项数据判定
    regionOptions () {
      let data = []
      if (this.item.type === 'region') {
        switch (this.item.data) {
          case 'provinceAndCityData':
            data = provinceAndCityData
            break
          case 'regionData':
            data = regionData
            break
          case 'provinceAndCityDataPlus':
            data = provinceAndCityDataPlus
            break
          case 'regionDataPlus':
            data = regionDataPlus
            break
          default:
            data = regionData
            break
        }
      }
      return data
    }
  },
  methods: {
    getDisabled (item) {
      if (item.props && item.props.disabled && typeof item.props.disabled === 'function') {
        console.log(this.item)
        const obj = { key: item.field, model: this.model }
        return item.props.disabled(obj)
      }
      return item.props.disabled !== undefined ? item.props.disabled : false
    },
    getReadonly (item) {
      if (item.props && item.props.readonly && typeof item.props.readonly === 'function') {
        console.log(this.item)
        const obj = { key: item.field, model: this.model }
        return item.props.readonly(obj)
      }
      return item.props.readonly !== undefined ? item.props.readonly : false
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
    // input 事件
    handleInput (e) {
      this.$emit('input', e)
      // 触发回调事件
      if (this.item.inputFunc && typeof this.item.inputFunc === 'function') {
        const obj = { item: this.item, model: this.model, e }
        this.item.inputFunc(obj)
      }
    },
    // change 事件
    handleChange (e) {
      let label = ''
      // 获取 label 代码
      // select 组件
      if (this.item.type === 'select') {
        let value = this.item.props.multiple ? e : [e]
        const labelList = []
        value.forEach((item) => {
          this.item.options.forEach(cell => {
            if (item === cell[this.item.props.optionsValue]) {
              labelList.push(cell[this.item.props.optionsLabel])
            }
          })
        })
        let separator = (this.item.props && this.item.props.separator) || ','
        label = labelList.join(separator)
      }
      // 省市区 组件
      if (this.item.type === 'region') {
        const labelList = []
        e.forEach((item) => {
          labelList.push(CodeToText[item])
        })
        let separator = (this.item.props && this.item.props.separator) || ','
        label = labelList.join(separator)
      }
      // 触发回调事件
      if (this.item.changeFunc && typeof this.item.changeFunc === 'function') {
        const obj = { item: this.item, model: this.model, label }
        this.item.changeFunc(obj)
      }
    }
  },
  async created () {
    // 初始化组件数据映射
    if (!this.item.props) {
      this.$set(this.item, 'props', {})
    }
    Object.keys(baseProps).forEach(item => {
      if (item === this.item.type) {
        this.$set(this.item, 'props', Object.assign({}, baseProps[item], this.item.props))
      }
    })
  },
  async mounted () {
    // 获取options值
    if (this.item.options && typeof this.item.options === 'function') {
      this.item.options = await this.item.options()
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
  ::v-deep .el-form-item__label {
    flex: none;
  }

  ::v-deep .el-form-item__content {
    flex: 1;
    width: 100%;
    > * {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
      .el-range-separator {
        width: 6%;
      }
    }
    .el-form-item__error {
      display: none;
    }
  }
}
</style>
