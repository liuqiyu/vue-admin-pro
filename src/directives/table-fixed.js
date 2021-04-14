// table-header + table-body-paddingTop
const OFFSETTOP = 44 + 14

export default {
  bind (el, {
    arg,
    value
  }, vnode) {
    if ((arg && value) || (value && typeof value === 'string')) {
      let vm = vnode.context
      let key = arg || value
      el.handleScroll = e => {
        let $right = el.querySelector('.el-table__fixed-right')
        if (e.scrollTop >= el.offsetTop - OFFSETTOP) {
          vm[key] = e.offsetHeight - 20
          let $patch = el.querySelector('.el-table__fixed-right-patch')
          let width = ($patch && $patch.style.width) || '17px'
          $right && ($right.style.right = width)
        } else {
          vm[key] = null
          $right && ($right.style.right = '0')
        }
      }
      vm.$bus.$on(`scroll${vm.$route.meta.tag}`, el.handleScroll)
    }
  },
  unbind (el, binding, vnode) {
    vnode.context.$bus.$off(
      `scroll${vnode.context.$route.meta.tag}`,
      el.handleScroll
    )
    el.handleScroll = null
  }
}
