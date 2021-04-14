<template>
  <span class="kye-infotip" @mouseenter="tipMouseEnter" @mouseleave="tipMouseLeave" ref="tips">
    <i ref="tchild">{{content}}</i>
  </span>
</template>

<script>
  export default {
    name: 'kye-infotip',
    props: {
      content: {
        type: [String, Number],
        default: ''
      },
      width: {
        type: [String, Number],
        default: 100
      }
    },
    methods: {
      tipMouseEnter () {
        if (!this.content) {
          return
        }
        this.$nextTick(() => {
          let tw = this.$refs.tips.offsetWidth
          let pw = parseInt(this.width)
          let w = tw >= pw ? tw : pw
          if (this.$refs.tchild.offsetWidth >= w - 12) {
            const {left, top} = this.$refs.tips.getBoundingClientRect()
            this.showTips(left, top)
          }
        })
      },
      tipMouseLeave () {
        if (this.dom) {
          this.dom.style.display = 'none'
        }
      },
      showTips (left, top) {
        if (!this.dom) {
          this.dom = document.querySelector('#keyEditTableTooltip')
          if (!this.dom) {
            this.dom = document.createElement('div')
            this.dom.id = 'keyEditTableTooltip'
            document.body.appendChild(this.dom)
          }
        }
        this.dom.innerHTML = this.content
        this.dom.style.left = left - 12 + 'px'
        this.dom.style.top = top + 28 + 'px'
        this.dom.style.display = 'block'
      }
    }
  }
</script>

<style scoped lang="scss">
  .kye-infotip {
    display: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #2f2f2f;
    cursor: default;
    i {
      font-style: normal
    }
  }
</style>

<style>
  #keyEditTableTooltip {
    position: fixed;
    max-width: 600px;
    max-height: 300px;
    overflow: hidden;
    z-index: 9999;
    border-radius: 2px;
    border: 1px solid #bdbbbb;
    padding: 1px 6px;
    word-wrap: break-word;
    -webkit-transform-origin: center bottom 0;
    transform-origin: center bottom 0;
    font-size: 12px;
    background-color: #f7f5f5;
  }
</style>
