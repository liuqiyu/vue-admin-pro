<template>
  <div>
    <section>
      <el-button type="primary" @click="addData">新增数据</el-button>
      <el-button type="danger" @click="deleteData">删除数据</el-button>
      <el-button type="danger" @click="handerEditeData">编辑数据</el-button>
      <el-button type="primary" @click="btnSaveData">保存数据</el-button>
      <el-button type="primary" @click="changeEdit">编辑全部数据</el-button>
      <el-button @click="refreshData">刷新数据</el-button>
      <el-button @click="changeTimeEdit('timer1', 'text')">改变编辑状态</el-button>
      <el-button type="danger" @click="showCanvas">展示canvas编辑表格</el-button>
    </section>
    <kye-edit-table
      :column="column"
      :data="tableData"
      :pages="pages"
      :showIndex="showIndex"
      :showCheckbox="showCheckbox"
      @pageSize="pageSize"
      @pageChange="pageChange"
      @selectRow="selectRow"
      @checkboxRow="checkboxRow"
      ref="atable"
    >
      <template slot="handle">
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="130">
          <template slot-scope="scope">
            <el-button v-show="scope.row._type != 'edit'" @click="editeRow(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-show="scope.row._type == 'edit'" @click="saveRow(scope.$index, scope.row)" type="text" size="small">保存</el-button>
            <el-button v-show="scope.row._type == 'edit'" @click="cancelRow(scope.$index, scope.row)" type="text" size="small">取消</el-button>
          </template>
        </el-table-column>
      </template>
    </kye-edit-table>
    <h1>分割线</h1>

    <kye-edit-canvas-table
      v-if="isShowCanvas"
      :column="column"
      :data="tableData1"
      :pages="pages"
      :showIndex="true"
      :showCheckbox="true"
      :maxHeight="300"
      :fixedRightWidth="100"
      :fixedLeft="true"
      :fixedRight="true"
      @pageSize="pageSize"
      @pageChange="pageChange"
      @selectRow="selectRow"
      @checkboxRow="checkboxRow"
      ref="atable1"
    >
      <template slot="handle" slot-scope="scope">
        <div>
          <el-button @click="saveRow1(scope)" type="text" size="small">保存</el-button>
        </div>
      </template>
    </kye-edit-canvas-table>
  </div>
</template>

<script>
  import kyeEditCanvasTable from './index.vue'
  const tableData = [
    {
      files: [],
      download: 'http://172.20.8.62/attaches/3b1870b41621421b9911a53a3f359493/2c30bd0407cd42cfb671c9b4682bd8f9.jpeg',
      id: 1,
      date: 1522728732000,
      date1: '2016-05',
      timer: '12:00',
      timer1: '12:00:00',
      check: true,
      check2: true,
      name: '已调',
      number: 1,
      province: '10',
      city: '普陀区',
      city2: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      trunkDriverIds: '',
      trunkDriverNames: '',
      zip: 200333
    }
  ]
  const tableData1 = []
  for (let i = 0; i < 10; i++) {
    const obj = {
      files: [],
      download: 'http://172.20.8.62/attaches/3b1870b41621421b9911a53a3f359493/2c30bd0407cd42cfb671c9b4682bd8f9.jpeg',
      id: i,
      date: 1522728732000,
      date1: '2016-05',
      timer: '12:00',
      timer1: '12:00:00',
      check: Math.random(),
      check2: true,
      name: '已调' + i,
      number: 1,
      province: '10',
      city: '普陀区',
      city2: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      trunkDriverIds: '',
      trunkDriverNames: '',
      zip: 200333
    }
    tableData1.push(obj)
  }
  export default {
    components: {
      kyeEditCanvasTable
    },
    data () {
      return {
        isCheckbox: false,
        isShowCanvas: true,
        status: '',
        // 列配置
        column: [
          {
            label: '上传upload',
            key: 'files',
            type: 'upload',
            width: '250px',
            option: {
              code: '12',
              id: '123'
            },
            change(index, row, data) {
              console.log(index, row, data)
            }
          },
          {
            label: '下载download',
            key: 'download',
            type: 'download',
            width: '250px'
          },
          {
            label: '时间timer-select',
            key: 'timer',
            type: 'time-select',
            width: '250px',
            change(index, row, column, val) {
              console.log(index, row)
            }
          },
          {
            label: '时间time-picker',
            key: 'timer1',
            type: 'time-picker',
            width: '250px',
            change(index, row, column, val) {
              console.log(index, row)
            }
          },
          {
            label: 'search-tips',
            key: 'trunkDriverNames',
            type: 'search-tips',
            width: '250px',
            ids: 'trunkDriverIds',
            options: {
              url: 'data.employee.search',
              valueKey: 'chineseName',
              keys: ['chineseName', 'departmentName'],
              formatData: (val) => ({chineseName: val})
            },
            change(index, row, data, tags) {
              console.log(index, row, data, tags)
            }
          },
          {
            label: '日期+过滤器+纯文本',
            key: 'date',
            type: 'text',
            width: '80px',
            filter: 'time',
            change(index, row) {
              console.log(index, row)
            }
          },
          {
            label: '输入框+表单验证',
            key: 'name',
            maxlength: 10,
            type: 'input',
            clearable: true,
            width: '250px',
            rule: [
              { required: true, message: '请输入代理单号', trigger: 'blur' },
              { pattern: /^[A-Za-z0-9]+$/, message: '代理单号格式有误', trigger: 'blur' }
            ],
            change(index, row) {
              console.log(index, row)
            }
          },
          {
            label: '选择框',
            key: 'check',
            width: '150px',
            type: 'checkbox',
            checked (row) {
              return row.check > 0.5
            },
            formatChecked (isb) {
              return isb ? '10' : '20'
            },
            change(index, row) {
              console.log(index, row)
            }
          },
          {
            label: '只能输入数字',
            key: 'number',
            type: 'input-number',
            width: '150px',
            rule: { required: true, message: '必须填写数字', trigger: 'blur' },
            change(index, row) {
              console.log(index, row)
            }
          },
          {
            label: '数据字典下拉数据',
            key: 'province',
            type: 'select',
            width: '150px',
            dic: 'chartered_car_manager_calc_type',
            filter: {
              type: 'lookup',
              args: [
                'chartered_car_manager_calc_type'
              ]
            },
            change(index, row) {
              console.log(index, row)
            }
          },
          {
            label: '远程获取下拉数据',
            key: 'city',
            type: 'select',
            width: '150px',
            remote: true,
            remotefn: this.remoteData,
            change: this.cityChange
          },
          {
            label: '自定义下拉数据',
            key: 'city2',
            type: 'select',
            width: '150px',
            customData: this.setSelectData,
            change(index, row) {
              console.log(index, row)
            },
            format (index, col, row) {
              return '呵呵1'
            }
          },
          {
            label: '日期选择输入',
            key: 'date1',
            type: 'date-picker',
            option: {
              type: 'month',
              valueFormat: 'yyyy-MM'
            },
            width: '150px'
          },
          {
            label: '可点击字段',
            key: 'zip',
            type: 'click',
            click(index, row) {
              console.log(index, row)
            }
          },
          {
            label: '地址',
            key: 'address',
            type: 'input',
            width: '250px',
            change(index, row) {
              console.log(index, row)
            }
          }
        ],
        // 数据
        tableData: [],
        tableData1: [],
        // 页数配置
        pages: {
          size: 20,
          total: 400
        },
        // 显示索引
        showIndex: true,
        // 显示checkbox
        showCheckbox: false,
        // 选中row
        selectRowData: {},
        selectIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        // this.tableData = [...tableData]
        this.tableData1 = tableData1
      }, 2000)
    },
    methods: {
      test (v) {
        this.isCheckbox = !this.isCheckbox
      },
      showCanvas () {
        this.isShowCanvas = !this.isShowCanvas
      },
      // 必须是返回异步函数
      async remoteData(query) {
        console.log('没有走到这里', query)
        // let res = await this.$http('vms.vehicle.search', {vo: {chineseName: query}})
        // let arr = res.rows.map(item => ({label: item.chineseName, value: item.id}))
        let res = await this.$http('vms.vehicle.search', { plateNumber: query })
        // return arr
        // 或者这么返回，这么返回选择的change的时候，第三个参数就是选择的参数
        return {
          list: res.rows,
          label: 'plateNumber',
          value: 'id'
        }
      },
      // 改变组件的数据
      check2Change(index, row) {
        console.log(index, row)
        // 演示代码 改变tData的数据按照实际情况来
        // this.$refs.atable.tData[index].check = false
      },
      // 编辑哪一行
      editeRow(index, row) {
        this.$refs.atable.editeRow(index, row)
      },
      // 保存数据
      saveRow(index, row) {
        // 演示代码下面一行，实际调用接口保存再刷新
        // 不调用接口保存
        this.$refs.atable.saveRow(index, row)
      },
      // 取消保存
      cancelRow(index, row) {
        this.$refs.atable.cancelRow(index, row)
      },
      // 选中行
      selectRow(index, row) {
        this.selectIndex = index
        this.selectRowData = row
      },
      // chackbox改变的时候触发函数
      checkboxRow(checkdata) {
        console.log(checkdata)
      },
      handerEditeData() {
        this.$refs.atable.editeRow(this.selectIndex)
      },
      // 模拟添加数据
      addData() {
        const obj = {
          date: '',
          check: false,
          check2: false,
          name: '',
          province: '',
          city: '',
          address: '',
          zip: 200333
        }
        this.$refs.atable1.addRow(obj)
      },
      // 模拟删除数据
      deleteData() {
        this.$refs.atable1.delRow(0)
      },
      // 刷新数据
      refreshData() {
        this.tableData = [...tableData]
      },
      // 页码size改变
      pageSize(size) {
        console.log(size)
      },
      // 页码改变
      pageChange(page) {
        console.log(page)
      },
      // 表单验证
      async btnSaveData() {
        let validate = await this.$refs.atable.validate()
        console.log(validate)
      },
      saveRow1 (scop) {
        this.$refs.atable1.validator()
      },
      // 设置select的数据
      setSelectData() {
        return [
          {
            label: '呵呵1',
            value: '11'
          },
          {
            label: '呵呵2',
            value: '22'
          }
        ]
      },
      // 操作数据
      cityChange(index, row, selectData) {
        console.log(index, row, selectData)
        let tData = this.$refs.atable.getData()
        tData[index].address = selectData.departmentName
      },
      changeEdit() {
        this.status = 'edit'
      },
      changeTimeEdit(key, type) {
        this.column.forEach(item => {
          if (item.key === key) {
            item.type = type
          }
        })
      }
    }
  }
</script>
