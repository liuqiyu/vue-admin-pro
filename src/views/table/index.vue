<template>
  <div>
    <query-table :form-fields="formFields"
                 :tools="tools"
                 :tables="tables"></query-table>
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
      dialogData: {},
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
          func: () => {
            alert('刷新')
          }
        },
        {
          label: '新增',
          icon: 'iconfont icon-xinzeng',
          func: () => {
            alert('新增')
          }
        },
        {
          label: '删除',
          icon: 'iconfont icon-shanchu',
          func: () => {
            alert('删除')
          }
        }
      ],
      tables: {
        url: {
          type: 'POST',
          method: '/getTable'
        },
        options: {
          type: 'index',
          page: true
        },
        columns: [
          {
            label: '姓名',
            key: 'name',
            width: '180'
          },
          {
            label: '昵称',
            key: 'nickname',
            width: '180'
          },
          {
            label: '年龄',
            key: 'age',
            width: '180'
          },
          {
            label: '性别',
            key: 'gender',
            width: '180'
          },
          {
            label: '地址',
            key: 'address'
          }
        ],
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
      }
    }
  },
  components: {
    detailsDialog
  },
  methods: {
    handleUpdate () {
      this.showDynamicDialog('detailsDialog', '弹窗', '450px')
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
