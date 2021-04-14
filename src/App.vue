<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted () {
    window.onresize = () => {
      this.$bus.$emit('GLOBAL_RESIZE')
    }
  }
}
</script>

<style lang="scss">
</style>
