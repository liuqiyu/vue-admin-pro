<template>
  <div class="details-page">
    <header>
      <div class="left-bar">
        <router-link tag="span"
                     class="back iconfont icon-fanhui"
                     replace
                     :to="options.back"></router-link>
        <h3 class="title">
          {{title}}
        </h3>

        <div class="tags">
          <slot name="tag">
            <el-tag type="success"
                    effect="dark">已完成</el-tag>
          </slot>
        </div>
      </div>
      <div class="right-bar">
        <tool-bar :tools="tools"></tool-bar>
      </div>
    </header>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'v-details-page',
  props: {
    options: {
      type: Object,
      default: () => { }
    },
    tools: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
.details-page {
  background: #ffffff;
  border: 1px solid #dee8f8;
  header {
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dee8f8;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .left-bar {
      display: flex;
      color: #53607e;
      letter-spacing: 0;
      h3 {
        font-size: 14px;
      }
      > span {
        font-size: 14px;
        cursor: pointer;
        margin-right: 8px;
      }
      .tags {
        margin-left: 10px;
      }
    }
  }
  .content {
    padding: 10px 20px;
  }
}
</style>
