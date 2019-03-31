<template>
    <div>
      <query-table :tables="tables"></query-table>
    </div>
</template>

<script>

export default {
  name: 'coding',
  data () {
    return {
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
