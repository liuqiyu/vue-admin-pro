<template>
    <div class="asp-layout">
      <el-container class="asp-container">
        <el-header class="asp-header">
          <router-link to="/coding/index">coding-index</router-link>
          |
          <router-link to="/coding/add">coding-add</router-link>
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
export default {
  name: 'index'
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
      height: 60px !important;
      flex: none;
      background: #000;
      color: #fff;
      line-height: 60px;
    }
    .asp-main {
      flex: 1;
    }
  }
}
</style>
