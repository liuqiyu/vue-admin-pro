<template>
  <div class="top-bar">
    <div class="left-bar">
      <breadcrumb></breadcrumb>
    </div>
    <right-tools></right-tools>
  </div>
</template>

<script>
import rightTools from './right-tools'
import breadcrumb from './breadcrumb'

export default {
  name: 'index',
  components: {
    rightTools,
    breadcrumb
  }
}
</script>

<style scoped lang="scss">
@import "./../../../assets/scss/variable";
.top-bar {
  width: 100%;
  height: 55px !important;
  background: #fff;
  padding: 0 20px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
