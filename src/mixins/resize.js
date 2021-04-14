import { debounce } from '@/utils/utils'

export default {
  data () {
    return {
      $_resizeHandler: null
    }
  },
  mounted () {
    this.$_resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    this.$_initResizeEvent()
  },
  activated () {
    this.$_initResizeEvent()
  },
  beforeDestroy () {
    this.$_destroyResizeEvent()
  },
  deactivated () {
    this.$_destroyResizeEvent()
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_initResizeEvent () {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent () {
      window.removeEventListener('resize', this.$_resizeHandler)
    }
  }
}