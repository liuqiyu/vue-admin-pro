import store from '@/store'

export default {
  bind (el, binding) {
    if (binding.value) {
      // todo 删除 removeChild 存在渲染问题，暂时使用隐藏功能
      if (!store.getters.roles.includes(binding.value)) {
        el.style.display = 'none'
      }
    }
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    if (binding.value) {
      // todo 删除 removeChild 存在渲染问题，暂时使用隐藏功能
      if (!store.getters.roles.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
