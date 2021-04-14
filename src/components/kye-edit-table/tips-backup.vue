<template>
  <el-tooltip
    placement="bottom-start"
    popper-class="kye-tooltip__popper"
    :visible-arrow="false"
    :disabled="isDisable"
    :content="content">
    <span class="kye-infotip">
      <label ref="tchild">{{content}}</label>
    </span>
  </el-tooltip>
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
    data () {
      return {
        isDisable: false
      }
    },
    methods: {
      compare () {
        this.$nextTick(() => {
          this.isDisable = this.$refs.tchild.offsetWidth <= this.pwidth
        })
      }
    },
    mounted () {
      this.compare()
    },
    computed: {
      pwidth () {
        return parseInt(this.width)
      }
    },
    watch: {
      content () {
        this.compare()
      },
      width () {
        this.compare()
      }
    }
  }
</script>

<style lang="scss">
  .kye-infotip {
    display: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #2f2f2f;
  }
</style>
