<template>
  <div>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <p>需要注意的是内容是默认不居中的</p>
    <qy-dialog v-bind="dialogOption"
               @close="closeDynamicDialog"
               :view.sync="dialogOption.view"
               :visible.sync="dialogOption.show">
      <component :is="dialogOption.view"
                 :dialog-data="dialogData"
                 @close="closeDynamicDialog">
      </component>
    </qy-dialog>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
