
// 数据处理
import { createUuid, textOverflow } from '../utils'
const exclueType = 'checkbox, click'
export default {
  data() {
    return {
      editingRow: {},
      editingCol: {}
    }
  },
  methods: {
    // 格式化数据
    format(column, val, index, row) {
      let value = val
      if (column.filter) {
        if (column.filter.type && column.filter.args) {
          value = this.$filter[column.filter.type] && this.$filter[column.filter.type](value, ...column.filter.args)
        } else {
          value = this.$filter[column.filter] && this.$filter[column.filter](value)
        }
      } else if (column.format && typeof column.format === 'function') {
        value = column.format(index, column, row)
      }
      let type = Object.prototype.toString.call(value)
      if (type.indexOf('Null') > -1 || type.indexOf('Undefined') > -1) {
        value = ''
      }
      return value + ''
    },
    // 缓存数据
    toCatch() {
      let { columnConfig, format, ratio, headerHeight, rowH, textCtx, data } = this
      let index = 0
      let x = 0
      this.formatData = []
      this.originData = JSON.parse(JSON.stringify(data))
      for (let item of this.originData) {
        let obj = { ...item }
        let vo = {}
        columnConfig.forEach(col => {
          const key = col.key
          col.width = parseInt(col.width) || 140
          obj[key] = format(col, obj[key], index, obj)
          if (col.type === 'checkbox') {
            let b = false
            if (col.checked && typeof col.checked === 'function') {
              b = col.checked(obj)
            }
            obj[`_checkbox-${key}`] = b
          }
          const { over } = textOverflow(textCtx, obj[key], col.width)
          vo[key] = over
        })
        if (!item._uuid) {
          obj._uuid = createUuid()
        }
        obj._checkbox = false
        obj._index = index
        obj.y = index * rowH + headerHeight
        this.formatData.push(obj)
        this.overData.push(vo)
        index += 1
      }
      columnConfig.forEach((col, i) => {
        col.width = parseInt(col.width) || 140
        if (i === 0) {
          col.x = 0
        } else {
          x += columnConfig[i - 1].width * ratio
          col.x = x
        }
        col._index = i
      })
    },
    setOverText () {
      let { formatData, columnConfig, textCtx } = this
      this.overData = []
      formatData.forEach((item, i) => {
        let vo = {}
        columnConfig.forEach(col => {
          const key = col.key
          const { over } = textOverflow(textCtx, item[key], col.width)
          vo[key] = over
        })
        this.overData.push(vo)
      })
    },
    // 获取点击的行和列
    getRowAndCol (x, y) {
      const { formatData, columnConfig, scroll, ratio, rowH, leftWidth } = this
      const disx = scroll.disx - leftWidth
      const disy = scroll.disy
      let cRow = {}
      let cCol = {}
      for (let row of formatData) {
        if (y < (row.y + rowH) / ratio - disy) {
          cRow = row
          break
        }
      }
      for (let col of columnConfig) {
        if (x < (col.x / ratio + col.width - disx)) {
          cCol = col
          break
        }
      }
      return {
        col: cCol,
        row: cRow
      }
    },
    // 计算点击那个然后赋值到参数
    setParams (col, row) {
      this.editingCol = col
      this.editingRow = row
      let val = row[col.key]
      this.inputOptions.val = val
      this.inputOptions.col = col
      this.inputOptions.row = row
      if (this.setParamsObj[col.type]) {
        this.editType = exclueType.indexOf(col.type) >= 0 ? '' : col.type
        this.setParamsObj[col.type](val, col, row)
      } else if (col.click && typeof col.click === 'function') {
        col.click(row._index, this.data[row._index], this.formatData[row._index])
      }
    }
  },
  created () {
    const self = this
    const toFocus = c => {
      self.$nextTick(() => {
        self[c].toSetStr()
        self[c].toFocus()
      })
    }
    this.overData = []
    self.setParamsObj = {
      'input' () {
        toFocus('eInput')
      },
      'time-select' () {
        toFocus('eTimeSelect')
      },
      'input-number' () {
        toFocus('eInputNumber')
      },
      'time-picker' () {
        toFocus('eTimePicker')
      },
      'select' () {
        toFocus('eSelect')
      },
      'date-picker' () {
        toFocus('eDatePicker')
      },
      'search-tips' () {
        toFocus('eSearchTips')
      },
      'click' (val, col) {
        const index = self.editingRow._index
        col.click(index, self.data[index], self.formatData[index])
      },
      'download'(val, col) {
        !!val && window.erpOpen(val)
      },
      'upload' () {
        self.uploadEvent()
      },
      'checkbox' (val, col, row) {
        self.toDealCheckbox(val, col, row)
      }
    }
  }
}
