const reduceCheckDialog = (vms, obj) => {
  vms.forEach(v => {
    reduceCheckDialog(v.$children, obj)
    if (v.visible && v.$listeners['update:visible'] && v.$el.className.indexOf('el-dialog__wrapper') > -1) {
      obj.flag = true
    }
  })
}

// ESC键返回路由
const hasDialog = from => {
  let $children = from.matched[1] && from.matched[1].instances.default && from.matched[1].instances.default.$children
  if ($children && $children.length) {
    let obj = { flag: false }
    reduceCheckDialog($children, obj)
    return obj.flag
  }
  return false
}

export default {
  methods: {
    BACK_HOOK_MODULE () {
      this.$router.replace(this._back_hook_module_)
    },
    SET_SAVE_HOOK_FLAG (val = true) {
      this._save_hook_flag_ = val
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.meta.tag === to.meta.tag) {
        vm._back_hook_module_ = from.fullPath
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (!this._save_hook_flag_ && to.meta.tag === from.meta.tag && !hasDialog(from)) {
      this.$confirm('您确定要取消保存当前数据？', '提示')
        .then(_ => next())
        .catch(_ => next(false))
    } else {
      this.SET_SAVE_HOOK_FLAG(false)
      next()
    }
  }
}
