<template>
  <el-select v-model="selected"
             :disabled="disabled"
             :filterable="((typeof column.filterable == 'boolean') && column.filterable == false)  ? false : true"
             :clearable="!!column.clearable"
             :remote="column.remote"
             placeholder=" "
             @change="changeSelect"
             @clear="clearSelect"
             :remote-method="remoteMethod"
             :loading="loading">
    <kye-option v-for="(item,index) in selectList"
                :key="index"
                :label="item.label"
                :value="item.value">
      {{item.label}}
    </kye-option>
  </el-select>
</template>

<script>
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  props: {
    index: Number,
    model: [String, Number],
    remotefn: Function,
    ikey: String,
    column: Object,
    row: Object,
    disabled: Boolean
  },
  data () {
    return {
      selected: '',
      selectList: [],
      loading: false,
      selectTimer: null,
      selectValue: '',
      catchData: []
    }
  },
  methods: {
    // 获取远程数据
    remoteMethod (query) {
      const row = this.row
      clearInterval(this.selectTimer)
      // 输入函数防抖
      this.selectTimer = setTimeout(async () => {
        let r = []
        if (query && this.column.remotefn) {
          this.loading = true
          let res = await this.column.remotefn(query, row)
          if (Array.isArray(res) && res.length > 0) {
            r = res
          } else if (res.list && res.list.length > 0 && res.label && res.value) {
            r = this.formateSelect(res)
          }
          this.loading = false
        }
        this.selectList = r
      }, 350)
    },
    // 序列化数据
    formateSelect (data) {
      let { list, label, value } = data
      this.selectValue = value
      this.catchData = list || []
      return list.map(item => ({ label: item[label], value: item[value] }))
    },
    // 选择事件
    changeSelect (val) {
      if (val) {
        let data = {}
        let v = ''
        let labelObj = this.selectList.find(item => item.value === val)
        if (this.selectValue && this.catchData.length > 0) {
          data = this.catchData.find(item => item[this.selectValue] === this.selected)
        } else {
          data = labelObj
        }
        if (this.column.dic) {
          v = val
        } else {
          v = labelObj.label
        }
        this.$emit('selectRemote', { index: this.index, val: v, column: this.column, data })
      }
    },
    clearSelect () {
      this.$emit('clear', this.selected)
    },
    toCustomeSelect () {
      if (this.column.customData) {
        if (Array.isArray(this.column.customData)) {
          this.selectList = this.column.customData
        } else {
          this.selectList = this.column.customData()
        }
      }
    }
  },
  mounted () {
    this.selected = this.model
    if (this.column.dic) {
      this.selectList = this.lookUpOptions[this.column.dic]
    }
    // 自定义配置
    this.toCustomeSelect()
  },
  beforeDestroy () {
    clearInterval(this.selectTimer)
  },
  watch: {
    model (val) {
      this.selected = val
    },
    column: {
      handler () {
        this.toCustomeSelect()
      },
      deep: true
    }
  }
}
</script>
