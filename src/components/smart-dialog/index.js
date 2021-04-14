/*
 * @Descripttion: change name
 * @Author: liuqiyu
 * @Date: 2019-10-09 14:47:52
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-26 16:29:07
 */
import Vue from 'vue'

// width 单位px
// 最小宽度360，最大宽度1200，计算公式：16*2 + 160*N + (N-1)*8
// 2: 360, 3: 528, 4: 696, 5: 864, 6: 1032, 7: 1200

const SmartDialog = Vue.component('smart-dialog', {
  functional: true,
  render (h, self) {
    self.props.width = self.props.width || '360px'
    if (typeof self.props.width === 'number') {
      if (self.props.width > 1) {
        let width = self.props.width * 212 + (self.props.width - 1) * 8 + 48
        self.props.width = `${width > 1200 ? 1200 : width}px`
      } else {
        self.props.width = '360px'
      }
    }
    if (self.props.hasOwnProperty('view')) {
      self.props.customClass = 'smart-dialog-dynamic'
    }
    if (!self.props.hasOwnProperty('close-on-click-modal')) {
      self.props.closeOnClickModal = false
    }
    if (!self.props.hasOwnProperty('close-on-press-escape')) {
      self.props.closeOnPressEscape = false
    }
    let directives = self.data.directives || []
    self.data.directives = [...directives, {
      name: 'drag'
    }, {
      name: 'next'
    }]
    self.props.appendToBody = true
    let onClose = self.listeners.close
    let $on = {
      close: () => {
        // 关闭时发送事件：解绑动态组件，解决再次打开时数据缓存的问题
        if (self.listeners['update:view']) {
          self.listeners['update:view'](null)
        }
        if (onClose) {
          onClose()
        }
      }
    }
    self.data.on = {
      ...self.data.on,
      ...self.listeners,
      ...$on
    }
    self.data.attrs = {
      ...self.data.attrs,
      ...self.props
    }
    return h(
      'el-dialog',
      self.data,
      self.children &&
      self.children.map(t => {
        if (t.data && t.data.attrs) {
          t.data.attrs = {
            ...t.data.attrs,
            ...(t.componentOptions && t.componentOptions.propsData)
          }
        }
        if (t.data && t.data.on === undefined) {
          t.data.on =
            t.data.on || (t.componentOptions && t.componentOptions.listeners)
        }
        return h(
          (t.componentOptions && t.componentOptions.tag) || t.tag,
          t.data,
          t.children || (t.componentOptions && t.componentOptions.children)
        )
      })
    )
  }
})

export default SmartDialog
