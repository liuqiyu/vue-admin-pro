<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-30 09:47:42
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-30 10:41:30
 -->
<template>
  <smart-content-page style="height: 100%">
    <edit-table ref="queryTable"
                :tables="tables">
    </edit-table>
  </smart-content-page>
</template>

<script>
export default {
  name: 'default-table',
  data () {
    return {
      tables: {
        options: {
          type: 'selection',
          page: true
        },
        columns: [
          {
            label: '姓名',
            key: 'name',
            width: '180',
            type: 'input',
            rules: [
              { required: true, message: '请输入邮箱地址', trigger: 'blur' }
            ]
          },
          {
            label: '昵称',
            key: 'nickname',
            width: '180',
            type: 'input'
          }
        ],
        operation: {
          fixed: 'right',
          label: '操作',
          width: '120px',
          // 操作数量
          options: [
            {
              label: '详情'
              // icon: 'iconfont iconwenjian',
              // type: 'icon', // icon 只是图标
              // func: row => this.handleUpdate(row) // 回调
            },
            {
              label: '删除'
              // icon: 'iconfont iconwenjian',
              // type: 'icon', // icon 只是图标
              // func: row => this.handleDel(row) // 回调
            }
          ]
        }
      },
      multipleSelection: []
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
