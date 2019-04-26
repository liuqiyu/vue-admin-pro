<template>
  <div>
    <button @click="click">点击</button>312312321
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
export default {
  components: {
    aa
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
      this.showDynamicDialog('aa', '新增任务', '850px')
    },
    showDynamicDialog (view, title, width = '1200px') {
      this.dialogOption.show = true
      this.dialogOption.view = view
      this.dialogOption.title = title
      this.dialogOption.width = width
    },
    closeDynamicDialog () {
    }
  }
}
</script>

<style scoped>

</style>
