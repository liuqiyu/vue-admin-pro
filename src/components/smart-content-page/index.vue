<template>
  <div class="smart-content-page">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'smart-content-page',
  props: {
    options: {
      type: Object,
      default: () => { }
    },
    tools: {
      type: Array,
      default: () => []
    },
    action: {
      type: Object,
      default: () => ({
        type: '',
        tools: []
      })
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/variable";
.smart-content-page {
  position: relative;
  padding: 12px 12px 2px 12px;
}
</style>
