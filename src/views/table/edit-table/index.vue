<template>
  <div>
    <smart-query-table ref="queryTable"
                       :forms="forms"
                       :tools="tools"
                       :tables="tables"></smart-query-table>
    <!--弹出框-->
    <smart-dialog v-bind="dialogOption"
                  :view.sync="dialogOption.view"
                  :visible.sync="dialogOption.show">
      <component :is="dialogOption.view"
                 :style="{height: dialogHeight}"
                 :dialog-data="dialogData"
                 @close="closeDynamicDialog">
      </component>
    </smart-dialog>
  </div>
</template>

<script>
import detailsDialog from './details-dialog'
import tableDialog from './table-dialog'
export default {
  name: 'default-table',
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
      forms: {
        labelWidth: '80px',
        size: 'mini',
        formFields: [
          {
            label: '姓名',
            placeholder: '请输入姓名',
            field: 'name',
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },
          {
            label: '昵称',
            placeholder: '请输入昵称',
            field: 'nickname'
          },
          {
            label: '年龄',
            placeholder: '请输入年龄',
            field: 'age'
          },
          {
            label: '性别',
            type: 'select',
            placeholder: '请选择性别',
            field: 'select',
            options: [
              {
                value: 0,
                label: '全部'
              },
              {
                value: 1,
                label: '男'
              },
              {
                value: 2,
                label: '女'
              }
            ],
            changeFunc: (obj) => {
              console.log(obj)
            }
          },
          // 下拉框
          {
            label: '下拉框',
            type: 'select',
            placeholder: '请选择下拉框',
            field: 'select1',
            multiple: true,
            options: [
              {
                value: 1,
                label: '你好1'
              },
              {
                value: 2,
                label: '你好2'
              }
            ]
          }
        ]
      },
      tools: [
        {
          label: '刷新',
          icon: 'iconfont icon-shuaxin1',
          func: () => this.$refs.queryTable.loadTable()
        },
        {
          label: '新增',
          auth: 'addTable',
          icon: 'iconfont icon-xinzeng',
          func: () => this.handleAdd()
        },
        {
          label: '删除',
          auth: 'deleteTable',
          icon: 'iconfont icon-shanchu',
          disabled: () => {
            return !this.multipleSelection.length > 0
          },
          func: () => this.handleDel()
        },
        {
          label: '弹出表格',
          auth: 'deleteTable',
          icon: 'iconfont icon-biaoge',
          func: () => this.handleTable()
        }
      ],
      tables: {
        url: {
          type: 'POST',
          method: '/getTable'
        },
        options: {
          type: 'selection',
          page: true,
          // 选中后操作
          selectionChange: row => {
            this.multipleSelection = row
            // console.log('选中', this.multipleSelection)
            // if (row.length > 0)
          }
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
          width: '120px',
          // 操作数量
          options: [
            {
              label: '详情',
              // icon: 'iconfont iconwenjian',
              // type: 'icon', // icon 只是图标
              func: row => this.handleUpdate(row) // 回调
            },
            {
              label: '删除',
              // icon: 'iconfont iconwenjian',
              // type: 'icon', // icon 只是图标
              func: row => this.handleDel(row) // 回调
            }
          ]
        }
      },
      multipleSelection: [],
      dialogHeight: 'auto'
    }
  },
  mounted () {
  },
  components: {
    detailsDialog,
    tableDialog
  },
  methods: {
    handleUpdate (row) {
      this.dialogHeight = 'auto'
      this.$set(this.dialogData, 'type', 'details')
      this.$set(this.dialogData, 'label', '编辑')
      this.$set(this.dialogData, 'data', row)
      this.showDynamicDialog('detailsDialog', '详情', '400px')
    },
    handleAdd () {
      this.dialogHeight = 'auto'
      this.$set(this.dialogData, 'type', 'add')
      this.$set(this.dialogData, 'label', '新增')
      this.$set(this.dialogData, 'data', {})
      this.showDynamicDialog('detailsDialog', '新增', '400px')
    },
    handleDel (row) {
      this.$confirm('删除已选择数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      })
    },
    handleTable () {
      this.dialogHeight = '60vh'
      this.showDynamicDialog('tableDialog', '弹出表格', '1400px')
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
