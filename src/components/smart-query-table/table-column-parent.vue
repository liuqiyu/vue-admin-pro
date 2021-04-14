<template>
  <el-table-column :label="col.label">
    <template v-for="(col, i) in col.children">
      <table-column-parent v-if="col.isParent"
                           :col="col"
                           :key="i"></table-column-parent>
      <table-column v-else
                    :col="col"
                    :key="i"></table-column>
    </template>
  </el-table-column>
</template>

<script>
import tableColumn from './table-column'
export default {
  name: 'table-column-parent',
  props: {
    col: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    tableColumn
  },
  methods: {
    setColor (col, row) {
      if (typeof col.color === 'function') {
        return col.color(row)
      }
      return col.color
    },
    handleCommand (btn, row) {
      if (!btn.func) {
        return
      }
      btn.func(row)
    },
    handleTag (tag, row) {
      if (typeof tag.tag === 'function') {
        return tag.tag(row)
      }
      return tag.tag
    }
  }
}
</script>

<style scoped lang="scss">
.text-btn {
  color: #409eff;
  cursor: pointer;
}
.text-point {
  .point {
    display: inline-block;
    margin-right: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }
}
</style>
