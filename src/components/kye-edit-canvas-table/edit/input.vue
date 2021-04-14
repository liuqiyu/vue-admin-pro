<template>
  <el-input
    ref="eInput"
    :disabled="disabled"
    :maxlength="column.maxlength"
    :minlength="column.minlength"
    placeholder=" "
    v-model="str"
    v-on:keyup.enter.native="inputEnter"
    @clear="clearEdit"
    @blur="inputBlur"
    @change="inputChange" />
</template>

<script>
  export default {
    name: 'edit-input',
    props: {
      column: {
        type: Object,
        default() {
          return {}
        }
      },
      disabled: Boolean,
      value: [String, Number]
    },
    data () {
      return {
        str: '',
        oldStr: ''
      }
    },
    methods: {
      clearEdit () {
        this.$emit('clear')
      },
      inputChange () {
        this.$emit('change', this.str, this.str !== this.oldStr)
      },
      inputBlur () {
        this.$parent.editType = ''
      },
      inputEnter () {
        this.$emit('enter', this.str)
      },
      toFocus () {
        this.$refs.eInput.focus()
      },
      toSetStr () {
        this.str = this.value || ''
        this.oldStr = this.value || ''
      }
    }
  }
</script>
