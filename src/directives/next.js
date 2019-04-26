let parentEl = null

const findEl = (el) => {
  if (!el) return
  el = el.parentNode
  if (!el) return
  let n = el.className || ''
  if (n.includes('el-dialog__wrapper') || n.includes('kye-query-form') || n.includes('kye-expand-page')) {
    parentEl = el
  } else {
    findEl(el)
  }
}
/**
 * 跳转到下一个没有禁用的输入框
 * @param {*} currentInput 当前激活的输入框
 * @param {*} el 容器的el，不传会使用当前激活的el向上递归查找
 */
export const tabNext = (currentInput, el) => {
  if (!currentInput.getAttribute('data-next')) {
    let inputs = []
    if (el) {
      inputs = el.getElementsByTagName('input')
    } else {
      findEl(currentInput)
      inputs = parentEl ? parentEl.getElementsByTagName('input') : []
    }
    // date-picker手动收起picker面板
    if (currentInput.parentElement && currentInput.parentElement.classList.contains('el-date-editor')) {
      if (currentInput.parentElement.__vue__.$vnode.componentOptions.tag === 'kye-date-picker') {
        currentInput.parentElement.__vue__.$children[0].pickerVisible = false
        currentInput.parentElement.__vue__.$children[0].picker.visible = false
      } else if (currentInput.parentElement.__vue__.$vnode.componentOptions.tag === 'el-input') {
        currentInput.parentElement.__vue__.$parent.pickerVisible = false
        currentInput.parentElement.__vue__.$parent.picker.visible = false
      }
    }

    inputs = Array.from(inputs).filter(t => !(t.disabled || (t.getBoundingClientRect().height === 0 && t.getBoundingClientRect().width === 0)))
    for (let i = 0, len = inputs.length; i < len; i++) {
      if (i === (len - 1)) {
        inputs[0].focus()
        break
      } else if (currentInput === inputs[i]) {
        inputs[i + 1].focus()
        break
      }
    }
  }
}

export default {
  bind (el) {
    el.focusNextInput = (e) => {
      let keyCode = e.keyCode || e.which
      if (keyCode === 13 && e.target.nodeName === 'INPUT') {
        tabNext(e.target, el)
      }
    }
    el.addEventListener('keypress', el.focusNextInput)
  },
  unbind (el) {
    el.removeEventListener('keypress', el.focusNextInput)
    el.focusNextInput = null
  }
}
