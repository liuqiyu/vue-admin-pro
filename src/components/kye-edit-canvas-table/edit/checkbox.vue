<template>
  <el-checkbox
    :disabled="setDisabled(column, scope.row)"
    :true-label="column.trueLabel || 1"
    :false-label="column.falseLabel || 0"
    v-model="str"
    @change="checkboxChange" />
</template>

<script>
  export default {
    name: 'edit-checkbox',
    props: {
      column: {
        type: Object,
        default() {
          return {}
        }
      },
      disabled: Boolean,
      value: [Number, String, Boolean, Object]
    },
    data() {
      return {
        str: false
      }
    },
    methods: {
      checkboxChange () {
        this.$emit('change', this.str)
      }
    },
    watch: {
      value (v) {
        this.str = v || false
      }
    }
  }
</script>
