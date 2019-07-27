<template>
  <div>
    <button @click="click">弹窗</button>
    <!--弹出框-->
    <yy-dialog v-bind="dialogOption"
               @close="closeDynamicDialog"
               :view.sync="dialogOption.view"
               :visible.sync="dialogOption.show">
      <component :is="dialogOption.view"
                 :dialog-data="dialogData"
                 @close="closeDynamicDialog">
      </component>
    </yy-dialog>
  </div>
</template>

<script>
import TestDialog from './test-dialog'

export default {
  components: {
    TestDialog
  },
  mounted () {
    this.fetchData()
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
    async fetchData () {
      const data = await this.$http.post('/getTable')
      console.log(data)
    },
    click () {
      this.showDynamicDialog('TestDialog', '弹窗', '450px')
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
