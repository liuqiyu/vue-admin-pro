<template>
  <div class="smart-layout">
    <el-container class="smart-container">
      <topbar class="smart-header"></topbar>
      <el-container class="smart-body">
        <div class="smart-menu">
          <sidebar></sidebar>
        </div>
        <el-main class="smart-main">
          <tagsView></tagsView>
          <div class="smart-content">
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
import sidebar from './sidebar'
import tagsView from './tags-view'
export default {
  name: 'index',
  components: {
    topbar,
    sidebar,
    tagsView
  },
  computed: {
    ...mapGetters([
      'cachedViews'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "~@/style/variable";
.smart-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .smart-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .smart-header {
      width: 100%;
      height: 50px !important;
      flex: none;
      color: #fff;
      z-index: 111;
      background-image: linear-gradient(-179deg, #225dde 0%, #4a86f0 100%);
    }
    .smart-body {
      flex: 1;
      display: flex;
      flex-direction: row;
      height: 0;
    }
    .smart-menu {
      position: relative;
      height: 100%;
      width: $sideBarWidth;
      transition: width 0.3s;
      flex: none;
      background: #fff;
      box-shadow: 0 0 8px 0 #cadaf5;
      display: flex;
      flex-direction: column;
      z-index: 99;
    }
    .smart-main {
      flex: 1;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .smart-content {
        position: relative;
        flex: 1;
        height: 0;
        overflow-y: auto;
        background: #f1f5fa;
        > * {
          height: 100%;
          padding: 12px 12px 2px 12px;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
