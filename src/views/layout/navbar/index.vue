<template>
  <div class="nav-bar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
      background-color="#292C31"
      text-color="#fff"
      active-text-color="#46BAFE">
      <template v-for="(item, index) in $store.getters.mainNav">
        <el-submenu v-if="item.children && item.children.length > 0"
                    :index="item.title"
                    :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item v-for="(cell, key) in item.children"
                        :index="cell.path"
                        :key="key">{{cell.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else
                      :index="item.path"
                      :key="index">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  mounted () {
    console.log(this.$route)
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
