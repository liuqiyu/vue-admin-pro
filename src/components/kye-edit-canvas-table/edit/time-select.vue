<template>
  <el-time-select ref="eTimeSelect"
                  v-model="str"
                  :disabled="disabled"
                  :clearable="!!column.clearable"
                  :picker-options="(column.options && column.options.pickerOptions) ? column.options.pickerOptions : defaultOpt"
                  placeholder=" "
                  @blur="blur"
                  @clear="clearEdit"
                  @change="timeSelectChange" />
</template>

<script>
export default {
  name: 'edit-time-select',
  props: {
    column: {
      type: Object,
      default () {
        return {}
      }
    },
    disabled: Boolean,
    value: [Number, String]
  },
  data () {
    return {
      str: '',
      old: '',
      defaultOpt: {
        start: '07:00',
        step: '00:15',
        end: '22:30'
      }
    }
  },
  methods: {
    blur () {
      this.$parent.editType = ''
    },
    clearEdit () {
      this.$emit('clear', this.str, this.str !== this.old)
    },
    timeSelectChange () {
      this.$emit('change', this.str, this.str !== this.old)
    },
    toFocus () {
      this.$refs.eTimeSelect.focus()
    },
    toSetStr () {
      this.str = this.value || ''
      this.old = this.value || ''
    }
  }
}
</script>
