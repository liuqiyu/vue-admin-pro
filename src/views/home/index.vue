<template>
  <div id="mynetwork">
    <button @click="click">点击</button>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    click () {
      this.$router.push({
        path: '/a/index',
        query: {
          a: 1
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
#mynetwork {
  font-size: 0.14rem;
}
</style>
