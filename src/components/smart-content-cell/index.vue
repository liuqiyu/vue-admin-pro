<template>
  <div class="smart-content-cell">
    <header>
      <h4>{{title || ''}}</h4>
      <div class="right-bar">
        <slot name="right-bar"></slot>
      </div>
    </header>
    <section>
      <slot></slot>
    </section>
  </div>
</template>

<script>

export default {
  name: 'smart-content-cell',
  props: {
    options: {
      type: Object,
      default: () => { }
    },
    title: [String, Number],
    tools: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/variable";
.smart-content-cell {
  background: #ffffff;
  &:not(:first-child) {
    margin-top: 30px;
  }
  header {
    position: relative;
    height: 16px;
    line-height: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 14px;
      color: #53607e;
      letter-spacing: 0;
      padding: 0 12px;
    }
    &:before {
      content: "";
      width: 3px;
      height: 12px;
      background: #5f8eec;
      border-radius: 0.5px;
      position: absolute;
      top: 50%;
      margin-top: -6px;
      margin-left: 0;
    }
  }
  section {
    padding: 20px 0 0 0;
  }
}
</style>
