<template>
  <el-input-number ref="eInputNumber"
                   :disabled="disabled"
                   :symbol="column.symbol"
                   :unit="column.unit"
                   :precision="column.precision"
                   :max="column.max"
                   :min="column.min"
                   :maxlength="column.maxlength"
                   :minlength="column.minlength"
                   placeholder=" "
                   v-model="str"
                   :clearable="false"
                   @blur="inputBlur"
                   @clear="clearEdit"
                   @change="inputChange" />
</template>

<script>
export default {
  name: 'edit-input-number',
  props: {
    column: {
      type: Object,
      default () {
        return {}
      }
    },
    disabled: Boolean,
    value: [String, Number]
  },
  data () {
    return {
      str: '',
      old: ''
    }
  },
  methods: {
    clearEdit () {
      this.$emit('clear', this.str, this.str !== this.old)
    },
    inputBlur (e) {
      this.$parent.editType = ''
      // this.$emit('blur', this.str, this.str !== this.old)
    },
    inputChange () {
      this.$emit('change', this.str, this.str !== this.old)
    },
    toFocus () {
      this.$refs.eInputNumber.focus()
    },
    toSetStr () {
      this.str = this.value || ''
      this.old = this.value || ''
    }
  }
}
</script>
