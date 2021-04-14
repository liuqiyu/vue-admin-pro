<template>
  <transition name="fade" mode="out-in" appear>
    <div v-show="show"
         ref="gtooltip"
         class="gtooltip"
         :style="{top: ctop + 'px'}">
      <div class="gtooltipContent" v-html="content"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      dialog: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        gtooltip: null,
        cleft: -1000,
        ctop: -9000,
        content: '',
        show: false,
        row: {},
        col: {}
      }
    },
    mounted () {
      this.gtooltip = this.$refs.gtooltip
    },
    methods: {
      setPosition (opts) {
        const gtooltip = this.gtooltip
        const parent = this.$parent.$refs
        if (!parent.box) return
        setTimeout(() => {
          this.ctop = opts.y - 8
          this.content = opts.content
          if (opts.isLast) {
            gtooltip.style.left = null
            gtooltip.style.right = '0px'
          } else {
            gtooltip.style.left = opts.x + 'px'
          }
          this.show = opts.show
        })
      },
      hide () {
        this.show = false
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .gtooltip {
    position: absolute;
    z-index: 1000;
    border-radius: 2px;
    border: 1px solid #bdbbbb;
    padding: 1px 6px;
    min-width: 10px;
    max-width: 604px;
    word-wrap: break-word;
    transform-origin: center bottom 0;
    font-size: 12px;
    background-color: #f7f5f5;
  }

  .gtooltipContent {
    min-height: 16px;
    max-height: 150px;
    overflow-y: auto;
    color: #2f2f2f;
  }

  .arrow {
    position: absolute;
    bottom: -7px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #bdbbbb;
  }
</style>
