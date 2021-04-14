<template>
  <div>
    <smart-query-table ref="queryTable"
                       :forms="forms"
                       :tables="tables"></smart-query-table>
  </div>
</template>

<script>
export default {
  name: 'custom-header',
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
          },
          renderHeader: () => {
            return [
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
            ]
          }
        },
        columns: [],
        formatter: {
          gender1 (item) {
            if (item.gender === 2) {
              return '女'
            }
            return '男'
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
