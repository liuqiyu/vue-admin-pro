<template>
  <div>
    <button @click="click">点击aa</button>
    <button @click="click1">点击bb</button>
    <!--弹出框-->
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
import aa from './aa'
import bb from './bb'

export default {
  components: {
    aa,
    bb
  },
  data () {
    return {
      dialogOption: {
        show: false,
        view: null,
        title: '',
        width: '1200px'
      },
      dialogData: {}
    }
  },
  methods: {
    click () {
      this.showDynamicDialog('aa', 'aa新增任务', '850px')
    },
    click1 () {
      this.showDynamicDialog('bb', 'bb新增任务', '850px')
    },
    showDynamicDialog (view, title, width = '1200px') {
      this.dialogOption.show = true
      this.dialogOption.view = view
      this.dialogOption.title = title
      this.dialogOption.width = width
    },
    closeDynamicDialog (boolean) {
      if (boolean) {
        this.$refs.queryTable.loadTable()
      }
      this.dialogOption.show = false
      this.dialogOption.view = null
      this.dialogOption.title = null
      this.dialogOption.width = 0
    }
  }
}
</script>

<style scoped>

</style>
