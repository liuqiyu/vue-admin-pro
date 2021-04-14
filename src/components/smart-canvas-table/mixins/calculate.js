import { cloneDeep } from 'lodash'
import { getValue, createUuid, textOverflow, toNumber } from '../utils'
import { headerHeight, rowHeight } from '../config'

const INDEX_COL = {
  key: '$$index',
  label: '序号',
  width: 40,
  fixed: 'left',
  show: true
}


const SELECTION_COL = {
  key: '$$selection',
  label: '',
  width: 40,
  fixed: 'left',
  show: true
}


const OPERATION_COL = {
  key: '$$operation',
  label: '操作',
  width: 60,
  fixed: 'left',
  show: true
}

const sortOrder = {
  descending: 2,
  ascending: 1
}

export default {
  data () {
    return {
      colWidthMap: {}, // 记录改变的列宽
      allColData: [], // 处理列坐标数据 {_index: 0, x: 0, width: 0, ...}
      allRowData: [], // 处理行坐标数据 {index: 0, y: 0}
      flatData: [], // 扁平化后的行数据 例如： {'a.b.c': 'xxx'}
      cachedFlatData: [], // 扁平化后的缓存数据，默认排序的时候用到
      allFixedRowData: [], // 右边操作栏 按钮数组
      // 显示数据
      displayCol: [], // 画布的列坐标数据
      displayRow: [], // 画布的行坐标数据
      displayRowData: [], // 画布的行显示数据
      displayOverRowData: [], // 标记每行的各列是否有溢出气泡 {'a.b.x': false}
      // 浮动列
      fixedLeftCol: [], // 左边固定列
      fixedLeftWidth: 0, // 左边固定列总宽度
      checkboxRows: {}, // checkbox选择框容器
      buttonDisabledRows: {}, // 按钮禁用行
      uploadDisabledRows: {}, // 上传行
      maskCol: {}, // 监控列
      virtualCol: {}, // 虚拟字段列
      excludeSortWidth: 0,
      excludeSortIndex: 0,
      excludeSort: { $$index: '$$index', $$selection: '$$selection', $$operation: '$$operation' }
    }
  },
  methods: {
    // 整合，行列坐标，处理数据
    integrateData () {
      const { column, data, rowH, ratio, fixedRight, selection, options, operation, getButtonOptions, getImageOptions, getCheckedOptions, getUploadOptions, page, buttonOptions } = this
      let sindex = 0
      let cols = []
      let oparationsArr = []
      let leftArr = []
      // index计算宽度
      let { pageSize = 0, currentPage = 0 } = page
      let plength = (pageSize * currentPage + '').length
      let indexCol = plength * 10
      INDEX_COL.width = indexCol < 40 ? 40 : indexCol
      // 复选框
      if (selection) {
        sindex++
        oparationsArr.push({...SELECTION_COL})
      }
      // 序号
      sindex++
      oparationsArr.push({...INDEX_COL})
      // 操作列
      if (fixedRight) {
        sindex++
        operation.width = parseInt(operation.width) || OPERATION_COL.width
        oparationsArr.push({ ...OPERATION_COL, width: operation.width, label: operation.label })
      }
      this.excludeSortIndex = sindex
      // 排除 show 为 false 的列
      column.forEach(v => {
        if (v.show) {
          const obj = { ...v, width: parseInt(v.width) }
          v.fixed && v.fixed === 'left' ? leftArr.push(obj) : cols.push(obj)
        }
      })
      cols = oparationsArr.concat(leftArr, cols)
      const alen = cols.length
      const rows = []
      this.allFixedRowData = []
      // 设置列
      let x = 0
      this.excludeSortWidth = 0
      const sort = options.defaultSort
      for (let i = 0; i < alen; i++) {
        let col = cols[i]
        let key = col.key
        if (i > 0) {
          x += cols[i - 1].width
        }
        let width = (this.colWidthMap[key] || col.width) * ratio
        Object.assign(col, { _index: i, x, width })
        if (i < sindex) {
          this.excludeSortWidth += width
          continue
        }
        // 设置加密字段
        if (this.maskCol.hasOwnProperty(key) || this.virtualCol.hasOwnProperty(key)) {
          col._showButton = true
        }
        // 设置按钮
        if (getButtonOptions.includes(key)) {
          let opt = buttonOptions[key]
          col._showButton = true
          col.button = opt.label
          col.icon = !!opt.icon
          col.color = !!opt.color
        }
        // 设置图片
        if (getImageOptions.includes(key)) {
          col._showImage = true
        }
        // 设置checkbox选择框
        if (getCheckedOptions.includes(key)) {
          col._showCheckbox = true
        }
        // 设置upload
        if (getUploadOptions.includes(key)) {
          col._showUpload = true
        }
        // 过滤器
        if (col.filter) {
          if (col.filter.type && col.filter.args) {
            let func = this.$filter[col.filter.type]
            if (func) {
              col.formatter = (row, column, val) => func(val, ...col.filter.args)
            }
          } else {
            // 不显示秒，minute 替换 time
            if (col.filter === 'time') {
              col.filter = 'minute'
            }
            let func = this.$filter[col.filter]
            if (func) {
              col.formatter = (row, column, val) => func(val)
            }
          }
        }
        // 默认远程排序的字段
        if (sort && sort.prop === key) {
          if (!col.sortKeys) {
            col.sortKeys = sort.keys
          }
          if (!this.sortCol.col.key) {
            this.sortCol.col = col
            this.sortCol.num = sortOrder[sort.order || sortOrder.ascending]
          }
        }
      }

      // 对数据循环
      const diffY = ratio * (headerHeight - rowHeight)
      const res = data.map((item, index) => {
        // 整合画横线的坐标
        rows.push({ index, y: diffY + (index + 1) * rowH })
        if (fixedRight) {
          // 有可能是函数，返回必须是数组
          let opts = Array.isArray(operation.options) ? operation.options : operation.options(item)
          this.allFixedRowData.push(this.operationDisabled(opts, item))
        }
        // 设置button的disable
        if (getButtonOptions.length > 0) {
          this.setButtonDisable(item, index)
        }
        // 只能设置一个checkbox
        if (getCheckedOptions.length > 0) {
          this.setCheckStatus(item, index)
        }
        // 只能设置一个upload的disable
        if (getUploadOptions.length > 0) {
          this.setUploadStatus(item, index)
        }
        const obj = {}
        for (let i = sindex; i < alen; i++) {
          const col = cols[i]
          const key = col.key
          // 取到mask的值
          const maskKey = key + 'Mask'
          const virtualKey = key + 'Virtual'
          let maskVal = getValue(maskKey, item)
          let virtualVal = getValue(virtualKey, item)
          // 如果有mask的值
          if (maskVal) {
            this.maskCol[key] = 1
            obj[maskKey] = maskVal
            col._showButton = true // 设置加密字段
          }
          if (virtualVal) {
            this.virtualCol[key] = 1
            obj[virtualKey] = virtualVal
            col._showButton = true // 设置加密字段
          }
          // 格式化数据
          let val = getValue(key, item)
          if (col.formatter && typeof col.formatter === 'function') {
            val = col.formatter(item, col, val)
          }
          obj[key] = val
        }

        obj._index = index + 1
        obj._gtableuuid = createUuid()
        obj._pageIndex = (index + 1) + page.pageSize * (page.currentPage - 1)
        return obj
      })

      // 密封对象，禁止vue 进行 属性setter getter 劫持，优化性能
      this.flatData = Object.preventExtensions(res)
      this.allColData = cols
      this.allRowData = rows
      this.cachedFlatData = Object.preventExtensions(JSON.parse(JSON.stringify(res)))
      this.getFixedLeft()
      oparationsArr = null
      leftArr = null
    },
    // 右边操作列禁用状态
    operationDisabled (opts, row) {
      const arr = cloneDeep(opts)
      return arr.map(v => {
        // 权限控制
        v.disabled = this.authDisabled(v, row)
        return v
      })
    },
    // 设置按钮禁用状态
    setButtonDisable (item, index) {
      const { buttonOptions, getButtonOptions } = this
      for (let key of getButtonOptions) {
        // 权限控制
        let disabled = this.authDisabled(buttonOptions[key], item)
        if (this.buttonDisabledRows[index]) {
          this.buttonDisabledRows[index][key] = disabled
        } else {
          this.buttonDisabledRows[index] = {}
          this.buttonDisabledRows[index][key] = disabled
        }
      }
    },
    // 设置默认选择框选中状态
    setCheckStatus (item, index) {
      const { checkedOptions, getCheckedOptions } = this
      const ckey = getCheckedOptions[0]
      let checked = false
      let disabled = false
      if (checkedOptions[ckey]) {
        if (checkedOptions[ckey].default) {
          checked = checkedOptions[ckey].default(item, ckey)
        }
        if (typeof checkedOptions[ckey].disabled === 'function') {
          disabled = checkedOptions[ckey].disabled(item, ckey)
        } else {
          disabled = !!checkedOptions[ckey].disabled
        }
      }
      this.checkboxRows[index] = { checked, disabled }
    },
    // 设置上传disable状态
    setUploadStatus (item, index) {
      const { uploadOptions, getUploadOptions } = this
      const ckey = getUploadOptions[0]
      let disabled = false
      if (uploadOptions[ckey]) {
        if (typeof uploadOptions[ckey].disabled === 'function') {
          disabled = uploadOptions[ckey].disabled(item)
        } else {
          disabled = !!uploadOptions[ckey].disabled
        }
      }
      this.uploadDisabledRows[index] = { disabled }
    },
    // 获取左边固定列
    getFixedLeft () {
      const { allColData } = this
      let pWidth = 0
      let arr = allColData.filter(item => {
        if (item.fixed === 'left') {
          pWidth += item.width
          return true
        }
        return false
      })
      this.fixedLeftWidth = pWidth
      this.fixedLeftCol = arr
    },
    // 获取显示的行数
    getDisplayRow () {
      const { allRowData, rowH, scroll, canvas } = this
      if (!canvas) {
        return
      }
      // 从超出部分算起，比如有10行已经是滚动出canvas之外了，就从10开始算起
      // 算到canvas高度结束，比如20行结束，取到多少行就是 10 - 20
      let num = Math.floor(scroll.disy / rowH)
      let len = allRowData.length
      let h = 0
      let arr = []
      for (let i = num; i < len; i++) {
        h += rowH
        if (h > canvas.height) {
          break
        }
        arr.push({ ...allRowData[i] })
      }
      this.displayRow = arr
    },
    // 获取显示列
    getDisplayCol () {
      const { allColData, scroll, canvas } = this
      if (!canvas) {
        return
      }
      // 计算显示列 同理与显示行计算
      let disx = scroll.disx
      let len = allColData.length
      const arr = []
      let index = 0
      // 拿到超出显示列的index
      for (let i = 0; i < len; i++) {
        if (allColData[i].x > disx) {
          index = i - 1
          break
        }
      }
      // 计算从显示列 到  canvas 宽度的距离显示的列
      for (; index < len; index++) {
        if (!allColData[index]) {
          continue
        }
        if (allColData[index].x < canvas.width + disx) {
          arr.push(allColData[index])
        } else {
          break
        }
      }
      this.displayCol = arr
    },
    // 文字溢出处理
    handleShowText () {
      const { displayCol, displayRow, flatData, ratio, fixedLeftCol, textCtx } = this
      let arr = []
      let voarr = []
      const colArr = fixedLeftCol.concat(displayCol)
      if (displayRow.length > 0) {
        displayRow.forEach(item => {
          if (item && typeof item.index === 'number') {
            let res = {}
            let vo = {}
            res._index = item.index
            vo._index = item.index
            colArr.forEach(obj => {
              // 处理溢出隐藏数据
              const { over, text } = textOverflow(textCtx, flatData[item.index][obj.key], obj.width, ratio)
              res[obj.key] = text
              vo[obj.key] = over
            })
            arr.push(res)
            voarr.push(vo)
          }
        })
      }
      this.displayRowData = arr
      this.displayOverRowData = voarr
    },
    // 计算函数
    calculate () {
      this.getDisplayRow()
      this.getDisplayCol()
      this.handleShowText()
      this.paint()
    },
    // 获取点击的行和列
    getRowAndCol (x, y, left) {
      const { allColData, allRowData, scroll, ratio, rowH } = this
      const disx = left ? 0 : scroll.disx
      const disy = scroll.disy
      let cRow = {}
      let cCol = {}
      for (let row of allRowData) {
        if (y < (row.y - disy + rowH) / ratio) {
          cRow = row
          break
        }
      }
      for (let col of allColData) {
        if (x < (col.x + col.width - disx) / ratio) {
          cCol = col
          break
        }
      }
      return {
        col: cCol,
        row: cRow
      }
    },
    // 升序
    riseSort () {
      const { flatData, sortCol } = this
      const key = sortCol.col.key
      const sortType = sortCol.col.sortType
      flatData.sort((a, b) => {
        let c = typeof a[key] === 'number' ? a[key] : (a[key] || '')
        let d = typeof b[key] === 'number' ? b[key] : (b[key] || '')
        if ((sortType && sortType === 'number') || typeof c === 'number') {
          return toNumber(c) - toNumber(d)
        }
        return c.localeCompare(d, 'zh')
      })
      this.flatData = Object.preventExtensions(flatData)
      this.calculate()
    },
    // 降序
    downSort () {
      const { flatData, sortCol } = this
      const key = sortCol.col.key
      const sortType = sortCol.col.sortType
      flatData.sort((a, b) => {
        let c = typeof a[key] === 'number' ? a[key] : (a[key] || '')
        let d = typeof b[key] === 'number' ? b[key] : (b[key] || '')
        if ((sortType && sortType === 'number') || typeof c === 'number') {
          return toNumber(d) - toNumber(c)
        }
        return d.localeCompare(c, 'zh')
      })
      this.flatData = Object.preventExtensions(flatData)
      this.calculate()
    },
    // 默认排序
    defaultSort () {
      this.flatData = JSON.parse(JSON.stringify(this.cachedFlatData))
      this.calculate()
    },
    // 计算活动的index
    calculateActiveIndex () {
      const { flatData, displayRow, activeRowIndex } = this
      let index = null
      if (activeRowIndex !== null) {
        for (let i = 0, len = displayRow.length; i < len; i++) {
          let iindex = displayRow[i].index
          if (flatData[iindex] && flatData[iindex]._index === activeRowIndex) {
            index = iindex
            break
          }
        }
      }
      return index
    },
    // 获取源数据
    getOriginData (col, row) {
      const { data, flatData } = this
      let value = ''
      let column = { ...col }
      if (flatData.length === 0) {
        return { value, column, rowData: null }
      }
      const index = flatData[row.index]._index - 1
      let rowData = data[index]
      if (col.button) {
        value = typeof col.button === 'function' ? col.button(data[index]) : col.button
      } else {
        value = getValue(col.key, data[index])
      }
      return { value, column, rowData }
    },
    // 按钮的禁用
    btnDisabled (disabled, row) {
      return (typeof disabled === 'function') ? disabled(row) : !!disabled
    },
    // 权限的控制
    authDisabled ({ disabled, auth }, row) {
      return (auth && !this.$store.getters.permission.menus.includes(auth)) || this.btnDisabled(disabled, row)
    }
  }
}
