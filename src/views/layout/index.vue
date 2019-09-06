<template>
  <div class="v-layout">
    <el-container class="v-container">
      <topbar class="v-header"></topbar>
      <el-container class="v-body">
        <div class="v-menu">
          <el-scrollbar class="scrollbar-wrapper">
            <navbar></navbar>
          </el-scrollbar>
          <div class="collapse-trigger"
               @click="menuTrigger">
            <span ref="collapseIcon"
                  class="iconfont icon-shouqi"></span>
          </div>
        </div>
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
import { mapGetters, mapMutations } from 'vuex'
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
  },
  methods: {
    ...mapMutations([
      'IS_COLLAPSE'
    ]),
    menuTrigger () {
      this.$refs.collapseIcon.classList.toggle('retract')
      this.IS_COLLAPSE()
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/style/variable";
.v-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .v-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .v-header {
      width: 100%;
      height: 50px !important;
      flex: none;
      color: #fff;
      z-index: 111;
      background-image: linear-gradient(-179deg, #225dde 0%, #4a86f0 100%);
    }
    .v-body {
      flex: 1;
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    .v-menu {
      position: relative;
      height: 100%;
      width: 200px;
      transition: width 0.28s;
      flex: none;
      background: #fff;
      box-shadow: 0 0 8px 0 #cadaf5;
      display: flex;
      flex-direction: column;
      .scrollbar-wrapper {
        flex: 1;
        height: 100%;
        margin: 0 !important;
        overflow-x: hidden;
        overflow-y: auto;
        border-bottom: 1px solid #dee9fc;
        /deep/ .el-scrollbar__wrap {
          overflow-x: hidden !important;
        }
      }
      .collapse-trigger {
        position: relative;
        flex: none;
        width: 100%;
        height: 34px;
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
    .v-main {
      flex: 1;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .v-content {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        background: #f1f5fa;
        height: 100%;
        > * {
          padding: 12px 12px 2px 12px;
          height: 100%;
        }
      }
    }
  }
}
</style>
