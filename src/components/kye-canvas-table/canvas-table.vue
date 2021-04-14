<template>
  <div ref="box"
       class="box">
    <div class="canvasBox"
         ref="canvasBox">
      <canvas ref="canvas"
              width="1200"
              :height="cHeight"></canvas>
      <div ref="vertical"
           class="vScroll"
           v-show="showVScrollbar">
        <div ref="vScrollbar"
             class="vScrollBar"
             :class="scroll.vScrolling ? 'scrolling' : ''">
        </div>
      </div>
    </div>
    <div ref="horizontal"
         :class="dialog ? 'hScroll-dialog' : 'hScroll'"
         :style="hScrollStyle">
      <div ref="hScrollbar"
           v-show="showHScrollbar"
           class="hScrollBar"></div>
    </div>
    <input ref="editCell"
           class="input-content"
           readonly
           :style="editCellStyle"
           :value="editPosition.text" />
    <tooltip :arrow="false"
             :content="tooltip.content"
             :left="tooltip.left"
             :top="tooltip.top"
             :isLast="tooltip.isLast"
             :dialog="dialog"
             :show="tooltip.show" />
    <tooltip :left="slotTooltip.left"
             :dialog="dialog"
             :top="slotTooltip.top"
             :show="slotTooltip.show">
      <slot name="tooltip"></slot>
    </tooltip>
    <canvas ref="textCanvas"
            width="0"
            height="0"
            style="display:none;"></canvas>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import mixins from './mixins'
import Tooltip from './tooltip'
import { headerHeight, rowHeight } from './config'

const DEFAULT_HEIGHT = headerHeight + 10 * rowHeight

export default {
  name: 'kye-canvas-table',
  mixins: mixins,
  components: { Tooltip },
  props: {
    column: {
      type: Array,
      default () {
        return {}
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    operation: {
      type: Object,
      default () {
        return {}
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    buttonOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    imageOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    checkedOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    uploadOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    height: {
      type: [String, Number],
      default: DEFAULT_HEIGHT
    },
    page: {
      type: Object,
      default () {
        return {
          pageSize: this.$pagination.pageSize,
          currentPage: 1
        }
      }
    },
    pageable: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    selection: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    offsetLeft: {
      type: Number,
      default: 0
    },
    scrollY: Boolean
  },
  computed: {
    getButtonOptions () {
      if (this.buttonOptions) {
        return Object.keys(this.buttonOptions)
      }
      return []
    },
    getImageOptions () {
      if (this.imageOptions) {
        return Object.keys(this.imageOptions)
      }
      return []
    },
    getCheckedOptions () {
      if (this.checkedOptions) {
        return Object.keys(this.checkedOptions)
      }
      return []
    },
    getUploadOptions () {
      if (this.uploadOptions) {
        return Object.keys(this.uploadOptions)
      }
      return []
    },
    fixedRight () {
      return (this.operation && this.operation.options && this.operation.options.length > 0)
    },
    hScrollStyle () {
      if (this.dialog) {
        return null
      }
      let obj = { left: `${this.scrollOffsetLeft}px`, bottom: this.pageable ? '44px' : 0 }
      if (this.fixedHeader) {
        obj.width = '1280px'
      } else {
        obj.right = '16px'
      }
      return obj
    },
    editCellStyle () {
      let { left, top, width } = this.editPosition
      return {
        left: `${left + 2}px`,
        top: `${top + 1}px`,
        width: `${width - 2}px`
      }
    }
  },
  data () {
    return {
      scrollOffsetLeft: 176 + this.offsetLeft,
      cHeight: DEFAULT_HEIGHT,
      resizeThrottle: null,
      isActivated: false,
      tooltip: {
        content: '',
        left: 0,
        top: 0,
        show: false,
        isLast: false
      },
      slotTooltip: {
        left: 0,
        top: 0,
        row: null,
        column: null,
        value: null,
        show: false,
        isLast: false
      },
      editPosition: {
        top: -10000,
        left: -10000,
        text: '',
        width: 0
      }
    }
  },
  methods: {
    windowResize () {
      this.scroll.disy = 0
      this.scroll.disx = 0
      this.setTooltipPosition()
      this.hScrollbar.style.left = 0
      this.vScrollbar.style.top = 0
      this.initScroll()
      this.calculate()
    },
    handleTabClick (path) {
      // 切换模块时重绘 canvas
      if (path === this.$route.path && !this._inactive) {
        this.setCanvasWidth()
      }
    },
    handleSwitchMenu (width) {
      this.scrollOffsetLeft = width + 16 + this.offsetLeft
      this.$emit('switch-menu', width)
    },
    resetEditCell () {
      this.editPosition = {
        top: -10000,
        left: -10000,
        text: '',
        width: 0
      }
    },
    setCanvasWidth () {
      this.$nextTick(() => {
        this.setCanvas()
        this.initScroll()
        this.calculate()
      })
    },
    clearCurrentChange () {
      this.scroll.disx = 0
      this.$refs.hScrollbar.style.left = 0
      this.clearCurrentStatus()
    },
    clearCurrentStatus () {
      this.scroll.disy = 0
      this.activeRowIndex = null
      this.moveRowIndex = null
      this.checkedRow = []
      this.$emit('selection-change', [])
      this.subCurrentChange(-1, -1)
      this.setTooltipPosition()
      this.$refs.vScrollbar.style.top = 0
    },
    reloadData () {
      this.isPaintImage = true
      this.cachedImages = {}
      this.clearCurrentStatus()
      this.resetEditCell()
      this.integrateData()
      this.initScroll()
      this.calculate()
    },
    // 外部控制列是否显示
    setTableColumns () {
      this.clearCurrentChange()
      this.integrateData()
      this.initScroll()
      this.calculate()
    },
    // 返回排序后的原数组，与 el-table 保持 api 一致
    tableData () {
      return this.flatData.map(v => ({ ...this.data[v._index - 1] }))
    },
    showSlotToolTip (val = true) {
      this.slotTooltip.show = val
    }
  },
  mounted () {
    const h = parseInt(this.height)
    this.cHeight = h < 32 ? DEFAULT_HEIGHT : h
    this.resizeDebounce = debounce(this.windowResize, 200)
    window.addEventListener('resize', this.resizeDebounce)
    this.$bus.$on('TAB_CLICK', this.handleTabClick)
    this.$bus.$on('SWITCH_MENU', this.handleSwitchMenu)
    this.$nextTick(() => {
      if (this.column.length > 0) {
        this.$refs.canvasBox.style.borderColor = '#dcdae2'
      }
      this.getDom()
      this.integrateData()
      this.initScroll()
      this.calculate()
      this.canvasEvents()
      this.isActivated = true
    })
  },
  activated () {
    if (this.isActivated) {
      setTimeout(() => {
        this.initScroll()
        this.calculate()
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeDebounce)
    document.removeEventListener('keydown', this.handleKeyDown)
    this.$bus.$off('TAB_CLICK', this.handleTabClick)
    this.$bus.$off('SWITCH_MENU', this.handleSwitchMenu)
  },
  watch: {
    height (val) {
      const h = parseInt(val)
      this.cHeight = h < 32 ? DEFAULT_HEIGHT : h
      this.$nextTick(() => {
        this.initScroll()
        this.calculate()
      })
    },
    data () {
      this.reloadData()
      this.canvasBox && (this.canvasBox.style.borderColor = '#dcdae2')
    },
    column () {
      this.setTableColumns()
      this.canvasBox && (this.canvasBox.style.borderColor = '#dcdae2')
    },
    scrollY () {
      this.initScroll()
      this.calculate()
    },
    scrollOffsetLeft () {
      if (!this._inactive) {
        this.setCanvasWidth()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 612px;
  position: relative;
  /* 强行开启GPU加速 */
  transform: translate3d(0, 0, 0.001);
}

.canvasBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border: 1px solid transparent;
  user-select: none;
}

.box canvas {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.input-content {
  margin: 0;
  outline: none;
  padding: 0 6px;
  top: -10000px;
  left: -10000px;
  border: none;
  color: #333;
  border-radius: 0;
  font-size: 12px;
  position: absolute;
  background-color: #fefadc;
  z-index: 10;
  box-sizing: border-box;
  height: 26px;
  overflow-x: hidden;
  overflow-y: auto;
  word-break: break-all;
  letter-spacing: 0.3px;
}

.hScroll {
  height: 12px;
  position: fixed;
  z-index: 10;
  background-color: #ffffff;
  &-dialog {
    position: relative;
    height: 12px;
  }
}

.hScrollBar {
  user-select: none;
  height: 12px;
  background-color: #aa90e8;
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
}

.vScroll {
  width: 12px;
  height: 100%;
  position: absolute;
  top: 32px;
  right: 0;
}

.vScrollBar {
  user-select: none;
  width: 12px;
  background-color: #aa90e8;
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  right: 0;
  z-index: 9;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
}

.vScrollBar.scrolling {
  opacity: 1;
}
</style>
