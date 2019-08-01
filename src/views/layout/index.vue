<template>
  <div class="yy-layout">
    <el-container class="yy-container">
      <div class="yy-menu">
        <div class="logo">Vue Admin Pro</div>
        <el-scrollbar class="scrollbar-wrapper">
          <navbar></navbar>
        </el-scrollbar>
      </div>
      <el-container class="yy-body">
        <el-header class="yy-header">
          <topbar></topbar>
        </el-header>
        <el-main class="yy-main">
          <tagsView></tagsView>
          <div class="yy-content">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import topbar from './topbar'
import navbar from './navbar'
import tagsView from './tags-view'
export default {
  name: 'index',
  components: {
    topbar,
    navbar,
    tagsView
  }
}
</script>

<style scoped lang="scss">
@import "./../../assets/scss/variable";
.yy-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .yy-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .yy-header {
      height: 55px !important;
      padding: 0 !important;
      flex: none;
      color: #fff;
      z-index: 111;
    }
    .yy-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .yy-menu {
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
        font-size: 18px;
        text-align: center;
        border-bottom: 1px solid #101117;
        font-family: "幼圆";
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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
    .yy-main {
      flex: 1;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .yy-content {
        flex: 1;
        height: 100%;
        // padding: 20px;
        overflow-y: auto;
      }
    }
  }
}
</style>
