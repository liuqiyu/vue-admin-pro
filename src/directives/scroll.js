import { throttle } from 'lodash'

export default {
  bind (el, { expression, value }, vnode) {
    if ((expression === void 0 && value === void 0) || (expression && value)) {
      let vm = vnode.context
      let name = `scroll${vm.$route.meta.tag}`
      el.handleScroll = throttle(e => vm.$bus.$emit(name, e.target), 16)
      el.addEventListener('scroll', el.handleScroll)
    }
  },
  unbind (el) {
    el.removeEventListener('scroll', el.handleScroll)
    el.handleScroll = null
  }
}
