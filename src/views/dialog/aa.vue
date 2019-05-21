<template>
  <div>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
<br/>
    32131231
  </div>
</template>

<script>
export default {
  props: ['abc'],
  data () {
    return {
      value1: ''
    }
  }
}
</script>

<style scoped>

</style>
