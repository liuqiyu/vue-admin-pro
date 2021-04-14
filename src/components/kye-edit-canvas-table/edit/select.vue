<template>
  <el-select ref="eSelect"
             v-model="selected"
             :disabled="disabled"
             :filterable="((typeof column.filterable == 'boolean') && column.filterable == false)  ? false : true"
             :clearable="!!column.clearable"
             :remote="column.remote"
             placeholder=" "
             @change="changeSelect"
             @clear="clearSelect"
             @blur="blur"
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
import { mapGetters } from 'vuex'
export default {
  name: 'edit-select',
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
      selected: '',
      oldStr: '',
      selectList: [],
      loading: false,
      selectTimer: null,
      selectValue: '',
      catchData: []
    }
  },
  computed: {
    irow () {
      return this.row
    },
    ...mapGetters([
      'lookUpOptions'
    ])
  },
  methods: {
    blur () {
      this.$parent.editType = ''
    },
    // 获取远程数据
    remoteMethod (query) {
      const row = this.irow
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
        let labelObj = this.selectList.find(item => item.value === val)
        const label = labelObj.label
        if (this.selectValue && this.catchData.length > 0) {
          data = this.catchData.find(item => item[this.selectValue] === this.selected)
        } else {
          data = labelObj
        }
        let v = this.column.dic ? val : labelObj.label
        this.$emit('change', { val: v, label, data }, val !== this.oldStr)
      }
    },
    clearSelect () {
      this.selected = ''
      this.$emit('clear', this.selected)
    },
    toCustomeSelect () {
      let label = false
      if (this.column.dic) {
        this.selectList = this.lookUpOptions[this.column.dic]
        label = true
      } else if (this.column.customData) {
        if (Array.isArray(this.column.customData)) {
          this.selectList = this.column.customData
        } else {
          this.selectList = this.column.customData()
        }
        label = true
      } else {
        this.selectList = []
      }
      this.setValue(label)
    },
    setValue (lable) {
      let v = ''
      if (lable) {
        const obj = this.selectList.find(item => item.label === this.value)
        v = obj ? obj.value : ''
      } else {
        v = this.value || ''
      }
      this.selected = v
      this.oldStr = v
    },
    toFocus () {
      this.$refs.eSelect.focus()
    },
    toSetStr () {
      this.setSelectArr()
    },
    setSelectArr () {
      this.selected = this.value
      // 自定义配置
      this.toCustomeSelect()
    }
  },
  beforeDestroy () {
    clearInterval(this.selectTimer)
  },
  watch: {
    column: {
      handler () {
        this.toCustomeSelect()
      },
      deep: true
    }
  }
}
</script>
