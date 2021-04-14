import { boxEmptyHeight, headerHeight } from '../config'

export default {
  data () {
    return {
      // 滚动相关
      showVScrollbar: true,
      showHScrollbar: true,
      // 滚动数据存储，
      scroll: {
        top: 0,
        left: 0,
        sdisy: 0,
        disx: 0, // 滚动 水平距离
        disy: 0, // 滚动 垂直距离
        vScrolling: false
      },
      // 数据显示的配置
      canvasConfig: {
        ah: 0,
        aw: 0
      },
      // 锁定滚动 计算数据，渲染画面，
      // 例如：滚动到顶部，用户再次向上滚动就没有必要计算，渲染画图了
      lockRender: 0,
      lockScrollTop: 0,
      lockScrollBottom: 0,
      isScrolling: false,
      canvasBoxWidth: 100
    }
  },
  methods: {
    // 初始化滚动条,初始化布局，获取初始显示的行和列的数据
    initScroll () {
      // 横向滚动条
      const { allRowData, allColData, box, canvas, rowH, ratio, flatData, cHeight, hScrollbar, vertical, horizontal, vScrollbar, canvasBox } = this
      if (!canvas) {
        return
      }
      const hHeight = headerHeight * ratio
      let cw = box.offsetWidth * ratio
      let aw = allColData.reduce((c, v) => c += v.width, 0) // 列总宽度
      let ch = canvas.height
      let ah = hHeight + allRowData.length * rowH // 行总高度
      if (aw <= cw) {
        this.showHScrollbar = false
        // canvasBox.style.width = aw / ratio + 'px'
        this.canvasBoxWidth = aw
        this.scroll.disx = 0
      } else {
        this.showHScrollbar = true
        hScrollbar.style.width = (cw * cw / aw / ratio) + 'px'
        canvasBox.style.width = cw / ratio + 'px'
        this.canvasBoxWidth = cw
      }
      // 循环到最后还是没有超过canvas的高度， 设置dix的高度
      let boxHeight = boxEmptyHeight
      // 容错处理
      // if (ah === canvas.offsetHeight) {
      //   ch = ch * ratio
      // }
      // 当没有数据的时候
      if (flatData.length === 0) {
        this.showVScrollbar = false
        boxHeight = boxEmptyHeight
      } else if (ah <= ch) {
        // 当总数据行高度 小于 canvas高度的时候
        this.showVScrollbar = false
        boxHeight = (ah / ratio)
      } else {
        this.showVScrollbar = true
        boxHeight = cHeight
        let vsh = (ch - hHeight) * (ch - hHeight) / (ah - hHeight) / ratio
        // 垂直滚动条最小高度为50
        vScrollbar.style.height = (vsh < 50 ? 50 : vsh) + 'px'
      }
      horizontal.style.width = cw / ratio + 'px'
      vertical.style.height = (boxHeight - 32) + 'px'
      box.style.height = boxHeight + 'px'
      this.setCanvas()
      this.canvasConfig.ah = ah
      this.canvasConfig.aw = aw
      this.scrollEvent()
    },
    // 滚动事件
    scrollEvent () {
      const { canvas, hScrollbar, vScrollbar } = this
      // 滚动条事件
      hScrollbar.addEventListener('mousedown', this.hScrollbarMouseDown)
      vScrollbar.addEventListener('mousedown', this.vScrollbarMouseDown)
      canvas.addEventListener('wheel', this.vMouseWheel, { passive: false })
    },
    // 横向滚动条鼠标按下
    hScrollbarMouseDown (e) {
      const { hScrollbar } = this
      this.scroll.left = e.clientX - hScrollbar.offsetLeft
      this.resetEditCell()
      this.setTooltipPosition()
      document.addEventListener('mousemove', this.hScrollbarMouseMove)
      document.addEventListener('mouseup', this.hScrollbarMouseUp)
    },
    // 横向滚动条鼠标移动
    hScrollbarMouseMove (e) {
      let clientX = e.clientX
      let left = -this.scroll.left
      const { hScrollbar, horizontal, canvas } = this
      let dis = clientX + left
      let disW = horizontal.offsetWidth - hScrollbar.offsetWidth
      const render = () => {
        if (this.lockRender <= 2) {
          this.isCanvasMove = false
          hScrollbar.style.left = dis + 'px'
          const overWidth = this.canvasConfig.aw - canvas.width
          const percent = dis / disW
          this.isScrolling = true
          this.scroll.disx = Math.round(percent * overWidth) // 计算出到canvase滚动宽度
          this.getDisplayCol()
          this.handleShowText()
          this.paint()
          this.$emit('horizontalScroll', percent)
        }
      }
      if (dis <= 0) {
        dis = 0
        this.lockRender += 1
      } else if (dis > disW) {
        dis = disW
        this.lockRender += 1
      } else {
        this.lockRender = 0
      }
      render()
    },
    // 横向滚动条鼠标抬起，清除document 事件，避免内存泄漏
    hScrollbarMouseUp (e) {
      document.removeEventListener('mousemove', this.hScrollbarMouseMove)
      document.removeEventListener('mouseup', this.hScrollbarMouseUp)
      this.scroll.hScrolling = (this.scroll.disx > 0)
      this.isCanvasMove = true
      this.isScrolling = false
      // this.paint()
    },
    // 垂直滚动条鼠标按下
    vScrollbarMouseDown (e) {
      const { vScrollbar } = this
      this.scroll.top = e.clientY - vScrollbar.offsetTop
      this.setTooltipPosition()
      this.resetEditCell()
      document.addEventListener('mousemove', this.vScrollbarMouseMove)
      document.addEventListener('mouseup', this.vScrollbarMouseUp)
    },
    // 垂直滚动条鼠标移动
    vScrollbarMouseMove (e) {
      const { vScrollbar, vertical, canvasConfig, canvas } = this
      let clientY = e.clientY
      let top = -this.scroll.top
      let dis = clientY + top
      let disH = vertical.offsetHeight - vScrollbar.offsetHeight
      const render = () => {
        if (this.lockScrollTop <= 2) {
          this.isScrolling = true // 正在滚动中状态
          vScrollbar.style.top = (dis - 2) + 'px'
          const overHeight = canvasConfig.ah - canvas.height
          const percent = dis / disH
          this.isScrolling = true
          this.scroll.disy = Math.round(percent * overHeight) // 计算出到canvase滚动宽度
          this.getDisplayRow()
          this.handleShowText()
          this.paint()
        }
      }
      this.isCanvasMove = false
      if (dis <= 0) {
        dis = 0
        this.lockScrollTop += 1
      } else if (dis >= disH) {
        dis = disH
        this.lockScrollTop += 1
      } else {
        this.scroll.vScrolling = true
        this.lockScrollTop = 0
      }
      render()
    },
    // 垂直滚动条鼠标抬起
    vScrollbarMouseUp (e) {
      document.removeEventListener('mousemove', this.vScrollbarMouseMove)
      document.removeEventListener('mouseup', this.vScrollbarMouseUp)
      this.scroll.vScrolling = false
      this.isCanvasMove = true
      this.isScrolling = false
      this.paint()
    },
    // 鼠标滚轮滚动事件
    vMouseWheel (e) {
      const { scroll, canvas, horizontal, hScrollbar, showHScrollbar, showVScrollbar, vertical, vScrollbar } = this
      const { deltaX, deltaY } = e
      this.isPaintImage = true
      this.slotTooltip.show = false
      // 判断是横向滚动还是纵向滚动
      let isHScroll = Math.abs(deltaX) > Math.abs(deltaY)
      // 横向滚动
      if (isHScroll && showHScrollbar) {
        e.preventDefault()
        // 数据溢出出宽度 = 数据的总宽度 - canvas宽度
        const disW = horizontal.offsetWidth - hScrollbar.offsetWidth
        const overWidth = this.canvasConfig.aw - canvas.width
        let disx = scroll.disx + deltaX
        // 横向滚动距离 如果小于 0
        if (disx <= 0) {
          disx = 0
          this.lockRender += 1
        } else if (disx >= overWidth) {
          // 横向滚动距离 >= 数据溢出出宽度
          disx = overWidth
          this.lockRender += 1
        } else {
          this.lockRender = 0
          // e.preventDefault()
        }
        // this.isScrolling = !!deltaX
        // 如果是滚动到最左 或者 最右， 就停止滚动避免浪费性能，只有中间滚动才计算数据，画图操作
        if (this.lockRender < 2) {
          this.setTooltipPosition()
          this.resetEditCell()
          this.scroll.disx = disx
          hScrollbar.style.left = (disx / overWidth) * disW + 'px'
          this.getDisplayCol()
          this.handleShowText()
          this.paint()
        }
      } else if (!isHScroll && showVScrollbar) {
        // 垂直溢出高度
        const overHeight = this.canvasConfig.ah - canvas.height
        const disH = vertical.offsetHeight - vScrollbar.offsetHeight
        let disy = scroll.disy + deltaY
        scroll.sdisy += deltaY
        // 垂直滚动，指向计算数据，画图操作函数
        const scrollYRender = (isScroll = true) => {
          if (isScroll) {
            this.setTooltipPosition()
            this.resetEditCell()
            vScrollbar.style.top = ((disy / overHeight) * disH - 2) + 'px'
            scroll.disy = disy
            scroll.sdisy = 0
            this.getDisplayRow()
            this.handleShowText()
            this.paint()
          }
        }
        if (disy <= 0) {
          disy = 0
          this.lockScrollTop += 1
          this.lockScrollBottom = 0
          // 每次滚动到顶部，保证只执行一次，以免浪费计算性能
          scrollYRender(this.lockScrollTop < 2)
        } else if (disy >= overHeight) {
          disy = overHeight
          this.lockScrollTop = 0
          this.lockScrollBottom += 1
          // 每次滚动到底部，保证只执行一次，以免浪费计算性能
          scrollYRender(this.lockScrollBottom < 2)
        } else {
          this.lockScrollTop = 0
          this.lockScrollBottom = 0
          // 中间滚动都会执行计算
          if (scroll.sdisy >= 16 || scroll.sdisy <= -16) {
            scrollYRender()
          }
          e.preventDefault()
        }
      }
    }
  }
}
