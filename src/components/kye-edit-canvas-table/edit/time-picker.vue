<template>
  <el-time-picker ref="eTimePicker"
                  v-model="str"
                  :clearable="!!column.clearable"
                  :disabled="isDisabled"
                  :format="(column.option && column.option.format) ? column.option.format : 'HH:mm:ss'"
                  :picker-options="(column.options && column.options.pickerOptions) ? column.options.pickerOptions : {selectableRange: '00:00:00 - 23:59:59'}"
                  placeholder=" "
                  @blur="blur"
                  @clear="clearEdit"
                  @change="timePickerChange" />
</template>

<script>
export default {
  name: 'edit-time-picker',
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
  computed: {
    isDisabled () {
      return this.disabled
    }
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
    timePickerChange () {
      this.$emit('change', this.str, this.str !== this.oldStr)
    },
    toFocus () {
      this.$refs.eTimePicker.focus()
    },
    toSetStr () {
      this.str = this.value || ''
      this.oldStr = this.value || ''
    }
  }
}
</script>
