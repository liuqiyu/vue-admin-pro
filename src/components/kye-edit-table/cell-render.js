import Vue from 'vue'

const cellRender = Vue.component('cell-render', {
  functional: true,
  props: {
    crender: {
      type: Function,
      default: function () {}
    },
    value: {
      type: [Object, Number, String, Boolean, Array],
      default: function () {
        return {}
      }
    },
    column: {
      type: Object,
      default: function () {
        return {}
      }
    },
    index: {
      type: [Number, String],
      default: 0
    }
  },
  render (h, self) {
    return self.props.crender(h, { index: self.props.index, value: self.props.value, column: self.props.column })
  }
})

export default cellRender
