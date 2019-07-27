<template>
  <div class="nav-bar">
    <el-menu :default-active="$route.path"
             class="el-menu-vertical-demo"
             :router="true"
             @open="handleOpen"
             @close="handleClose"
             background-color="#292C31"
             text-color="#fff"
             active-text-color="#46BAFE">
      <nav-item v-for="(route, index) in routes"
                :key="index"
                :item="route"
                :base-path="route.path"></nav-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavItem from './nav-item'
export default {
  name: 'navbar',
  components: {
    NavItem
  },
  computed: {
    ...mapGetters([
      'routes'
    ])
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      showDropMenu: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="scss">
.nav-bar {
  position: relative;
  width: 100%;
  /*background: #000000;*/
}
.router-link-exact-active {
  color: red;
}
</style>
