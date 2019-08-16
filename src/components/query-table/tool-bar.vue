<template>
  <div class="v-tool-bar">
    <div class="tool-list">
      <template v-for="(tool, idx) in tools">
        <el-button :key="idx"
                   :size="tool.size || 'mini'"
                   :icon="tool.icon || ''"
                   type="text"
                   :disabled="setDisabled(tool)"
                   @click.stop="handleClick(tool)">{{tool.label}}</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tool-bar',
  props: {
    tools: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick (tool) {
      if (!tool.func) {
        return
      }
      tool.func()
    },
    setDisabled (tool) {
      if (tool.disabled && typeof tool.disabled === 'function') {
        return tool.disabled()
      }
      return tool.disabled
    }
  }
}
</script>

<style scoped lang="scss">
.v-tool-bar {
  // margin-bottom: 10px;
  padding-bottom: 5px;
  .tool-list {
    text-align: right;
    font-size: 14px;
    /deep/ .iconfont {
      margin-right: 5px;
      font-size: 12px;
    }
  }
}
</style>
