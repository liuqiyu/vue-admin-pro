<template>
  <kye-search-tips
    ref="eSearchTips"
    v-model="str"
    :disabled="disabled"
    :url="column.options ? column.options.url : ''"
    :value-key="column.options ? column.options.valueKey : ''"
    :keys="column.options ? column.options.keys : []"
    :clearable="!!column.clearable"
    :format-data="column.options ? column.options.formatData : () => {}"
    :format-result="column.options ? column.options.formatResult: () => {}"
    @clear="handleClear"
    @select="handleSelect" />
</template>

<script>
  export default {
    name: 'edit-search-tips',
    props: {
      value: [String, Number],
      column: {
        type: Object,
        default: () => ({})
      },
      row: Object,
      disabled: Boolean
    },
    data () {
      return {
        str: '',
        oldStr: ''
      }
    },
    methods: {
      handleClear () {
        this.$emit('clear', this.str, this.str !== this.oldStr)
      },
      handleSelect (data) {
        this.$emit('change', {str: this.str, data}, this.str !== this.oldStr)
      },
      toFocus () {
        this.$refs.eSearchTips.focus()
      },
      toSetStr () {
        this.str = this.value || ''
        this.oldStr = this.value || ''
        this.selectData = {}
      }
    }
  }
</script>
