<template>
  <div>
    <table-list  :columns="tables.columns"
                 :operation="tables.operation"
                 :options="tables.options"
                 :tableData="tableData"
                 @sort-change="sortChange"></table-list>
  </div>
</template>

<script>
export default {
  name: 'coding',
  data () {
    return {
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
            label: '告警级别',
            type: 'tag',
            key: 'leavel'
          },
          {
            label: '告警时间',
            key: 'date'
          },
          // {
          //   label: '局站/机房',
          //   type: 'btn-text',
          //   style: 'red',
          //   key: 'site',
          //   func: (row) => {
          //     this.alert()
          //   }
          // },
          // {
          //   label: '设备类型',
          //   key: 'type',
          //   type: 'point',
          //   color: () => {
          //     return 'red'
          //   }
          // },
          {
            label: '告警量',
            key: 'num'
          },
          {
            label: '告警信息',
            key: 'message'
          },
          {
            label: '设备名称',
            key: 'sbname'
          }
        ],
        operation: {
          fixed: 'right',
          label: '操作',
          width: '200px',
          options: [
            {
              label: '增',
              icon: 'el-icon-circle-check-outline',
              type: 'icon',
              func: () => {
                alert(123)
              }
            },
            {
              label: '删',
              icon: 'el-icon-circle-close-outline',
              type: 'icon',
              func: () => {
                alert(123)
              }
            },
            {
              label: '改',
              icon: 'el-icon-edit-outline',
              type: 'icon',
              func: () => {
                alert(123)
              }
            },
            {
              label: '查',
              icon: 'el-icon-zoom-in',
              type: 'icon',
              func: () => {
                alert(123)
              }
            }
          ]
        }
      },
      tableData: []
    }
  },
  mounted () {
    this.tableData = [
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      },
      {
        leavel: '一级',
        date: '2019-10-10 10:10:10',
        site: '科技园',
        type: '开关电源',
        num: '输出电压过高',
        message: '输出电压过高告警',
        sbname: '1#开关电源'
      }
    ]
  },
  methods: {
    alert () {
      alert(312)
    },
    sortChange () {
      console.log('排序')
    }
  }
}
</script>

<style scoped>

</style>
