<template>
    <div>
      <query-table :tables="tables"
                   :form-fields="formFields"></query-table>
    </div>
</template>

<script>

export default {
  name: 'coding',
  data () {
    return {
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
          placeholder: '请选择时间',
          columnName: 'daterange'
        }
      ],
      // 表格配置
      tables: {
        url: {
          method: '/overview/list'
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
            width: ''
          }
        ],
        operation: {
          fixed: 'right',
          label: '操作',
          width: '100px',
          options: [
            {
              label: '123',
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
