
// canvas画图

import { textOverflow } from '../utils'
import {
  lineColor, headerColor, headerTextColor, cellPaddingWidth,
  tableTextColor, noEditColor, btnColor
} from '../config'

const CHECK_BORDER = new Image()
CHECK_BORDER.src = require('./../images/checkborder.png')

const CHECK_HENG = new Image()
CHECK_HENG.src = require('./../images/checkheng.png')

const CHECK_DISABLE = new Image()
CHECK_DISABLE.src = require('./../images/checkdisable.png')

const CHECK_RIGHT_DISABLE = new Image()
CHECK_RIGHT_DISABLE.src = require('./../images/checkrightdisable.png')

const CHECK_RIGHT = new Image()
CHECK_RIGHT.src = require('./../images/checkright.png')

export default {
  methods: {
    clearCanvas () {
      const { canvas, ctx } = this
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    paint () {
      this.clearCanvas()
      this.paintHeader()
      this.paintText()
      this.paintLine()
    },
    paintHeader () {
      const { ctx, ratio, font, canvas, headerHeight, columnConfig, textCtx } = this
      let cols = columnConfig || []
      const cw = canvas.width
      ctx.fillStyle = headerColor
      ctx.fillRect(0, 0, cw, headerHeight)
      cols.forEach(item => {
        const x = item.x + 0.5
        // 竖线
        ctx.font = font
        ctx.beginPath()
        ctx.lineWidth = 0.5 * ratio
        ctx.strokeStyle = lineColor
        ctx.moveTo(x, 0)
        ctx.lineTo(x, headerHeight)
        ctx.stroke()
        // 横线
        ctx.textBaseline = 'middle'
        ctx.fillStyle = headerTextColor
        let text = textOverflow(textCtx, item.label, item.width, ratio).text
        let textx = item.x + (cellPaddingWidth * ratio)
        ctx.font = `bold ${font}`
        const texty = headerHeight / 2
        ctx.fillText(text, textx, texty)
      })
    },
    // 画线
    paintLine (cols, width) {
      const { ctx, canvas, columnConfig, formatData, ratio } = this
      cols = columnConfig || []
      width = canvas.width
      // 画横线
      formatData.forEach(item => {
        const y = item.y + 0.5
        ctx.beginPath()
        ctx.lineWidth = 0.5 * ratio
        ctx.strokeStyle = lineColor
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      })
      // 画竖线
      cols.forEach(item => {
        let x = item.x + 0.5
        ctx.beginPath()
        ctx.lineWidth = 0.5 * ratio
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      })
    },
    // 填充表格文字 图标 图片处理
    paintText () {
      const { ctx, ratio, font, formatData, rowH, columnConfig, textCtx, headerHeight } = this
      let x = 0
      let y = 0
      const cols = columnConfig || []
      cols.forEach(col => {
        const key = col.key
        const isEdit = (col.type === 'text' || !col.type)
        x = col.x + (cellPaddingWidth * ratio)
        // 行
        formatData.forEach((item, j) => {
          y = item.y + (rowH / 2) + 2 * ratio
          // 画不可编辑的单元格样式
          if (isEdit) {
            ctx.fillStyle = noEditColor
            ctx.fillRect(col.x, item._index * rowH + headerHeight, col.width * ratio, rowH)
          }
          ctx.font = font
          ctx.textBaseline = 'middle'
          let value = item ? item[key] || '' : ''
          let text = ''
          if (col.type === 'download') {
            text = '下载文件'
            ctx.fillStyle = value ? btnColor : '#ccc'
          } else if (col.type === 'upload') {
            text = '上传文件'
            ctx.fillStyle = btnColor
          } else if (col.type === 'checkbox') {
            let b = item[`_checkbox-${key}`]
            let img = CHECK_BORDER
            if (b) {
              img = CHECK_RIGHT
            }
            ctx.drawImage(img, x + 6 * ratio, y - 7 * ratio, 14 * ratio, 14 * ratio)
          } else {
            ctx.fillStyle = col.click && typeof col.click === 'function' ? btnColor : tableTextColor
            text = textOverflow(textCtx, value, col.width, ratio).text
          }
          ctx.fillText(text, x, y)
        })
      })
    }
  }
}
