<template>
    <div class="asp-tool-bar">
      <div class="tool-list">
        <template v-for="(tool, idx) in tools">
          <el-button :key="idx"
                     :size="tool.size || 'mini'"
                     :icon="tool.icon || ''"
                     :type="tool.type || 'primary'"
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

<style scoped>
  .asp-tool-bar {
    margin-bottom: 20px;
  }
</style>
