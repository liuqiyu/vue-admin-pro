<template>
    <div>
<!--      <query-table :tools="tools"-->
<!--                   :tables="tables"-->
<!--                   :form-fields="formFields"></query-table>-->
      {{ 12321321 | thousands}}
      {{ new Date() | month}}
<!--      {{ new Date() | date('YYYY-MM-DD HH:mm:ss')}}-->
      <div class="map-tooltip">
        <span class="icon iconfont iconjiaobiao"></span>
        <header class="title">成都数据中心</header>
        <div class="box alarm">
          <header>告警</header>
          <section class="wrapper">
            <div class="alarm-item">168</div>
            <div class="alarm-item">168</div>
            <div class="alarm-item">168</div>
            <div class="alarm-item">168</div>
          </section>
        </div>
        <div class="box assets">
          <header>告警</header>
          <section class="wrapper">
            <div class="assets-item"><span>楼：</span>168</div>
            <div class="assets-item"><span>楼层：</span>168</div>
            <div class="assets-item"><span>机房：</span>168</div>
          </section>
          <section class="wrapper">
            <div class="assets-item"><span>通道：</span>168</div>
            <div class="assets-item"><span>列头柜：</span>168</div>
            <div class="assets-item"><span>机柜：</span>168</div>
          </section>
        </div>
      </div>
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
      // 表格配置312
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
      }
    }
  },
  methods: {
    alert () {
      alert(312)
    }
  }
}
</script>

<style scoped lang="scss">
  .map-tooltip {
    position: relative;
    width: 400px;
    background: yellow;
    padding: 20px;
    .icon {
      position: absolute;
      top: 20px;
      left: 0;
    }
    > .title {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .box {
      margin-bottom: 20px;
      header {
        font-size: 14px;
        margin-bottom: 15px;
      }
      .wrapper {
        display: flex;
        flex-direction: row;
        .alarm-item {
          flex: 1;
          position: relative;
          padding-left: 14px;
          &:after {
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -4px;
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: red;
          }
        }
        .assets-item {
          flex: 1;
          margin-bottom: 10px;
        }
      }
    }
    .assets {
      margin-bottom: 0;
    }
  }
</style>
