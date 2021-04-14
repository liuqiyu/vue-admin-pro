<template>
  <smart-content-page style="height: 100%">
    <smart-query-table ref="queryTable"
                       :forms="forms"
                       :tools="tools"
                       :tables="tables"></smart-query-table>
  </smart-content-page>
</template>

<script>
export default {
  name: 'page-table',
  data () {
    return {
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
            type: 'text',
            placeholder: '请输入姓名',
            defaultValue: '刘',
            field: 'username'
          },
          {
            label: '昵称',
            type: 'text',
            placeholder: '请输入昵称',
            defaultValue: 0,
            field: 'nickname'
          },
          {
            label: '年龄',
            type: 'text',
            placeholder: '请输入年龄',
            field: 'age'
          },
          {
            label: '性别',
            type: 'text',
            placeholder: '请输入性别',
            field: 'gender'
          },
          {
            label: '地址',
            type: 'text',
            placeholder: '请输入地址',
            field: 'address'
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
        }
      ],
      tables: {
        url: {
          type: 'POST',
          method: '/getTable',
          obj: {
            username: 'username'
          }
        },
        options: {
          type: 'selection',
          // page: true,
          defaultSort: {
            prop: 'name',
            order: 'descending'
          },
          initHttp: true,
          // 选中后操作
          selectionChange: row => {
            this.multipleSelection = row
            // console.log('选中', this.multipleSelection)
          }
        },
        columns: [
          {
            label: '姓名',
            field: 'name',
            width: '180',
            sort: true,
            copy: true
          },
          {
            label: '昵称',
            field: 'nickname',
            width: '180'
          },
          {
            label: '年龄',
            field: 'age',
            width: '180',
            sort: true
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
              func: row => this.handleUpdate(row) // 回调
            },
            {
              label: '删除',
              // auth: 'deleteTable1',
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
  methods: {
    handleUpdate (row) {
      this.$router.push({
        path: '/table/page/details/1'
      })
    },
    handleAdd () {
      this.$router.push({
        path: '/table/page/add'
      })
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
    }
  }
}
</script>
prefetch
<style scoped>
</style>
