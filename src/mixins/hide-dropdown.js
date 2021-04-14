import { throttle } from 'lodash'

export default {
  mounted () {
    // 检测是否在 dialog 中使用
    if (this.$parent && (this.$parent.modalAppendToBody || (this.$parent.$parent && this.$parent.$parent.modalAppendToBody))) {
      this.$bus.$on(`scroll${this.$route.meta.tag}`, this.hideDropdown)
    } else {
      this.$bus.$on('GLOBAL_SCROLL', this.hideDropdown)
    }
  },
  beforeDestroy () {
    this.$bus.$off('GLOBAL_SCROLL', this.hideDropdown)
    this.$bus.$off(`scroll${this.$route.meta.tag}`, this.hideDropdown)
  },
  methods: {
    hideDropdown: throttle((el = this) => {
      let select = el.querySelector('.is-focus .el-input__inner')
      let autoSearch = el.querySelector('div[aria-expanded] input')
      let datePicker = el.querySelector('.el-date-editor .el-input__inner') || el.querySelector('.el-date-editor.el-input__inner')
      if (select) {
        select.click()
      } else if (autoSearch) {
        autoSearch.blur()
      } else if (datePicker) {
        let mouseDown = new MouseEvent('mousedown', { view: window })
        let mouseUp = new MouseEvent('mouseup', { view: window })
        document.dispatchEvent(mouseDown)
        document.dispatchEvent(mouseUp)
      }
    }, 1000)
  }
}
