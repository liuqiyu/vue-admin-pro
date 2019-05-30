<template>
  <div class="top-bar">
    <div class="logo">通用型后台管理系统</div>
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
  @import './../../../assets/scss/variable';
  .top-bar {
    width: 100%;
    height: 60px;
    background: $top-bg;
    padding: 0 20px;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
