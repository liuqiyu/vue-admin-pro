<template>
    <div class="asp-layout">
      <el-container class="asp-container">
        <el-header class="asp-header">
          <topbar></topbar>
          <navbar></navbar>
        </el-header>
        <el-main class="asp-main">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </div>
</template>

<script>
import topbar from './topbar'
import navbar from './navbar'
export default {
  name: 'index',
  components: {
    topbar,
    navbar
  }
}
</script>

<style scoped lang="scss">
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
      height: 80px !important;
      padding: 0 !important;
      flex: none;
      color: #fff;
      z-index: 111;
    }
    .asp-main {
      flex: 1;
    }
  }
}
</style>
