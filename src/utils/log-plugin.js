import { http } from './http'
import Store from '../store'

class LogPlugin {
  constructor () {
    console.log('[log-plugin] log plugin init')
    this.xhrList = []
    this.domEventList = [{ text: '', xpath: '' }]
    this.countThreshold = 10
    this.timeThreshold = 60
    this.addEventListener()
  }

  getNormalizer () {
    return {
      userId: Store.state.user.id || '',
      action: '',
      xpath: '',
      startTime: '',
      endTime: '',
      url: '',
      requestHeaders: '',
      requestBody: '',
      responseHeaders: '',
      responseData: '',
      httpStatus: '',
      menuId: '',
      webTraceId: '',
      resCode: ''
    }
  }

  checkList () {
    if (this.xhrList.length >= this.countThreshold) {
      console.log('[log-plugin] 达到采集量上报')
      this.upload()
      this.clearList()
    }
    if (!this.xhrList.length) return
    if ((+new Date() - this.xhrList[0].config.startTime) / 1000 > this.timeThreshold) {
      console.log(`[log-plugin] 超时上报: ${this.timeThreshold} 秒`)
      this.upload()
      this.clearList()
    }
  }

  clearList () {
    this.xhrList = []
  }

  upload () {
    let data = this.xhrList.map(item => {
      let obj = this.getNormalizer()
      obj.action = (item.actionDom.text || '').substr(0, 4)
      obj.xpath = item.actionDom.xpath || ''
      obj.startTime = String(item.config.startTime || 0)
      obj.endTime = String(item.endTime || 0)
      obj.url = item.config.url
      obj.webTraceId = item.config.headers && item.config.headers.webTraceId
      obj.httpStatus = String(item.status || '')
      obj.menuId = window.__ERPMODULE__.id || ''
      obj.location = location.href
      obj.navigator = navigator.appVersion || navigator.userAgent
      // obj.requestData = item.config.data
      obj.requestData = ''
      if (item.data && item.data.code !== undefined) {
        obj.resCode = String(item.data.code)
      }
      return obj
    })
    http('cts.trace.uploadWebActionLog', data, false)
  }

  handerConfig (config) {
    let startTime = +new Date()
    config.startTime = startTime
  }

  push (xhr) {
    xhr = JSON.parse(JSON.stringify(xhr))
    xhr.endTime = +new Date()
    xhr.actionDom = this.getLastDom()
    // let data = typeof xhr.data === 'object' ? xhr.data : {}
    this.xhrList.push(xhr)
    this.checkList()
  }

  pushErrorXHR (xhr) {
    if (!xhr.response) return
    // let errorXHR = {
    //   config: xhr.config,
    //   request: xhr.request,
    //   actionDom: this.getLastDom(),
    //   headers: '',
    //   status: '',
    //   data: {},
    //   endTime: +new Date()
    // }
    this.push(xhr.response)
  }

  getLastDom () {
    return this.domEventList[0] || {}
  }

  pushDomEvent (dom) {
    this.domEventList = [
      {
        text: dom.textContent && dom.textContent.trim(),
        xpath: '' // this.elementToXpath(dom)
      }
    ]
  }

  handerEvent (e) {
    this.pushDomEvent(e.target)
  }

  addEventListener () {
    document.addEventListener('click', this.handerEvent.bind(this))
  }

  elementToXpath (element) {
    if (element.id !== '') {
      return '//*[@id="' + element.id + '"]'
    }
    if (element === document.body) {
      return '/html/' + element.tagName.toLowerCase()
    }
    let ix = 1
    let siblings = element.parentNode.childNodes
    for (let i = 0, l = siblings.length; i < l; i++) {
      let sibling = siblings[i]
      if (sibling === element) {
        return this.elementToXpath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix) + ']'
      } else if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++
      }
    }
  }
}

export default LogPlugin
