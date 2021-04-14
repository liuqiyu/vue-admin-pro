
export default {
  data () {
    return {
      // 滚动相关
      showVScrollbar: false,
      showHScrollbar: false,
      // 滚动数据存储，
      scroll: {
        top: 0,
        left: 0,
        disScrollWidth: 0, // 水平滚动条跟容器长度之差
        disContentWidth: 0, // 滚动容器跟内容长度只差
        disScrollHeight: 0, // 垂直滚动条跟容器高度之差
        disContentHeight: 0, // 垂直滚动容器跟内容高度度只差
        startx: 0, // 滚动 水平距离
        starty: 0, // 滚动 垂直距离
        disx: 0,
        disy: 0
      },
      lockRender: 0,
      lockScrollTop: 0
    }
  },
  methods: {
    // 初始化滚动条,初始化布局，获取初始显示的行和列的数据
    initScroll () {
      // 横向滚动条
      const { formatData, box, canvas, hScrollbar, scrollContent, rowH, headerHeight, vScrollbar, ratio } = this
      if (!canvas) {
        return
      }
      let boxWidth = box.offsetWidth
      let allWidth = scrollContent.offsetWidth // 列总长度
      let boxHeight = box.offsetHeight
      let allHeight = formatData.length * rowH + headerHeight // 数据总高度
      let scrollbarWidth = 0
      let scrollbarHeight = 0
      if (allWidth > boxWidth) {
        this.showHScrollbar = true
        scrollbarWidth = boxWidth * boxWidth / allWidth
        hScrollbar.style.width = scrollbarWidth + 'px'
        this.scroll.disContentWidth = allWidth - boxWidth
      } else {
        this.showHScrollbar = false
        this.scroll.disx = 0
        this.scroll.disy = 0
        this.scroll.disContentWidth = 0
      }
      if (allHeight <= boxHeight) {
        // 当总数据行高度 小于 canvas高度的时候
        this.showVScrollbar = false
        this.scroll.disx = 0
        this.scroll.disy = 0
        this.scroll.disContentHeight = 0
      } else {
        this.showVScrollbar = true
        const ah = allHeight / ratio
        scrollbarHeight = boxHeight * boxHeight / ah
        this.scroll.disContentHeight = ah - boxHeight
        scrollbarHeight = scrollbarHeight < 50 ? 50 : scrollbarHeight
        // 垂直滚动条最小高度为50
        vScrollbar.style.height = scrollbarHeight + 'px'
      }
      this.scroll.disScrollHeight = boxHeight - scrollbarHeight
      this.scroll.disScrollWidth = boxWidth - scrollbarWidth
      this.toScrollContent()
    },
    // 滚动事件
    scrollEvent () {
      const { hScrollbar, vScrollbar, scrollContent } = this
      // 滚动条事件
      hScrollbar.addEventListener('mousedown', this.hScrollbarMouseDown)
      vScrollbar.addEventListener('mousedown', this.vScrollbarMouseDown)
      scrollContent.addEventListener('wheel', this.vMouseWheel, { passive: false })
    },
    toScrollContent () {
      const { scroll, scrollContent } = this
      scrollContent.style.transform = `translate3d(${-scroll.disx}px, ${-scroll.disy}px, 0)`
    },
    // 横向滚动条鼠标按下
    hScrollbarMouseDown (e) {
      const { hScrollbar, scroll } = this
      scroll.startx = e.clientX
      scroll.left = hScrollbar.offsetLeft
      this.editType = ''
      document.addEventListener('mousemove', this.hScrollbarMouseMove)
      document.addEventListener('mouseup', this.hScrollbarMouseUp)
    },
    // 横向滚动条鼠标移动
    hScrollbarMouseMove (e) {
      const { scroll } = this
      const left = scroll.left + (e.clientX - scroll.startx)
      this.toHScroll(left)
    },
    toHScroll (left) {
      const { hScrollbar, scroll } = this
      const render = () => {
        if (this.lockRender <= 2) {
          hScrollbar.style.left = left + 'px'
          const percent = left / scroll.disScrollWidth
          this.scroll.disx = Math.round(percent * scroll.disContentWidth)
          this.toScrollContent()
        }
      }
      if (left <= 0) {
        left = 0
        this.lockRender += 1
      } else if (left > scroll.disScrollWidth) {
        left = scroll.disScrollWidth
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
    },
    // 垂直滚动条鼠标按下
    vScrollbarMouseDown (e) {
      const { vScrollbar, scroll } = this
      scroll.top = vScrollbar.offsetTop
      scroll.starty = e.clientY
      // this.resetEditCell()
      document.addEventListener('mousemove', this.vScrollbarMouseMove)
      document.addEventListener('mouseup', this.vScrollbarMouseUp)
    },
    // 垂直滚动条鼠标移动
    vScrollbarMouseMove (e) {
      const { scroll } = this
      let top = scroll.top + (e.clientY - scroll.starty)
      this.toVScroll(top, e)
    },
    toVScroll (top, e) {
      const { vScrollbar, scroll } = this
      const render = () => {
        if (this.lockScrollTop <= 2) {
          vScrollbar.style.top = top + 'px'
          const percent = top / scroll.disScrollHeight
          this.scroll.disy = Math.round(percent * scroll.disContentHeight)
          this.toScrollContent()
        }
      }
      if (top <= 0) {
        top = 0
        this.lockScrollTop += 1
      } else if (top >= scroll.disScrollHeight) {
        top = scroll.disScrollHeight
        this.lockScrollTop += 1
      } else {
        this.scroll.vScrolling = true
        this.lockScrollTop = 0
        e.preventDefault()
        e.stopPropagation()
      }
      render()
    },
    // 垂直滚动条鼠标抬起
    vScrollbarMouseUp (e) {
      document.removeEventListener('mousemove', this.vScrollbarMouseMove)
      document.removeEventListener('mouseup', this.vScrollbarMouseUp)
    },
    // 鼠标滚轮滚动事件
    vMouseWheel (e) {
      const { hScrollbar, showHScrollbar, showVScrollbar, vScrollbar } = this
      const { deltaX, deltaY } = e
      // 判断是横向滚动还是纵向滚动
      const isHScroll = Math.abs(deltaX) > Math.abs(deltaY)
      // 横向滚动
      if (isHScroll && showHScrollbar) {
        // 数据溢出出宽度 = 数据的总宽度 - canva宽度
        const left = hScrollbar.offsetLeft + deltaX
        this.toHScroll(left)
        e.preventDefault()
        e.stopPropagation()
      } else if (showVScrollbar) {
        const top = vScrollbar.offsetTop + deltaY
        this.toVScroll(top, e)
      }
    }
  }
}
