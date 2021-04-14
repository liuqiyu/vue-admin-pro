<!--
 * @Descripttion: update back icon
 * @Author: liuqiyu
 * @Date: 2019-10-09 14:47:52
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-04 15:48:34
 -->
<template>
  <div class="smart-details-page">
    <header>
      <div class="left-bar">
        <router-link v-if="options && options.back"
                     tag="span"
                     class="back el-icon-back"
                     replace
                     :to="options.back"></router-link>
        <h3 class="title">
          {{(options && options.title) || title}}
        </h3>

        <!-- <div class="tags">
          <slot name="tag">
            <el-tag type="success"
                    effect="dark">已完成</el-tag>
          </slot>
        </div> -->
      </div>
      <div class="right-bar">
        <smart-tool-list :tools="tools"></smart-tool-list>
      </div>
    </header>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'smart-details-page',
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
@import "~@/style/variable";
.smart-details-page {
  background: #ffffff;
  border: 1px solid $borderColor;
  // padding: 12px 12px 2px 12px;
  header {
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid $borderColor;
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
        font-size: 16px;
        line-height: 50px;
        cursor: pointer;
        font-weight: bold;
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
