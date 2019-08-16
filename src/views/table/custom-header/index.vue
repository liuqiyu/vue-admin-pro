<template>
  <div class="content-container">
    <query-table ref="queryTable"
                 :form-fields="formFields"
                 :tools="tools"
                 :tables="tables"></query-table>
    <!--弹出框-->
    <v-dialog v-bind="dialogOption"
               @close="closeDynamicDialog"
               :view.sync="dialogOption.view"
               :visible.sync="dialogOption.show">
      <component :is="dialogOption.view"
                 :dialog-data="dialogData"
                 @close="closeDynamicDialog">
      </component>
    </v-dialog>
  </div>
</template>

<script>
import detailsDialog from './details-dialog'
export default {
  data () {
    return {
      dialogOption: {
        show: false,
        view: null,
        title: '',
        width: '1200px'
      },
      dialogData: {
        type: 'add',
        label: '新增',
        data: {}
      },
      formFields: [
        {
          label: '姓名',
          type: 'text',
          placeholder: '请输入姓名',
          columnName: 'text'
        },
        {
          label: '昵称',
          type: 'text',
          placeholder: '请输入昵称',
          columnName: 'text'
        },
        {
          label: '年龄',
          type: 'text',
          placeholder: '请输入年龄',
          columnName: 'text'
        },
        {
          label: '性别',
          type: 'text',
          placeholder: '请输入性别',
          columnName: 'text'
        },
        {
          label: '地址',
          type: 'text',
          placeholder: '请输入地址',
          columnName: 'text'
        }
      ],
      tools: [
        {
          label: '刷新',
          icon: 'iconfont icon-shuaxin1',
          func: () => this.$refs.queryTable.loadTable()
        },
        {
          label: '新增',
          icon: 'iconfont icon-xinzeng',
          func: () => this.handleAdd()
        },
        {
          label: '删除',
          icon: 'iconfont icon-shanchu',
          disabled: () => {
            return !this.multipleSelection.length > 0
          },
          func: () => this.hanleDel()
        }
      ],
      tables: {
        type: 'customHeader',
        url: {
          type: 'POST',
          method: '/getCustomHeaderTable'
        },
        options: {
          type: 'selection',
          page: true,
          // 选中后操作
          selectionChange: row => {
            this.multipleSelection = row
            console.log('选中', this.multipleSelection)
            // if (row.length > 0)
          }
        },
        columns: [],
        operation: {
          fixed: 'right',
          label: '操作',
          width: '100px',
          // 操作数量
          options: [
            {
              label: '详情',
              // icon: 'iconfont iconwenjian',
              // type: 'icon', // icon 只是图标
              func: row => this.handleUpdate(row) // 回调
            }
          ]
        }
      },
      multipleSelection: []
    }
  },
  components: {
    detailsDialog
  },
  methods: {
    handleUpdate (row) {
      this.$set(this.dialogData, 'type', 'details')
      this.$set(this.dialogData, 'label', '编辑')
      this.$set(this.dialogData, 'data', row)
      this.showDynamicDialog('detailsDialog', '详情', '400px')
    },
    handleAdd () {
      this.$set(this.dialogData, 'type', 'add')
      this.$set(this.dialogData, 'label', '新增')
      this.$set(this.dialogData, 'data', {})
      this.showDynamicDialog('detailsDialog', '新增', '400px')
    },
    hanleDel () {
      console.log('删除', this.multipleSelection)
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
