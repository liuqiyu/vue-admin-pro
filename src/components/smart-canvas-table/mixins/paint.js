// 画图文件
import { textOverflow, sortPosition } from '../utils'
import {
  btnColor,
  btnDisableColor,
  lineColor,
  divideColor,
  headerTextColor,
  tableTextColor,
  activeRowColor,
  cellPaddingWidth,
  stripeColor,
  headerColor,
  rowHeight,
  headerHeight
} from '../config'

const GRAY_TOP = new Image()
GRAY_TOP.src = require('../images/graytop.png')

const GRAY_TOP_HOVER = new Image()
GRAY_TOP_HOVER.src = require('../images/graytophover.png')

const GRAY_BOTTOM = new Image()
GRAY_BOTTOM.src = require('../images/graybottom.png')

const GRAY_BOTTOM_HOVER = new Image()
GRAY_BOTTOM_HOVER.src = require('../images/graybottomhover.png')

const CHECK_BORDER = new Image()
CHECK_BORDER.src = require('../images/checkborder.png')

const CHECK_HENG = new Image()
CHECK_HENG.src = require('../images/checkheng.png')

const CHECK_DISABLE = new Image()
CHECK_DISABLE.src = require('../images/checkdisable.png')

const CHECK_RIGHT_DISABLE = new Image()
CHECK_RIGHT_DISABLE.src = require('../images/checkrightdisable.png')

const CHECK_RIGHT = new Image()
CHECK_RIGHT.src = require('../images/checkright.png')

const IMG_ICON = new Image()
IMG_ICON.src = require('../images/imgicon.png')

export default {
  data () {
    return {
      isPaintImage: true,
      sortCol: {
        num: 0,
        col: {},
        beforeCol: {}
      },
      checkboxIcon: {
        'true-true': CHECK_RIGHT_DISABLE,
        'true-false': CHECK_RIGHT,
        'false-true': CHECK_DISABLE,
        'false-false': CHECK_BORDER
      }
    }
  },
  methods: {
    // 清除画布
    clearCanvas () {
      const { canvas, ctx } = this
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    // 从新绘画
    repaint () {
      this.initScroll()
      this.getDisplayRow()
      this.getDisplayCol()
      this.handleShowText()
      this.paint()
    },
    // 绘画
    paint (options = {}) {
      if (this.column.length > 0) {
        requestAnimationFrame(() => {
          this.draw(options)
        })
      }
    },
    // 绘画
    draw (options) {
      this.clearCanvas()
      if (this.flatData.length > 0) {
        this.paintActiveRow()
        this.paintLine()
        this.paintText()
        this.painHeader()
        this.paintFixedLeftColumn()
      } else {
        this.painHeader()
        this.paintFixedLeftColumn()
        this.paintNoData()
      }
      this.paintDivide(options.dividex) // 画分割竖线
      if (this.isPaintImage) {
        this.loadImage()
      }
    },
    // 绘画没有数据的
    paintNoData () {
      const { ctx, canvasBoxWidth, font, fontSize, ratio } = this
      ctx.font = font
      ctx.textBaseline = 'middle'
      ctx.fillStyle = tableTextColor
      ctx.fillText('暂无数据', canvasBoxWidth / 2 - 2 * fontSize, ratio * (headerHeight + rowHeight / 2))
    },
    // 画头部
    painHeader (cols, fixed = false, hWidth) {
      const { ctx, ratio, font, fontSize, canvasConfig, scroll, checkedRow, allRowData, excludeSort, textCtx } = this
      const headerH = headerHeight * ratio
      const disx = fixed ? 0 : scroll.disx
      cols = cols || this.displayCol
      hWidth = hWidth || canvasConfig.aw
      ctx.fillStyle = headerColor
      ctx.fillRect(0, 0, hWidth, headerH)
      cols.forEach(item => {
        const x = item.x + item.width - disx + 0.5
        // 竖线
        ctx.font = font
        ctx.beginPath()
        ctx.lineWidth = 0.5 * ratio
        ctx.strokeStyle = lineColor
        ctx.moveTo(x, 0)
        ctx.lineTo(x, headerH)
        ctx.stroke()
        // 横线
        ctx.textBaseline = 'middle'
        ctx.fillStyle = headerTextColor
        let text = item.label
        let textx = item.x + (cellPaddingWidth * ratio) - disx
        if (!this.excludeSort[item.key]) {
          text = textOverflow(textCtx, text, item.width, ratio).text
        }
        ctx.font = `bold ${font}`
        const texty = headerH / 2
        ctx.fillText(text, textx, texty)
        if (item.key === excludeSort.$$selection) {
          let img = CHECK_BORDER
          if (checkedRow.length > 0 && checkedRow.length < allRowData.length) {
            img = CHECK_HENG
          } else if (checkedRow.length === allRowData.length && allRowData.length > 0) {
            img = CHECK_RIGHT
          }
          ctx.drawImage(img, textx + 6 * ratio, texty - 7 * ratio, 14 * ratio, 14 * ratio)
          return
        }
        if (item.key !== excludeSort.$$index && item.key !== excludeSort.$$operation && !item._showImage && !item._showCheckbox && !item._showUpload) {
          let buttonSort = !item._showButton || (item._showButton && !item.button)
          let showSort = item.width > item.label.length * fontSize + (2 * cellPaddingWidth + 8) * ratio
          if (buttonSort && item.sortKeys && item.sortKeys.length === 2 && showSort) {
            this.paintHeaderSort(item, textx, texty, text)
          }
        }
      })
      ctx.font = font
      if (this.scroll.disy > 0) {
        ctx.beginPath()
        ctx.fillStyle = lineColor
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 1
        ctx.shadowBlur = 4
        ctx.shadowColor = 'rgba(0, 0, 0, .1)'
        ctx.fillRect(0, headerH, canvasConfig.aw, 1)
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.fillStyle = lineColor
        ctx.fillRect(0, headerH, canvasConfig.aw, 1)
        ctx.stroke()
      }
      // 重置阴影
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowBlur = 0
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
    },
    // 头部排序
    paintHeaderSort (item, textx, texty) {
      const { ctx, ratio, sortCol } = this
      let w = 8 * ratio
      let x = textx + sortPosition(this.textCtx, item.label)
      let y = texty - 3 * ratio
      if (sortCol.col._index === item._index && sortCol.num) {
        let img = sortCol.num === 1 ? GRAY_TOP_HOVER : GRAY_BOTTOM_HOVER
        ctx.drawImage(img, x, y, w, w)
      } else {
        ctx.drawImage(GRAY_TOP, x, y, w, w)
      }
      sortCol.beforeCol = sortCol.col
    },
    // 画线
    paintLine (cols, width, fixed = false) {
      const { ctx, canvas, canvasConfig, scroll, displayRow, ratio } = this
      const disy = scroll.disy
      const disx = fixed ? 0 : scroll.disx
      cols = cols || this.displayCol
      width = width || canvasConfig.aw
      // 画横线
      displayRow.forEach(item => {
        ctx.beginPath()
        ctx.lineWidth = 0.5 * ratio
        ctx.strokeStyle = lineColor
        ctx.moveTo(0 - disx, item.y + 0.5 - disy)
        ctx.lineTo(width - disx, item.y + 0.5 - disy)
        ctx.stroke()
      })
      // 画竖线
      cols.forEach(item => {
        let x = item.x + item.width - disx + 0.5
        ctx.beginPath()
        ctx.lineWidth = 0.5 * ratio
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      })
    },
    // 填充表格文字 图标 图片处理
    paintText (cols, fixed = false) {
      const { ctx, ratio, font, scroll, displayRow, displayRowData, checkedRow, flatData, rowH, cachedImages, checkboxRows, page, uploadDisabledRows, excludeSort } = this
      const disy = scroll.disy
      const disx = fixed ? 0 : scroll.disx
      let x = 0
      let y = 0
      cols = cols || this.displayCol
      cols.forEach(col => {
        const key = col.key
        x = col.x - disx + (cellPaddingWidth * ratio)
        // 行
        displayRow.forEach((item, j) => {
          y = item.y - disy + (rowH / 2)
          ctx.font = font
          ctx.textBaseline = 'middle'
          ctx.fillStyle = tableTextColor
          const rowIndex = flatData[item.index]._index - 1
          if (key === excludeSort.$$index) {
            // let t = flatData[item.index]._pageIndex // 排序之后的乱序的
            let t = (item.index + 1) + page.pageSize * (page.currentPage - 1)
            ctx.fillText(t, x, y)
          } else if (key === excludeSort.$$selection) {
            const isFind = checkedRow.some(r => r._gtableuuid === flatData[item.index]._gtableuuid)
            let img = isFind ? CHECK_RIGHT : CHECK_BORDER
            ctx.drawImage(img, x + 6 * ratio, y - 7 * ratio, 14 * ratio, 14 * ratio)
          } else if (key === excludeSort.$$operation) {
            this.paintOperationColumn(item)
          } else if (col._showButton) {
            this.paintButtonColumn(item, col, rowIndex, displayRowData[j], x, y)
          } else if (col._showCheckbox) {
            const { checked, disabled } = checkboxRows[rowIndex]
            const ck = this.checkboxIcon[`${checked}-${disabled}`]
            ctx.drawImage(ck, x + 6 * ratio, y - 7 * ratio, 14 * ratio, 14 * ratio)
          } else if (col._showImage) {
            let img = cachedImages[`${key}_${rowIndex}`] ? cachedImages[`${key}_${rowIndex}`] : IMG_ICON
            ctx.drawImage(img, x, y - rowH / 2, rowH, rowH)
          } else if (col._showUpload) {
            let bcolor = btnColor
            if (uploadDisabledRows[rowIndex].disabled) {
              bcolor = btnDisableColor
            }
            ctx.fillStyle = bcolor
            ctx.fillText('上传', x, y)
          } else {
            const text = displayRowData[j] ? displayRowData[j][key] || '' : ''
            ctx.fillText(text, x, y)
          }
        })
      })
    },
    // 画活动行
    paintActiveRow () {
      const { ctx, rowH, moveRowIndex, canvas, scroll, displayRow, stripe, ratio } = this
      const disy = scroll.disy - (headerHeight - rowHeight) * ratio
      const index = this.calculateActiveIndex()
      if (stripe) {
        displayRow.forEach(item => {
          ctx.beginPath()
          if (item.index !== 0 && item.index % 2 === 1) {
            ctx.fillStyle = stripeColor
          } else {
            ctx.fillStyle = '#fff'
          }
          ctx.fillRect(0, (item.index + 1) * rowH - disy, canvas.width, rowH)
          ctx.stroke()
        })
      }
      if (this.highlight && index !== null) {
        ctx.fillStyle = activeRowColor
        ctx.fillRect(0, (index + 1) * rowH - disy, canvas.width, rowH)
      }
      if (this.highlight && moveRowIndex !== null) {
        ctx.fillStyle = activeRowColor
        ctx.fillRect(0, (moveRowIndex + 1) * rowH - disy, canvas.width, rowH)
      }
    },
    // 画左边固定列
    paintFixedLeftColumn () {
      const { ctx, displayRow, rowH, canvas, moveRowIndex, scroll, fixedLeftCol, stripe } = this
      const disy = scroll.disy
      let index = this.calculateActiveIndex()
      let pWidth = this.fixedLeftWidth
      // 画头部
      // 填充颜色
      displayRow.forEach(obj => {
        let isActive = (index === obj.index) || (moveRowIndex === obj.index)
        let bgcolor = '#fff'
        if (this.highlight && isActive) {
          bgcolor = activeRowColor
        } else if (stripe) {
          if (obj.index !== 0 && obj.index % 2 === 1) {
            bgcolor = stripeColor
          }
        }
        fixedLeftCol.forEach(item => {
          ctx.fillStyle = bgcolor
          ctx.fillRect(item.x, obj.y - disy, item.width, rowH)
        })
      })
      this.paintLine(fixedLeftCol, pWidth, 'blue', true)
      this.paintText(fixedLeftCol, true)
      this.painHeader(fixedLeftCol, true, pWidth)
      // 滚动时候显示阴影
      if (scroll.disx) {
        ctx.beginPath()
        ctx.fillStyle = lineColor
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1
        ctx.shadowBlur = 4
        ctx.shadowColor = 'rgba(0, 0, 0, .2)'
        ctx.fillRect(pWidth, 0, 1, canvas.height)
        ctx.stroke()

        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.shadowBlur = 0
        ctx.shadowColor = 'rgba(0, 0, 0, .1)'
      }
    },
    // 画操作列
    paintOperationColumn (item) {
      const { ctx, ratio, rowH, fontSize, scroll, allFixedRowData, flatData } = this
      const disy = scroll.disy
      let okey = this.excludeSort.$$operation
      let btnx = cellPaddingWidth * ratio + this.allColData.find(v => v.key === okey).x
      const rowIndex = flatData[item.index]._index - 1
      if (allFixedRowData[rowIndex] && allFixedRowData[rowIndex].length > 0) {
        let x = btnx
        for (let btnObj of allFixedRowData[rowIndex]) {
          let label = typeof btnObj.label === 'function' ? btnObj.label(this.data[item.index]) : btnObj.label
          ctx.fillStyle = btnObj.disabled ? btnDisableColor : btnColor
          ctx.fillText(label, x, item.y - disy + rowH / 2)
          x += label.length * fontSize + 12 * ratio
        }
      }
    },
    paintButtonColumn (item, col, rowIndex, disRowData, x, y) {
      const { ctx, ratio, font, buttonDisabledRows, buttonOptions, data, textCtx } = this
      let bcolor = btnColor
      let rowData = data[item.index]
      let btnOpt = buttonOptions[col.key]
      if (buttonDisabledRows[rowIndex] && buttonDisabledRows[rowIndex][col.key]) {
        bcolor = btnDisableColor
      }
      if (col.color && btnOpt.color) {
        bcolor = typeof btnOpt.color === 'function' ? btnOpt.color(rowData) : btnOpt.color
      }
      ctx.fillStyle = bcolor
      if (col.icon) {
        const iconWidth = (btnOpt.size || 18) * ratio
        let icon = (btnOpt.icon && typeof btnOpt.icon === 'function') ? btnOpt.icon(rowData) : btnOpt.icon
        let w = 6
        if (icon && icon.includes('&#x')) {
          if (icon.includes(';') && !icon.endsWith(';')) {
            let arr = icon.split(';')
            ctx.font = `${iconWidth}px iconfont`
            ctx.fillStyle = col.color ? bcolor : 'red'
            ctx.fillText(String.fromCharCode(parseInt(arr[0].replace('&#x', ''), 16)), x, y)
            w += iconWidth
            icon = arr[1]
            ctx.font = font
            ctx.fillStyle = tableTextColor
          } else {
            icon = String.fromCharCode(parseInt(icon.replace('&#x', ''), 16))
            ctx.font = `${iconWidth}px iconfont`
            ctx.fillStyle = col.color ? bcolor : 'red'
          }
        }
        ctx.fillText(icon, x + w, y)
      } else {
        let btxt = ''
        if (col.button) {
          btxt = typeof col.button === 'function' ? col.button(rowData) : col.button
        } else {
          btxt = disRowData ? disRowData[col.key] || '' : ''
        }
        const { text } = textOverflow(textCtx, btxt, col.width, ratio)
        ctx.fillText(text, x, y)
      }
    },
    // 画分割线
    paintDivide (x) {
      if (x) {
        const { ctx, canvas, ratio } = this
        ctx.beginPath()
        ctx.lineWidth = 1 * ratio
        ctx.strokeStyle = divideColor
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }
  }
}
