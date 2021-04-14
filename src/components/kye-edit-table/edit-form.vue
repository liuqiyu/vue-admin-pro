<template>
  <div v-if="column.type == 'upload'"
       :class="row._type=='edit' ? 'downloadEdit' : ''">
    <el-upload :show-file-list="(column.option && column.option.showList) ? column.option.showList : false"
               :code="(column.option && column.option.code) ? column.option.code : ''"
               :disabled="setDisabled(column, row)"
               :id="getBzid()"
               btn-type="text"
               btn-icon=""
               :limit="(column.option && column.option.limit) ? column.option.limit : undefined"
               :size="(column.option && column.option.size) ? column.option.size : undefined"
               :list-type="(column.option && column.option.listType) ? column.option.listType : 'text'"
               :accept="(column.option && column.option.accept) ? column.option.accept : ['excel', 'word', 'pdf', 'image', 'zip']"
               v-model="arr"
               @success="e => uploadSuccess(e, tIndex, row, column)">
      <el-button size="small"
                 type="primary">点击上传</el-button>
    </el-upload>
  </div>
  <div v-else-if="column.type == 'download'"
       :class="row._type=='edit' ? 'downloadEdit' : ''">
    <span :class="text && text.length > 0 ? '' : 'toDownload'"
          @click="toDownload"
          class="kye-label-click">下载</span>
  </div>
  <div v-else
       :class="row._type=='edit' ? 'formItemEdit' : 'formItemText'"
       style="display: flex">
    <span class="kye-label-click"
          @click="toDecrypt"
          v-if="(row[`${column.key}Mask`] || row[`${column.key}Virtual`]) && row[`${column.key}`].includes('****')"
          style="line-height: 28px">解密</span>
    <div class="tableContent"
         v-if="column.type && column.type != 'text' && row._type=='edit'">
      <el-input v-if="column.type == 'input'"
                :clearable="!!column.clearable"
                :disabled="setDisabled(column, row)"
                :maxlength="column.maxlength"
                :minlength="column.minlength"
                placeholder=" "
                v-model="text"
                v-on:keyup.enter.native="inputEnter(tIndex, row, column)"
                @clear="clearEdit(tIndex, row, column)"
                @blur="inputBlur(tIndex, row, column)"
                @change="inputChange(tIndex, row, column)" />
      <el-input-number v-else-if="column.type == 'input-number'"
                       :clearable="!!column.clearable"
                       :disabled="setDisabled(column, row)"
                       :symbol="column.symbol"
                       :unit="column.unit"
                       :precision="column.precision"
                       :max="column.max"
                       :min="column.min"
                       :maxlength="column.maxlength"
                       :minlength="column.minlength"
                       placeholder=" "
                       v-model="text"
                       @clear="clearEdit(tIndex, row, column)"
                       @blur="inputBlur(tIndex, row, column)"
                       @input="inputChange(tIndex, row, column)" />
      <el-checkbox v-else-if="column.type == 'checkbox'"
                   :disabled="setDisabled(column, row)"
                   :true-label="column.trueLabel || 1"
                   :false-label="column.falseLabel || 0"
                   v-model="text"
                   @change="inputChange(tIndex, row, column)" />
      <e-select v-else-if="column.type == 'select'"
                :disabled="setDisabled(column, row)"
                :model="text"
                :index="tIndex"
                placeholder=" "
                :column="column"
                :row="row"
                @clear="(select) => { clearSelectEdit(tIndex, row, column, select) }"
                @selectRemote="selectRemote" />
      <el-date-picker v-else-if="column.type == 'date-picker'"
                      :clearable="!!column.clearable"
                      :disabled="setDisabled(column, row)"
                      v-model="text"
                      :format="(column.option && column.option.format) ? column.option.format : ''"
                      :type="(column.option && column.option.type) ? column.option.type : 'datetime'"
                      :value-format="(column.option && column.option.valueFormat) ? column.option.valueFormat : ''"
                      :picker-options="(column.option && column.option.pickerOptions) ? column.option.pickerOptions : {}"
                      placeholder=" "
                      @clear="clearEdit(tIndex, row, column)"
                      @input="datetimeChange(tIndex, row, column)" />
      <search-tips v-else-if="column.type == 'search-tips'"
                   :index="tIndex"
                   :column="column"
                   :data="row"
                   :model="text"
                   :disabled="setDisabled(column, row)"
                   :width="column.tipsWidth || '200px'"
                   @clear="clearEdit(tIndex, row, column)"
                   @select="searchTipsSelect"
                   @close="searchTipsClose" />
      <el-time-select v-else-if="column.type == 'time-select'"
                      v-model="text"
                      :disabled="setDisabled(column, row)"
                      :clearable="!!column.clearable"
                      :picker-options="(column.options && column.options.pickerOptions) ? column.options.pickerOptions : {
            start: '07:00',
            step: '00:15',
            end: '22:30'
          }"
                      placeholder=" "
                      @clear="clearEdit(tIndex, row, column)"
                      @change="timeSelectChange(tIndex, row, column)" />
      <el-time-picker v-else-if="column.type == 'time-picker'"
                      v-model="text"
                      :clearable="!!column.clearable"
                      :disabled="setDisabled(column, row)"
                      :format="(column.option && column.option.format) ? column.option.format : 'HH:mm:ss'"
                      :picker-options="(column.options && column.options.pickerOptions) ? column.options.pickerOptions : {selectableRange: '00:00:00 - 23:59:59'}"
                      placeholder=" "
                      @clear="clearEdit(tIndex, row, column)"
                      @change="timePickerChange(tIndex, row, column)" />
      <kye-area-remote v-else-if="column.type == 'area'"
                       v-model="text"
                       :level="column.level ? column.level : 5"
                       @change="(data) => { areaRemoteChange(tIndex, row, column, data) }" />
    </div>
    <div class="tableContent tableContentText"
         v-else
         :class="column.click ? 'kye-label-click' : ''">
      <cell-render v-if="column.render && (typeof column.render === 'function')"
                   :index="tIndex"
                   :value="text"
                   :column="column"
                   :crender="column.render" />
      <kye-button @click="clickRow(tIndex, row, column.click)"
                  v-else-if="column.click"
                  type="text"
                  :auth="column.auth">
        {{getButtonText(column.buttonText, row, column.key)}}
      </kye-button>
      <tips @click="clickRow(tIndex, row, column.click)"
            v-else
            :width="column.width"
            :content="format(column, text)" />
    </div>
  </div>
</template>

<script>
import eSelect from './select'
import cellRender from './cell-render'
import searchTips from './search-tips'
import tips from './tips'
import { decrypt } from './../../utils'
export default {
  name: 'edit-content',
  components: {
    eSelect,
    cellRender,
    searchTips,
    tips
  },
  props: {
    column: {
      type: Object,
      default () {
        return {}
      }
    },
    row: {
      type: Object,
      default () {
        return {}
      }
    },
    tIndex: {
      type: Number,
      default () {
        return 0
      }
    },
    val: {
      type: [Number, String, Array, Object, Boolean],
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      text: '',
      arr: [],
      inputTimer: null
    }
  },
  methods: {
    // 格式化数据
    format (column, val) {
      let value = val
      if (column.filter && value) {
        if (column.filter.type && column.filter.args) {
          let func = this.$filter[column.filter.type]
          if (func) {
            value = func(value, ...column.filter.args)
          }
        } else {
          let func = this.$filter[column.filter]
          if (func) {
            value = func(value)
          }
        }
      }
      let type = Object.prototype.toString.call(value)
      if (type.indexOf('Null') > -1 || type.indexOf('Undefined') > -1) {
        value = ''
      }
      return value + ''
    },
    // 输入框改变事件
    inputChange (index, row, column) {
      clearInterval(this.inputTimer)
      let text = this.text
      if (typeof text === 'string') text = text.trim()
      this.$emit('inputChange', { index, column, text })
    },
    // 输入框失去焦点事件
    inputBlur (index, row, column) {
      column.blur && column.blur(index, row, this.text)
    },
    // checkbox改变事件
    checkboxChange (index, row, column) {
      column.change && column.change(index, column, this.text)
    },
    // datetimeChange 事件
    datetimeChange (index, row, column) {
      this.$emit('datetimeChange', { index, column, text: this.text })
      // column.change && column.change(index, row, this.text)
    },
    // 远程select获取选择
    selectRemote (prams) {
      this.$emit('selectChange', prams)
    },
    // 行点击事件
    clickRow (index, row, fn) {
      fn && fn(index, row)
    },
    inputEnter (index, row, col) {
      col.enter && col.enter(index, row, col)
    },
    // 选择行事件
    selectRow (row) {
      let obj = { ...row }
      let index = obj._tIndex
      this.$emit('selectRow', index, obj)
    },
    selectionRow (val) {
      let arr = val.map(item => ({ ...item }))
      arr.sort((old, fresh) => fresh._tIndex - old._tIndex)
      this.$emit('checkboxRow', arr)
    },
    rowClick (row, event, column) {
      if (this.showCheckbox) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },
    // 输入框点击的时候会阻止冒泡
    disablRowClick (e) {
      e.stopPropagation()
    },
    searchTipsSelect (val) {
      this.$emit('searchTipsSelect', val)
    },
    searchTipsClose (val) {
      this.$emit('searchTipsClose', val)
    },
    // time select change
    timeSelectChange (index, row, column) {
      this.$emit('inputChange', { index, column, text: this.text })
    },
    timePickerChange (index, row, column) {
      this.$emit('inputChange', { index, column, text: this.text })
    },
    clearEdit (index, row, column) {
      column.clear && column.clear(index, row, column)
    },
    clearSelectEdit (index, row, column, select) {
      this.$emit('clearSelectEdit', { index, row, column, select })
    },
    uploadSuccess (data, index, row, column) {
      column.change && column.change(index, row, data)
    },
    areaRemoteChange (index, row, column, data) {
      column.change && column.change(index, row, data)
    },
    getButtonText (buttonText, row, key) {
      let str = ''
      if (buttonText) {
        str = typeof buttonText === 'function' ? buttonText(row) : buttonText
      } else {
        str = row[key]
      }
      return str
    },
    setDisabled (col, row) {
      if (col.disabled && typeof col.disabled === 'function') {
        return col.disabled(row)
      }
      return !!col.disabled
    },
    async toDecrypt () {
      const { column, row, tIndex } = this
      const type = row.hasOwnProperty(`${column.key}Mask`) ? 'Mask' : 'Virtual'
      const res = await decrypt({
        dataId: row[column.bizIdKey],
        moduleCode: column.moduleCode,
        fieldName: column.fieldName,
        fieldContent: row[column.key + type]
      }, type.toLocaleLowerCase())
      this.text = res || ''
      this.$emit('decrypt', { index: tIndex, column, text: this.text })
    },
    changText () {
      this.text = this.row[this.column.key]
    },
    toDownload () {
      !!this.text && window.erpOpen(this.text)
    },
    getBzid () {
      const { column, row } = this
      let id = row._uuid
      if (column.option && column.option.id) {
        id = typeof column.option.id === 'function' ? column.option.id(row) : id
      }
      return id
    }
  },
  mounted () {
    this.changText()
  },
  watch: {
    val () {
      this.changText()
    }
  }
}
</script>

<style lang="scss" scoped>
.toDownload {
  color: #cccccc;
  cursor: not-allowed;
}
</style>
