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
            field: 'name',
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            props: {
              placeholder: '请输入姓名',
              disabled: () => {
                return this.a
              }
            },
            defaultValue: '刘依冉'
          },
          {
            label: '昵称',
            field: 'nickname',
            defaultValue: '依宝',
            props: {
              placeholder: '请输入昵称'
            }
          },
          {
            label: '年龄',
            placeholder: '请输入年龄',
            field: 'age'
          },
          {
            label: '性别',
            type: 'select',
            field: 'gender',
            options: async () => {
              const res = await this.$http.get('/getGender')
              return res
            },
            changeFunc: (obj) => {
              console.log(obj)
            },
            props: {
              clearable: true,
              filterable: true,
              optionsLabel: 'label',
              optionsValue: 'id',
              placeholder: '请选择性别',
              remote: true,
              'reserve-keyword': true,
              'popper-class': 'aaaa'
            }
          },
          {
            label: '家庭成员',
            type: 'select',
            placeholder: '请选择性别',
            field: 'family',
            options: async () => {
              const res = await this.$http.get('/getFamily')
              return res
            },
            changeFunc: (obj) => {
              console.log(obj)
            },
            props: {
              optionsLabel: 'label',
              optionsValue: 'id',
              multiple: true,
              clearable: true,
              'collapse-tags': true
            }
          },
          {
            label: '地区',
            type: 'region',
            field: 'region',
            defaultValue: '依宝',
            changeFunc: (obj) => {
              console.log(obj)
            }
          },
          {
            label: '时间',
            type: 'timePicker',
            field: 'timePicker',
            defaultValue: '',
            props: {
              'is-range': true,
              disabled: false
            },
            changeFunc: (obj) => {
              console.log(obj)
            }
          },
          {
            label: '日期',
            type: 'datePicker',
            field: 'datePicker',
            defaultValue: [],
            props: {
              type: 'datetimerange'
            },
            changeFunc: (obj) => {
              console.log(obj)
            }
          }
        ]
      },
      tools: [
        {
          label: '刷新',
          icon: 'iconfont icon-shuaxin1',
          clickFunc: () => this.$refs.queryTable.loadTable()
        },
        {
          label: '新增',
          auth: 'addTable',
          icon: 'iconfont icon-xinzeng',
          clickFunc: () => this.handleAdd()
        },
        {
          label: '删除',
          auth: 'deleteTable',
          icon: 'iconfont icon-shanchu',
          disabled: () => {
            return !this.multipleSelection.length > 0
          },
          clickFunc: () => this.handleDel()
        },
        {
          label: '弹出表格',
          auth: 'deleteTable',
          icon: 'iconfont icon-biaoge',
          clickFunc: () => this.handleTable()
        }
      ],
      tables: {
        url: {
          type: 'POST',
          method: '/getTable'
        },
        options: {
          noPagination: false,
          defaultSort: {
            prop: 'name',
            order: 'descending'
          }
        },
        columns: [
          {
            label: '姓名',
            field: 'name',
            sort: true,
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
            field: 'gender1',
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
        },
        formatter: {
          gender1 (item) {
            if (item.gender === 2) {
              return '女'
            }
            return '男'
          }
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
