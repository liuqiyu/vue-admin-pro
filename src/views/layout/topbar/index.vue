<template>
  <div class="top-bar">
    <div class="logo">
      <img src="@/assets/images/logo.png"
           alt="">
      <h1 class="title"
          v-if="!isCollapse">
        Vue Admin Pro
      </h1>
    </div>
    <right-tools></right-tools>
  </div>
</template>

<script>
import rightTools from './right-tools'

export default {
  name: 'index',
  components: {
    rightTools
  }
}
</script>

<style scoped lang="scss">
@import "./../../../style/variable";
.top-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    font-size: 16px;
    // font-family: "幼圆";
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-right: 13px;
    }
    .title {
      display: inline-block;
      // line-height: 54px;
      white-space: nowrap;
      font-size: 18px;
    }
  }
}
</style>
