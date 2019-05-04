export default {
  bind (el) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';margin-bottom:0px;top:0px;'

    // 获取原有属性
    // ie: dom.currentStyle
    // firefox、chrome: window.getComputedStyle(dom, null)
    const getStyle = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => window.getComputedStyle(dom, false)[attr]
      }
    })()

    const reg_rate = /%/g
    const reg_px = /px/g

    dialogHeaderEl.onmousedown = function (e) {
      // 隐藏 el-popper
      let elArr = document.querySelectorAll('.el-popper:not([style*="display: none"])')
      elArr && elArr.forEach(v => v.style.display = 'none')
      elArr = null

      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth
      // const dragDomHeight = dragDom.offsetHeight

      const screenWidth = document.documentElement.clientWidth
      const screenHeight = document.documentElement.clientHeight

      const minDragDomLeft = dragDom.offsetLeft + dragDomWidth - 45
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - 45

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - 45

      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(reg_rate, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(reg_rate, '') / 100)
      } else {
        styL = +styL.replace(reg_px, '')
        styT = +styT.replace(reg_px, '')
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-(top) > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }

      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
