<template>
  <div>
    {{a}}
    <comp v-model="a"></comp>
  </div>

</template>

<script>
import comp from './comp'
export default {
  name: 'index',
  components: {
    comp
  },
  data () {
    return {
      a: [
        [0.5, 0],
        [0.5, 1],
        [0, 0.5],
        [1, 0.5]
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
