// 表格初始化

import { HEANDERHEIGHT, ROWHEIGHT, FONTSIZE } from '../config'
export default {
  data () {
    return {
      scrollContentWidth: 0,
      contentHeight: 0
    }
  },
  methods: {
    initDom () {
      const refs = this.$refs
      this.boxWrap = refs.boxWrap
      this.box = refs.box
      this.canvas = refs.canvas
      this.textCanvas = refs.textCanvas
      this.scrollContent = refs.scrollContent
      this.hScrollbar = refs.hScrollbar
      this.vScrollbar = refs.vScrollbar
      this.dividLine = refs.dividLine
      this.editCell = refs.editCell
      this.eInput = refs.eInput
      this.eTimeSelect = refs.eTimeSelect
      this.eInputNumber = refs.eInputNumber
      this.eTimePicker = refs.eTimePicker
      this.eSelect = refs.eSelect
      this.eDatePicker = refs.eDatePicker
      this.eSearchTips = refs.eSearchTips
    },
    // 初始化canvas，获取像素比
    initCanvas () {
      const ctx = this.canvas.getContext('2d')
      const textCtx = this.textCanvas.getContext('2d')
      const devicePixelRatio = window.devicePixelRatio || 1
      const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1
      const ratio = devicePixelRatio / backingStoreRatio
      this.ctx = ctx
      this.textCtx = textCtx
      this.ratio = ratio
      this.rowH = ROWHEIGHT * ratio
      this.headerHeight = HEANDERHEIGHT * ratio
      this.fontSize = FONTSIZE * ratio
      this.font = `normal ${this.fontSize}px Microsoft YaHei`
      textCtx.font = this.font
    },
    setCanvas () {
      const { formatData, columnConfig, canvas, ratio, leftWidth, fixedRightWidth, tableMaxHeight, box } = this
      let allwidth = 0
      const allHeight = HEANDERHEIGHT + formatData.length * ROWHEIGHT
      columnConfig.forEach(col => {
        allwidth += parseInt(col.width) || 140
      })
      allwidth += 1
      canvas.width = allwidth * ratio
      canvas.height = allHeight * ratio
      canvas.style.width = allwidth + 'px'
      canvas.style.height = allHeight + 'px'
      // 设置容器高度 宽度
      let contentw = allwidth + leftWidth + fixedRightWidth
      let boxw = box.offsetWidth
      if (tableMaxHeight && allHeight < tableMaxHeight) {
        this.contentHeight = allHeight
      } else if (tableMaxHeight) {
        this.contentHeight = tableMaxHeight
      } else {
        this.contentHeight = allHeight
      }
      if (formatData.length === 0) {
        this.contentHeight = 70
      }
      if (contentw < boxw || contentw < this.boxWrap.offsetWidth) {
        boxw = contentw
      } else {
        boxw = this.boxWrap.offsetWidth
      }
      this.scrollContent.style.width = contentw + 'px'
      this.scrollContentWidth = contentw
      box.style.height = this.contentHeight + 'px'
      box.style.width = boxw + 'px'

      this.$refs.scrollContentWrap.style.height = this.contentHeight + 'px'
    },
    // 更新canvas父级容器在窗口的位置
    updatedBoxPosition () {
      const { top, left } = this.box.getBoundingClientRect()
      this.boxPosition.top = top
      this.boxPosition.left = left
    }
  }
}
