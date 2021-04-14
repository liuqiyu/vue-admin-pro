import pattern from './pattern'
import {Message} from 'element-ui'

export default {
  /**
   * 简单必填字段验证规则
   * @param {string} str
   * @param {string} trigger
   * @param {boolean} required
   */
  str (str, required = false, trigger = 'blur') {
    return [{ required: required, message: str, trigger: trigger }]
  },

  /**
   * 表单验证错误，光标跳转到第一个错误的输入框
   * @param {vue} self 当前组件实例
   * @param {vue} vm form表单实例
   * @param {string} className 下拉容器的class名
   */
  error (self, vm, message = true, className = '.main-panel') {
    if (message) {
      Message({
        duration: 800,
        type: 'error',
        message: '页面输入有误，请检查！'
      })
    }
    self.$nextTick(_ => {
      let error = vm.$el.querySelector('.el-form-item__error')
      let parent = null
      if (error) {
        parent = error.parentNode.querySelector('div')
        if (parent.className.indexOf('date') > -1 || parent.className.indexOf('select') > -1) {
          let mainPage = document.querySelector(className)
          mainPage.scroll(0, parent.scrollTop + 100)
          mainPage = null
        } else {
          let el = parent.querySelector('input') || parent.querySelector('textarea')
          if (el) {
            el.focus()
            el = null
          } else {
            let mainPage = document.querySelector(className)
            mainPage.scroll(0, parent.scrollTop + 100)
            mainPage = null
          }
        }
      }
      error = null
      parent = null
    })
    return false
  },

  /**
   * 正则表达式验证
   * @param {string | object} reg  支持正则库中的正则表达式和自定义正则表达式
   * @param {string} str
   * @param {string} trigger
   */
  reg (reg, str, required = false, trigger = 'blur') {
    return [{
      validator: (rule, value, callback) => {
        if (!required && !value) {
          callback()
        } else if (value && typeof reg === 'object' && reg.test(value)) {
          callback()
        } else if (value && typeof reg === 'string' && pattern[reg].test(value)) {
          callback()
        } else {
          return callback(new Error(str))
        }
      },
      required: required,
      trigger: trigger
    }]
  }
}
