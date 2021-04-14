<template>
  <div class="smart-tool-bar">
    <div class="tool-list">
      <template v-for="(tool, idx) in tools">
        <el-button v-show="setShow(tool)"
                   :key="idx"
                   :size="tool.size || 'mini'"
                   :icon="tool.icon || ''"
                   v-auth="tool.auth || null"
                   :type="tool.type || 'primary'"
                   :plain="tool.plain || false"
                   :round="tool.round || false"
                   :circle="tool.circle || false"
                   :disabled="setDisabled(tool)"
                   @click.stop="handleClick(tool)">{{tool.label}}</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'smart-tool-list',
  props: {
    tools: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick (tool) {
      if (!tool.clickFunc) {
        return
      }
      tool.clickFunc()
    },
    setDisabled (tool) {
      if (tool.disabled && typeof tool.disabled === 'function') {
        return tool.disabled()
      }
      return tool.disabled
    },
    setShow (tool) {
      if (tool.show && typeof tool.show === 'function') {
        return tool.show()
      }
      return !!tool.show || true
    }
  }
}
</script>

<style scoped lang="scss">
.smart-tool-bar {
  .tool-list {
    text-align: left;
    font-size: 14px;
    ::v-deep .iconfont {
      margin-right: 5px;
      font-size: 12px;
    }
  }
}
</style>
