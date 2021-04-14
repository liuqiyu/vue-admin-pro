// 初始化
import { rowHeight, fontSize } from '../config'

export default {
  data () {
    return {
      box: null,
      canvas: null,
      editCell: null,
      ctx: null,
      textCtx: null,
      ratio: null,
      horizontal: null,
      hScrollbar: null,
      vertical: null,
      vScrollbar: null,
      canvasBox: null,
      rowH: rowHeight,
      font: '',
      fontSize: fontSize,
      boxPosition: {
        left: 0,
        top: 0
      },
      highlight: this.options.highlightCurrentRow !== false
    }
  },
  methods: {
    // dom获取存储
    getDom () {
      const refs = this.$refs
      this.box = refs.box
      this.canvas = refs.canvas
      this.editCell = refs.editCell
      this.hScrollbar = refs.hScrollbar
      this.horizontal = refs.horizontal
      this.vScrollbar = refs.vScrollbar
      this.vertical = refs.vertical
      this.canvasBox = refs.canvasBox
      this.ctx = this.canvas.getContext('2d')
      this.textCtx = refs.textCanvas.getContext('2d')
      this.updatedBoxPosition()
      this.initCanvas()
    },
    // 初始化canvas，获取像素比
    initCanvas () {
      const { ctx, textCtx } = this
      const devicePixelRatio = window.devicePixelRatio || 1
      const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1
      this.ratio = devicePixelRatio / backingStoreRatio
      this.rowH = rowHeight * this.ratio
      this.fontSize *= this.ratio
      this.font = `normal ${this.fontSize}px Microsoft YaHei`
      textCtx.font = this.font
    },
    // 设置canvas
    setCanvas () {
      const { ratio, canvas, cHeight, box } = this
      let oldWidth = box.offsetWidth
      let oldHeight = cHeight
      canvas.width = oldWidth * ratio
      canvas.height = cHeight * ratio
      canvas.style.width = oldWidth + 'px'
      canvas.style.height = oldHeight + 'px'
    },
    // 更新canvas父级容器在窗口的位置
    updatedBoxPosition () {
      let { top, left } = this.box.getBoundingClientRect()
      this.boxPosition.top = top
      this.boxPosition.left = left
    }
  }
}
