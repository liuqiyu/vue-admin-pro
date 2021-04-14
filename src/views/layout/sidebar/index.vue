<template>
  <div class="sidebar-container"
       style="height: 100%">
    <el-scrollbar class="menu-scrollbar"
                  wrap-class="scrollbar-wrapper">
      <el-menu class="menu-wrapper"
               :default-active="activeMenu"
               :collapse="isCollapse"
               :background-color="variables.menuBg"
               :text-color="variables.menuText"
               :unique-opened="true"
               active-text-color="red"
               :collapse-transition="false"
               mode="vertical">
        <sidebar-item v-for="route in menuRoutes"
                      :key="route.path"
                      :item="route"
                      :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="collapse-trigger"
         @click="menuTrigger">
      <span ref="collapseIcon"
            class="iconfont"
            :class="collapseIcon"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/style/variable.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'menuRoutes', 'isCollapse'
    ]),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    }
  },
  data () {
    return {
      collapseIcon: 'icon-daohangshouqi-'
    }
  },
  methods: {
    ...mapMutations([
      'IS_COLLAPSE'
    ]),
    menuTrigger () {
      console.log(this.isCollapse)
      if (this.isCollapse) {
        this.collapseIcon = 'icon-daohangshouqi-'
      } else {
        this.collapseIcon = 'icon-daohangzhankai-'
      }
      this.IS_COLLAPSE()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/variable";
.sidebar-container {
  background-color: $menuBg;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .collapse-trigger {
    position: relative;
    flex: none;
    width: 100%;
    height: 34px;
    border-top: 1px solid $menuBorderColor;
    background-image: linear-gradient(
      90deg,
      #e1e7f3 14%,
      rgba(234, 234, 234, 0) 100%
    );
    span {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 64px;
      height: 34px;
      background: #fff;
      line-height: 34px;
      text-align: center;
      cursor: pointer;
      &.retract {
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg); /* Safari 与 Chrome */
      }
    }
  }
}
</style>
