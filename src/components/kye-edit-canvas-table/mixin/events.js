import { debounce } from 'lodash'
export default {
  data () {
    return {
      activeRowIndex: null, // 活动行，画活动行的时候需要
      mouseConfig: { // 鼠标停留在某一行，某一列的数据存储
        isDivide: false,
        divideCol: {},
        divideMovex: 0,
        headCol: {},
        isMove: false,
        showDivide: false,
        limitLeft: 0, // 拖动限制左边距离
        limitRight: 0 // 拖动限制右边边距离
      },
      checkedRow: [],
      tooltipTimer: null,
      moveDeb: () => {}
    }
  },
  methods: {
    // canvas事件函数
    canvasEvents () {
      this.scrollEvent()
      this.handleMouseMove()
      this.addEvents()
    },
    // 添加事件
    addEvents () {
      const { canvas } = this
      canvas.addEventListener('mousedown', this.handleMouseDown)
      canvas.addEventListener('click', this.handleCanvasClick)
    },
    // 移除事件
    removeEvents () {
      const { canvas, scrollContent } = this
      canvas.removeEventListener('mousedown', this.handleMouseDown)
      canvas.removeEventListener('click', this.handleCanvasClick)
      canvas.removeEventListener('mousemove', this.moveDeb)
      scrollContent.addEventListener('wheel', this.vMouseWheel, {passive: false})
    },
    // 鼠标按下事件
    handleMouseDown (e) {
      this.updatedBoxPosition()
      const { boxPosition } = this
      const y = e.clientY - boxPosition.top
      const x = e.clientX - boxPosition.left
      this.mouseConfig.isMove = false
      this.setHideTooltip()
      this.editType = ''
      this.handleHeaderPoint(x, y)
      // this.resetEditCell()
    },
    divHeaderDividLine (e, col) {
      this.updatedBoxPosition()
      this.editType = ''
      const x = e.clientX - this.boxPosition.left
      this.toMoveDivideLine(x, col)
    },
    // 鼠标点击事件
    handleCanvasClick (e) {
      this.updatedBoxPosition()
      if (!this.formatData.length) {
        return
      }
      const { boxPosition, headerHeight, ratio } = this
      const y = e.clientY - boxPosition.top
      const x = e.clientX - boxPosition.left
      if (y > headerHeight / ratio) {
        this.editType = ''
        this.dealClick(x, y)
      }
    },
    // 鼠标移动事件
    handleMouseMove () {
      const { canvas } = this
      const mfn = e => {
        this.isPaintImage = false
        this.updatedBoxPosition()
        const y = e.clientY - this.boxPosition.top
        const x = e.clientX - this.boxPosition.left
        this.dealMouseMove(x, y)
      }
      this.moveDeb = debounce(mfn, 16.67)
      canvas.addEventListener('mousemove', this.moveDeb)
    },
    // 分割线事件
    divideMove () {
      document.addEventListener('mousemove', this.divideMouseMove)
      document.addEventListener('mouseup', this.divideMouseUp)
    },
    // 分割线移动移动事件
    divideMouseMove (e) {
      const { dividLine, mouseConfig, boxPosition } = this
      const dis = (e.clientX - boxPosition.left) - mouseConfig.divideMovex
      let x = mouseConfig.divideMovex + dis
      if (x < mouseConfig.limitLeft) {
        x = mouseConfig.limitLeft
      } else if (x >= mouseConfig.limitRight) {
        x = mouseConfig.limitRight
      }
      dividLine.style.left = x + 'px'
    },
    // 分割线鼠标抬起事件
    divideMouseUp (e) {
      document.removeEventListener('mousemove', this.divideMouseMove)
      document.removeEventListener('mouseup', this.divideMouseUp)
      const { dividLine, mouseConfig, columnConfig } = this
      const dis = dividLine.offsetLeft - mouseConfig.divideMovex
      let index = mouseConfig.divideCol._index
      mouseConfig.showDivide = false
      columnConfig[index].width += dis
      index++
      if (!columnConfig[index]) return
      for (; index < columnConfig.length; index++) {
        let col = columnConfig[index]
        let prev = columnConfig[index - 1]
        col.x = prev.x + prev.width
      }
      mouseConfig.isDivide = false
      this.setCanvas()
      this.initScroll()
      this.setOverText()
      this.paint()
    },
    // 计算鼠标所在的点位置
    handleHeaderPoint (x, y) {
      if (y <= this.headerHeight) {
        this.dealHeaderPoint(x)
        if (this.mouseConfig.isDivide) {
          this.toMoveDivideLine(x)
        }
      }
    },
    toMoveDivideLine (x, col) {
      const { mouseConfig, dividLine, box, scroll, leftWidth } = this
      if (col) {
        mouseConfig.divideCol = col
      }
      mouseConfig.showDivide = true
      mouseConfig.divideMovex = x
      dividLine.style.left = x + 'px'
      mouseConfig.limitLeft = mouseConfig.divideCol.x - (scroll.disx - leftWidth) + 40
      mouseConfig.limitRight = box.offsetWidth - 15
      this.divideMove()
    },
    // 处理鼠标单击函数
    dealClick (x, y) {
      const { rowH, headerHeight, ratio } = this
      const { row, col } = this.getRowAndCol(x, y)
      this.editCell.style.width = col.width + 'px'
      this.editCell.style.left = col.x / ratio + 'px'
      this.editCell.style.top = (row._index * rowH + headerHeight) / ratio + 'px'
      this.setParams(col, row)
      this.selectRow(row)
    },
    toDealCheckbox (val, col, row) {
      const index = row._index
      const key = col.key
      let isb = !this.formatData[index][`_checkbox-${key}`]
      this.formatData[index][`_checkbox-${key}`] = isb
      this.paint()
      // 直接选择结果true/false
      if (col.formatChecked) {
        isb = col.formatChecked(isb)
        this.originData[index][key] = isb
      }
      col.change(index, isb, this.originData[index])
    },
    // 处理头部位置
    dealHeaderPoint (x) {
      const { ratio, mouseConfig, columnConfig, scroll, leftWidth } = this
      x = x + scroll.disx - leftWidth // 左边宽度
      for (let col of columnConfig) {
        let w = (col.x / ratio) + col.width
        // 这位置是分割线位置
        if ((x < w && x > w - 4) || (x >= w && x < w + 4)) {
          mouseConfig.isDivide = true
          mouseConfig.divideCol = col
          this.setMouseStyle('col-resize')
          break
        } else {
          this.setMouseStyle('default')
          mouseConfig.isDivide = false
          if (w > x) {
            mouseConfig.headCol = col
            break
          }
        }
      }
    },
    // 处理鼠标移动事件
    dealMouseMove (x, y) {
      const { ratio, mouseConfig, columnConfig, scroll, leftWidth } = this
      // 鼠标在表头，并且鼠标不是在分割线移动状态
      if (y <= this.headerHeight && !mouseConfig.isDivide) {
        let px = x + scroll.disx - leftWidth
        for (let col of columnConfig) {
          let w = (col.x / ratio) + col.width
          if ((px < w && px > w - 4) || (px >= w && px < w + 4)) {
            // 这位置是分割线位置
            this.setMouseStyle('col-resize')
            break
          }
          this.setMouseStyle('default')
        }
        return
      }
      // 鼠标body移动
      this.setMouseStyle('default')
      const { row, col } = this.getRowAndCol(x, y)
      this.setTooltip(row, col)
    },
    // 设置鼠标样式
    setMouseStyle (str) {
      this.canvas.style.cursor = str
    },
    // 显示tooltip
    setTooltip (row, col) {
      const { formatData, overData, box, ratio, scroll, leftWidth, headerHeight } = this
      const index = row._index
      const key = col.key
      const item = overData[index]
      clearTimeout(this.tooltipTimer)
      this.setHideTooltip()
      this.tooltipTimer = setTimeout(() => {
        let obj = {
          x: (col.x / ratio) + leftWidth - scroll.disx,
          y: (row.y + headerHeight) / ratio - scroll.disy,
          content: '',
          col: col,
          row: row,
          isLast: false,
          show: false
        }
        if (item && key && col.type !== 'download' && item[key]) {
          obj.content = formatData[index][key]
          obj.isLast = (col.x / ratio) + col.width > box.offsetWidth
          obj.show = true
        }
        this.$refs.tooltips.setPosition(obj)
      }, 1000)
    },
    setHideTooltip () {
      this.$refs.tooltips.hide()
    },
    uploadEvent () {
      this.$refs.eUpload.toFocus()
    }
  },
  beforeDestroy () {
    this.removeEvents()
  }
}
