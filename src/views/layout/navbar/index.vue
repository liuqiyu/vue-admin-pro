<template>
  <div class="nav-bar">
    <el-menu :default-active="$route.path"
             class="el-menu-vertical-demo"
             :router="true"
             @open="handleOpen"
             @close="handleClose"
             background-color="#fff"
             text-color="#1D2331"
             :collapse="isCollapse"
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
      'routes',
      'isCollapse'
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
}
.router-link-exact-active {
  color: red;
}

/deep/ .el-menu {
  border-right: none;
  .el-menu-item,
  .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }
}

/deep/ .el-menu--collapse .el-menu-item span,
/deep/ .el-menu--collapse .el-submenu .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

/deep/ .el-submenu__icon-arrow {
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}

/deep/ .el-menu--collapse .el-menu-item .el-submenu__icon-arrow,
/deep/
  .el-menu--collapse
  .el-submenu
  .el-submenu__title
  .el-submenu__icon-arrow {
  display: none;
}

/deep/ .el-submenu__title {
  -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
</style>
