<template>
  <div class="kye-edit-tabel-tips">
    <div v-if="column.ids" class="tagbox" :style="{ width: width }">
      <el-tag
        v-for="(item, index) in tags"
        closable
        :key="item.value"
        :disable-transitions="true"
        @close="handleClose(index)">
        {{item.label}}
      </el-tag>
    </div>
    <div>
      <kye-search-tips
        v-model="searchStr"
        :disabled="disabled"
        :url="column.options.url"
        :value-key="column.options.valueKey"
        :keys="column.options.keys"
        :clearable="!!column.clearable"
        :format-data="column.options.formatData"
        :format-result="column.options.formatResult"
        :input-length="column.options.inputLength || 2"
        @clear="handleClear"
        @select="handleSelect" />
    </div>
  </div>
</template>

<script>
  import kyeSearchTip from '../kye-search-tips'
  export default {
    props: {
      width: {
        type: String,
        default: '200px'
      },
      model: String,
      column: Object,
      data: Object,
      index: [Number, String],
      disabled: Boolean
    },
    components: {
      kyeSearchTip
    },
    data () {
      return {
        searchStr: '',
        tags: [],
        labelArr: [],
        valueArr: []
      }
    },
    methods: {
      clearValidate () {
        this.$parent.clearValidate && this.$parent.clearValidate()
      },
      onFieldBlur () {
        this.$parent.onFieldBlur && this.$parent.onFieldBlur()
      },
      handleSelect (data) {
        let { options, ids } = this.column
        if (data && data.id) {
          if (this.valueArr.includes(data.id) && ids) {
            return
          }
          if (!this.valueArr.includes(data.id) && ids) {
            this.valueArr.push(data.id)
            this.labelArr.push(data[options.valueKey])
            this.tags.push({ label: data[options.valueKey], value: data.id })
            this.searchStr = ''
          } else {
            this.valueArr = [data.id]
            this.labelArr = [data[options.valueKey]]
            this.tags = [{ label: data[options.valueKey], value: data.id }]
          }
        }
        let strRes = this.dealStr()
        this.$emit('select', {
          index: this.index,
          column: this.column,
          str: strRes.str,
          ids: strRes.ids,
          data,
          tags: this.tags
        })
      },
      handleClose (index) {
        this.tags.splice(index, 1)
        this.valueArr.splice(index, 1)
        this.labelArr.splice(index, 1)
        let strRes = this.dealStr()
        this.$emit('close', {
          index: this.index,
          column: this.column,
          str: strRes.str,
          ids: strRes.ids,
          tags: this.tags
        })
      },
      selectChange () {
        let { key, ids } = this.column
        let arr = []
        if (this.data[key]) {
          this.labelArr = this.data[key].split('-')
        }
        if (this.data[ids]) {
          this.valueArr = this.data[ids].split('-')
        }
        for (let i = 0, len = this.labelArr.length; i < len; i++) {
          arr.push({ label: this.labelArr[i], value: this.valueArr[i] })
        }
        this.tags = arr
      },
      dealStr () {
        let str = ''
        let idsStr = ''
        this.tags.forEach(item => {
          str += `-${item.label}`
          idsStr += `-${item.value}`
        })
        if (str.length > 0) {
          str = str.substr(1)
          idsStr = idsStr.substr(1)
        }
        return { str, ids: idsStr }
      },
      handleClear () {
        this.searchStr = ''
        this.$emit('clear')
      },
      initModel () {
        if (this.column.ids) {
          this.searchStr = ''
        } else {
          this.searchStr = this.model
        }
        this.selectChange()
      }
    },
    mounted () {
      this.initModel()
    },
    watch: {
      model () {
        this.initModel()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tagbox{
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<style lang="scss" >
  .kye-edit-tabel-tips{
    .el-tag {
      margin-left: 5px;
      margin-top: 5px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
</style>
