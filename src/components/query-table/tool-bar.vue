<template>
  <div class="yy-tool-bar">
    <div class="tool-list">
      <template v-for="(tool, idx) in tools">
        <el-button :key="idx"
                   :size="tool.size || 'mini'"
                   :icon="tool.icon || ''"
                   type="text"
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
    }
  }
}
</script>

<style scoped lang="scss">
.yy-tool-bar {
  // margin-bottom: 10px;
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
