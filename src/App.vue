<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted () {
    function asyncFunction () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('Async Hello world')
        }, 16)
      })
    }

    asyncFunction().then(function (value) {
      console.log(value) // => 'Async Hello world'
    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style lang="scss">
</style>
