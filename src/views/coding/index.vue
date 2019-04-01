<template>
    <div>
      <query-table :tools="tools"
                   :tables="tables"
                   :form-fields="formFields"></query-table>
    </div>
</template>

<script>

export default {
  name: 'coding',
  data () {
    return {
      tools: [
        {
          label: '新增',
          icon: 'el-icon-success',
          type: 'primary',
          func: () => {
            alert('新增')
          }
        },
        {
          label: '修改',
          icon: 'el-icon-error',
          type: 'primary',
          func: () => {
            alert('修改')
          }
        }
      ],
      // 表单配置
      formFields: [
        {
          label: '姓名',
          type: 'text',
          placeholder: '请输入姓名',
          columnName: 'name'
        },
        {
          label: '状态',
          type: 'select',
          placeholder: '请选中状态',
          columnName: 'status',
          lookup: ''
        },
        {
          label: '日期范围',
          type: 'daterange',
          placeholder: '请选择日期范围',
          columnName: 'daterange'
        },
        {
          label: '时间范围',
          type: 'datetimerange',
          placeholder: '请选择时间范围',
          columnName: 'datetimerange'
        }
      ],
      // 表格配置
      tables: {
        url: {
          method: '/overview/list'
        },
        options: {
          type: 'selection',
          page: true,
          defaultSort: {
            keys: ['name', 'name'],
            prop: 'name',
            order: 'descending'
          },
          rowDblClick: (row) => {
            console.log(row)
            alert('双击')
          },
          selectionChange: (val) => {
            console.log(val)
            alert('选中')
          }
        },
        columns: [
          {
            label: '姓名',
            key: 'name',
            width: '100px'
          },
          {
            label: '性别',
            key: 'gender',
            width: '100px'
          },
          {
            label: '年龄',
            key: 'age',
            width: '100px'
          },
          {
            label: '姓名',
            key: 'name',
            width: '100px'
          },
          {
            label: '性别',
            key: 'gender',
            width: '100px'
          },
          {
            label: '年龄',
            key: 'age',
            width: ''
          }
        ],
        operation: {
          fixed: 'right',
          label: '操作',
          width: '200px',
          options: [
            {
              label: '123',
              icon: 'el-icon-info',
              size: 'mini',
              func: () => {
                alert(123)
              }
            },
            {
              label: '321',
              icon: 'el-icon-info',
              type: 'primary',
              func: () => {
                alert(123)
              }
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
