<template>
  <!-- <el-upload ref="eUpload"
             :show-file-list="(column.option && column.option.showList) ? column.option.showList : false"
             :code="(column.option && column.option.code) ? column.option.code : ''"
             :disabled="disabled"
             :id="(column.option && column.option.id) ? column.option.id : ''"
             btn-type="text"
             btn-icon="str"
             :size="(column.option && column.option.size) ? column.option.size : undefined"
             :list-type="(column.option && column.option.listType) ? column.option.listType : 'text'"
             :accept="(column.option && column.option.accept) ? column.option.accept : ['excel', 'word', 'pdf', 'image', 'zip']"
             v-model="str"
             @success="uploadSuccess">
    <el-button size="small"
               type="primary"></el-button>
  </el-upload> -->
  <div>123</div>
</template>

<script>
export default {
  name: 'edit-upload',
  props: {
    index: Number,
    value: [String, Number],
    column: {
      type: Object,
      default () {
        return {}
      }
    },
    row: Object,
    disabled: Boolean
  },
  data () {
    return {
      str: []
    }
  },
  methods: {
    uploadSuccess (data) {
      this.$emit('change', { index: this.index, data })
    },
    toFocus () {
      this.$refs.eUpload.manualUpload()
    },
    toSetStr () {
      this.str = (this.row && this.column.key) ? this.row[this.column.key] : []
    }
  }
}
</script>

