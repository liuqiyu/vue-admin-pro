<template>
  <div>
    <div class="demo"></div>
  </div>
</template>

<script>
export default {
  name: 'style-demo1'
}
</script>

<style scoped lang="scss">
.demo {
  width: 100px;
  height: 100px;
  border: 1px solid #e1e1e1;
  transition: ease-in 0.3s;
  background: linear-gradient(0, #108b96 2px, #108b96 2px) no-repeat,
    linear-gradient(-90deg, #108b96 2px, #108b96 2px) no-repeat,
    linear-gradient(-180deg, #108b96 2px, #108b96 2px) no-repeat,
    linear-gradient(-270deg, #108b96 2px, #108b96 2px) no-repeat;
  background-size: 0 2px, 2px 0, 0 2px, 2px 0;
  background-position: left top, right top, right bottom, left bottom;
  &:hover {
    background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
  }
}
</style>
