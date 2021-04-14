<template>
  <transition name="fade" mode="out-in" appear>
    <div v-show="show"
         ref="gtooltip"
         class="gtooltip"
         :style="{top: ctop + 'px'}">
      <div class="gtooltipContent">
        <slot>{{content}}</slot>
      </div>
      <div v-if="arrow" class="arrow" :style="{left: crleft + 'px'}"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      content: {
        type: [String, Number],
        default: ''
      },
      top: {
        type: Number,
        default: 0
      },
      left: {
        type: Number,
        default: 0
      },
      show: {
        type: Boolean,
        default: false
      },
      isLast: {
        type: Boolean,
        default: false
      },
      arrow: {
        type: Boolean,
        default: true
      },
      bg: String,
      color: String,
      dialog: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        gtooltip: null,
        crleft: 0,
        cleft: -1000,
        ctop: -9000
      }
    },
    mounted () {
      this.gtooltip = this.$refs.gtooltip
      this.setPosition()
    },
    methods: {
      setPosition () {
        const parent = this.$parent.$refs
        if (!parent.box) return
        setTimeout(() => {
          let w = this.gtooltip.offsetWidth
          let h = this.gtooltip.offsetHeight
          this.cleft = Math.min(this.left - w / 2, parent.box.offsetWidth - w)
          if (this.isLast && (parent.box.offsetWidth - parent.canvasBox.offsetWidth) < 100) {
            this.gtooltip.style.right = '0px'
            this.gtooltip.style.left = null
          } else {
            this.gtooltip.style.right = null
            this.gtooltip.style.left = this.cleft + 'px'
          }
          this.crleft = w / 2 - 8
          if (this.cleft < -16) {
            this.crleft = this.crleft - Math.abs(this.cleft + 16)
            this.cleft = -16
          }
          this.ctop = this.top - h + 3
          if (!this.arrow) {
            this.ctop += 36
            this.cleft += w / 2
          }
        })
      }
    },
    watch: {
      top (val) {
        this.setPosition()
      },
      left (val) {
        this.setPosition()
      },
      content (val) {
        this.setPosition()
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
