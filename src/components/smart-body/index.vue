<template>
  <div class="smart-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'smart-body'
}
</script>

<style lang="scss" scoped>
.smart-body {
  background: red;
}
</style>