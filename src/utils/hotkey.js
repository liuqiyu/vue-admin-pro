class HotKey {
  constructor (el) {
    this.el = el || this.findDom()
    this.className = `hotkey-marker-${Date.now()}`
  }

  /**
   * 优先级
   * 1、当前打开的嵌套弹框
   * 2、当前打开的顶层弹框
   * 3、内容区域
   */
  findDom () {
    let dom = document.querySelector('.el-dialog__wrapper[append-to-body]:not([style*="display: none"])')
    if (dom) {
      return dom
    }
    dom = document.querySelectorAll('.el-dialog__wrapper:not([style*="display: none"])')
    if (dom && dom.length) {
      return dom[dom.length - 1]
    }
    return document.querySelector('.el-main.main-panel')
  }

  getHotKeys () {
    let list = []

    if (this.el) {
      let button = this.el.getElementsByTagName('button')
      let a = this.el.getElementsByTagName('a')
      list = Array.from(button).concat(Array.from(a))
    }

    if (!list.length) {
      return []
    }

    return list.reduce((a, b) => {
      if (b.getAttribute('hotkey')) {
        a.push({
          element: b,
          hotkey: b.getAttribute('hotkey'),
          border: window.getComputedStyle(b, false).border
        })
      }
      return a
    }, [])
  }

  formatHotKey (str) {
    str = str || ''
    return str.replace(/\s+/g, '').toUpperCase()
  }

  handleHotKey (hotkey) {
    let hotkeys = this.getHotKeys()
    for (let key of hotkeys) {
      if (this.formatHotKey(key.hotkey) === this.formatHotKey(hotkey)) {
        this.fireHotKey(key.element, key.border)
        break
      }
    }
  }

  fireHotKey (element, border) {
    if (!element.offsetParent) {
      return
    }
    let clickEvent = new MouseEvent('click')
    element.style.border = '2px solid #f0976a'
    window.setTimeout(function () {
      element.dispatchEvent(clickEvent)
      element.style.border = border
    }, 50)
  }

  initMarkers (ele) {
    let element = ele.element
    let rect = element.getClientRects()[0]
    let div = document.createElement('div')
    let span = document.createElement('span')
    span.textContent = this.formatHotKey(ele.hotkey)
    span.style.fontWeight = 'bold'
    div.style.top = rect.top + 'px'
    div.style.left = rect.left + 'px'
    div.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 3px 7px 0px'
    div.style.position = 'absolute'
    div.style.padding = '2px 3px'
    div.style.borderRadius = '2px'
    div.style.backgroundColor = 'rgb(227, 190, 35)'
    div.style.zIndex = 100000
    div.className = this.className
    div.appendChild(span)
    document.body.appendChild(div)
  }

  showMarkers () {
    let hotkeys = this.getHotKeys()
    hotkeys.map(this.initMarkers)
  }

  toggleMarkers () {
    let markes = document.getElementsByClassName(this.className)
    if (markes.length) {
      let list = Array.from(markes)
      list.forEach(function (element) {
        document.body.removeChild(element)
      })
      list = null
    } else {
      this.showMarkers()
    }
  }
}

// a-z 65-90    0-9 48-57
function keydownEvent (e, el) {
  // let keyCode = e.keyCode || e.which || e.charCode
  let ctrlKey = e.ctrlKey || e.metaKey

  let hotKey = new HotKey(el)
  // 73 == i
  if (e.keyCode === 73 && e.shiftKey) {
    hotKey.toggleMarkers()
    return
  }

  if (e.keyCode < 48 || e.keyCode > 90) {
    return
  }

  let altKey = e.altKey
  let key = ''

  if (ctrlKey) {
    key = 'ctrl+' + e.key
  }
  if (altKey) {
    key = 'alt+' + e.code.toLowerCase().replace('key', '')
  }

  if (key) {
    if (['ctrl+r', 'ctrl+s', 'ctrl+d', 'ctrl+o', 'ctrl+q'].includes(key)) {
      e.preventDefault()
    }
    // [W, N, T, E] 四种无法阻止默认行为
    hotKey.handleHotKey(key)
  }
}

document.onkeydown = keydownEvent

export default keydownEvent
