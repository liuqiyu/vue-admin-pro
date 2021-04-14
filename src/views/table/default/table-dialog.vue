<template>
  <div class="content-container">
    <smart-query-table ref="queryTable"
                       :forms="forms"
                       :tools="tools"
                       :tables="tables"></smart-query-table>
    <!--弹出框-->
    <smart-dialog v-bind="dialogOption"
                  @close="closeDynamicDialog"
                  :view.sync="dialogOption.view"
                  :visible.sync="dialogOption.show">
      <component :is="dialogOption.view"
                 :dialog-data="dialogData"
                 @close="closeDynamicDialog">
      </component>
    </smart-dialog>
  </div>
</template>

<script>
import detailsDialog from './details-dialog'
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
        options: {
          labelWidth: '70px',
          size: 'mini',
          submitFunc: (model) => {
            console.log(model)
          },
          resetFunc: (model) => {
            console.log('resetFunc', model)
          }
        },
        formFields: [
          {
            label: '姓名',
            placeholder: '请输入姓名',
            field: 'name'
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
            ]
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
            field: 'name',
            width: '180'
          },
          {
            label: '昵称',
            field: 'nickname',
            width: '180'
          },
          {
            label: '年龄',
            field: 'age',
            width: '180'
          },
          {
            label: '性别',
            field: 'gender',
            width: '180'
          },
          {
            label: '地址',
            field: 'address'
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
      multipleSelection: []
    }
  },
  mounted () {
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
