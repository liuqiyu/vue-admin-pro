<template>
  <el-date-picker ref="eDataPicker"
                  :clearable="!!column.clearable"
                  :disabled="disabled"
                  v-model="str"
                  :format="(column.option && column.option.format) ? column.option.format : null"
                  :type="(column.option && column.option.type) ? column.option.type : 'datetime'"
                  :value-format="(column.option && column.option.valueFormat) ? column.option.valueFormat : 'yyyy-MM-dd HH:mm:ss'"
                  :picker-options="(column.option && column.option.pickerOptions) ? column.option.pickerOptions : {}"
                  placeholder=" "
                  @blur="blur"
                  @clear="clearEdit"
                  @change="datetimeChange" />
</template>

<script>
export default {
  name: 'edit-data-picker',
  props: {
    column: {
      type: Object,
      default () {
        return {}
      }
    },
    disabled: Boolean,
    value: [String, Number, Object, Array]
  },
  data () {
    return {
      str: '',
      oldStr: ''
    }
  },
  methods: {
    blur () {
      this.$parent.editType = ''
    },
    clearEdit () {
      this.$emit('clear', this.str, this.str !== this.oldStr)
    },
    datetimeChange () {
      this.$emit('change', this.str, this.str !== this.oldStr)
    },
    toFocus () {
      this.$refs.eDataPicker.focus()
    },
    toSetStr () {
      this.str = this.value || ''
      this.oldStr = this.value || ''
    }
  }
}
</script>
