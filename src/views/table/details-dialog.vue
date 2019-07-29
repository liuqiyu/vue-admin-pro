<template>
  <div>
    <div class="yy-dialog-body"
         id="123">123</div>
    <div class="yy-dialog_footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary"
                 @click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-dialog',
  methods: {
    confirm () {
      alert('确认')
    },
    cancel () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
