<template>
  <div class="content-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="card-panel">1</div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">1</div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">1</div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">1</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  methods: {}
}
</script>

<style scoped lang="scss">
.card-panel {
  width: 100%;
  height: 80px;
}
</style>
