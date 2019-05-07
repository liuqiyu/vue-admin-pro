<template>
    <div class="asp-layout">
      <el-container class="asp-container">
        <el-header class="asp-header">
          <topbar></topbar>
        </el-header>
        <el-container class="asp-body">
          <el-aside class="asp-menu">
            <el-scrollbar class="scrollbar-wrapper">
              <navbar></navbar>
            </el-scrollbar>
          </el-aside>
          <el-main class="asp-main">
            <tagsView></tagsView>
            <div class="asp-content">
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
@import './../../assets/scss/variable';
.asp-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .asp-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .asp-header {
      padding: 0 !important;
      flex: none;
      color: #fff;
      z-index: 111;
    }
    .asp-body {
      flex: 1;
      display: flex;
      flex-direction: row;
    }
    .asp-menu {
      height: 100%;
      width: 200px !important;
      flex: none;
      background: $menu-bg;
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
    .asp-main {
      flex: 1;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .asp-content {
        flex: 1;
        height: 100%;
        padding: 20px;
        overflow-y: auto;
        background-image: url("./../../assets/images/main-bg.jpg");
        background-size: cover;
      }
    }
  }
}
</style>
