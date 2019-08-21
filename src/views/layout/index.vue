<template>
  <div class="v-layout">
    <el-container class="v-container">
      <div class="v-menu">
        <div class="logo">
          <img src="@/assets/images/logo.png"
               alt="">
          <h1 class="title"
              v-if="!isCollapse">
            Vue Admin Pro
          </h1>
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
      position: relative;
      height: 100%;
      width: 200px;
      transition: width 0.28s;
      flex: none;
      background: $menu-bg;
      padding-top: 55px;
      .logo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 54px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #fff;
        font-size: 14px;
        // text-align: center;
        border-bottom: 1px solid #101117;
        font-family: "幼圆";
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          margin-left: 13px;
          margin-right: 13px;
        }
        .title {
          display: inline-block;
          // line-height: 54px;
          white-space: nowrap;
          font-size: 16px;
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
