<template>
  <div class="v-layout">
    <el-container class="v-container">
      <div class="v-menu">
        <div class="logo">
          <div class="img">
            <img src="@/assets/images/logo.png"
                 alt="">
          </div>
          <span v-if="!isCollapse">
            Vue Admin Pro
          </span>
        </div>
        <el-scrollbar class="scrollbar-wrapper">
          <navbar></navbar>
        </el-scrollbar>
      </div>
      <el-container class="v-body">
        <el-header class="v-header">
          <topbar></topbar>
        </el-header>
        <el-main class="v-main">
          <tagsView></tagsView>
          <div class="v-content">
            <keep-alive :include="cachedViews">
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import topbar from './topbar'
import navbar from './navbar'
import tagsView from './tags-view'
export default {
  name: 'index',
  components: {
    topbar,
    navbar,
    tagsView
  },
  computed: {
    ...mapGetters([
      'isCollapse',
      'cachedViews'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "./../../assets/scss/variable";
.v-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .v-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .v-header {
      height: 55px !important;
      padding: 0 !important;
      flex: none;
      color: #fff;
      z-index: 111;
    }
    .v-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .v-menu {
      height: 100%;
      width: 200px;
      transition: width 0.28s;
      flex: none;
      background: $menu-bg;
      display: flex;
      flex-direction: column;
      .logo {
        height: 54px;
        flex: 0;
        line-height: 54px;
        color: #fff;
        font-size: 14px;
        // text-align: center;
        border-bottom: 1px solid #101117;
        font-family: "幼圆";
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        // display: flex;
        // align-items: center;
        .img {
          display: inline-block;
          width: 63px;
          height: 54px;
          line-height: 54px;
          text-align: center;
          // padding-left: 2px;
          img {
            width: 30px;
            height: 30px;
            vertical-align: middle;
          }
          span {
            display: inline-block;
            line-height: 54px;
            white-space: nowrap;
          }
        }
      }
      .scrollbar-wrapper {
        height: 100%;
        margin: 0 !important;
        overflow-x: hidden;
        overflow-y: auto;
        /deep/ .el-scrollbar__wrap {
          overflow-x: hidden !important;
        }
      }
    }
    .v-main {
      flex: 1;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .v-content {
        flex: 1;
        height: 100%;
        // padding: 20px;
        overflow-y: auto;
      }
    }
  }
}
</style>
