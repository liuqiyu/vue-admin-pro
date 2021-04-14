<template>
  <div class="kye-edit-canvas-table"
       ref="boxWrap">
    <div class="edit-box"
         ref="box">
      <!-- 固定头部 -->
      <div class="fixedHeanderWrap"
           v-if="showFixedHeader">
        <div class="fixedHeanderContent"
             :style="{width: scrollContentWidth + 'px', transform: `translate3d(${-scroll.disx}px, 0px, 0px)`}">
          <div class="fixedColumn fl"
               :style="{width: leftWidth + 'px'}">
            <div class="leftCheckbox"
                 v-if="showCheckbox">
              <div class="leftCheckboxHeader">
                <el-checkbox :value="allCheckBox"
                             :indeterminate="selectSome"
                             @input="selectAll"></el-checkbox>
              </div>
            </div>
            <div class="leftIndex"
                 v-if="showIndex">
              <div class="leftIndeHeander">序号</div>
            </div>
          </div>
          <div class="fixedTableHeander fl">
            <div v-for="(col, index) in columnConfig"
                 :key="index"
                 :style="{width: (index === 0 ? col.width + 0.5 : col.width) + 'px'}">
              <p class="text">{{col.label}}</p>
              <i v-if="index < columnConfig.length - 1"
                 @mousedown="divHeaderDividLine($event, col)"></i>
            </div>
          </div>
          <div class="fixedRight fl"
               v-show="(+fixedRightWidth) > 0"
               :style="{width: (+fixedRightWidth) + 'px'}">
            <div class="rightHeader">操作</div>
          </div>
        </div>
      </div>
      <!-- 表主要内容 -->
      <div class="scrollContentWrap"
           ref="scrollContentWrap">
        <div class="scrollContent"
             ref="scrollContent">
          <!-- 左边index和chebox -->
          <div class="fixedColumn fl"
               :style="{width: leftWidth + 'px', minHeight: '32px'}">
            <!-- 当有左边固定列的时候不必要渲染左边固定的-->
            <div v-if="!showFixedLeft"
                 style="display: flex">
              <div class="leftCheckbox"
                   v-if="showCheckbox">
                <div class="leftCheckboxHeader">
                  <el-checkbox :value="allCheckBox"
                               :indeterminate="selectSome"
                               @input="selectAll"></el-checkbox>
                </div>
                <ul>
                  <li v-for="(item, index) in formatData"
                      :key="item._uuid || index">
                    <el-checkbox :value="item._checkbox"
                                 @input="handleCheckbox(index)"></el-checkbox>
                  </li>
                </ul>
              </div>
              <div class="leftIndex"
                   v-if="showIndex">
                <div class="leftIndeHeander">序号</div>
                <ul class="leftIndexNumber">
                  <li v-for="(item, index) in formatData"
                      :key="item._uuid || index"
                      v-text="index + 1" />
                </ul>
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <div class="canvas-box fl">
            <canvas ref="canvas"
                    width="100"
                    height="100"></canvas>
            <div class="edit-cell"
                 ref="editCell"
                 v-show="editType != ''">
              <!-- 输入框 -->
              <edit-input :value="inputOptions.val"
                          :column="inputOptions.col"
                          @change="inputChange"
                          ref="eInput"
                          v-show="editType === 'input'" />
              <!-- 数字输入框 -->
              <edit-input-number :value="inputOptions.val"
                                 :column="inputOptions.col"
                                 @change="inputNumberChange"
                                 ref="eInputNumber"
                                 v-show="editType === 'input-number'" />
              <!-- 时间time-select -->
              <edit-time-select :value="inputOptions.val"
                                :column="inputOptions.col"
                                @change="timeSelectChange"
                                ref="eTimeSelect"
                                v-show="editType === 'time-select'" />
              <!-- 时间time-picker -->
              <edit-time-picker :value="inputOptions.val"
                                :column="inputOptions.col"
                                @change="timePickerChange"
                                ref="eTimePicker"
                                v-show="editType === 'time-picker'" />
              <!-- 下拉选择select -->
              <edit-select :value="inputOptions.val"
                           :column="inputOptions.col"
                           :row="inputOptions.row"
                           @change="selectChange"
                           ref="eSelect"
                           v-show="editType === 'select'" />
              <!-- 日期选择data-picker -->
              <edit-date-picker :value="inputOptions.val"
                                :column="inputOptions.col"
                                @change="datePickerChange"
                                ref="eDatePicker"
                                v-show="editType === 'date-picker'" />
              <!-- 输入搜索框shear-tips -->
              <edit-search-tips :value="inputOptions.val"
                                :column="inputOptions.col"
                                :row="inputOptions.row"
                                @change="searchTipsChange"
                                ref="eSearchTips"
                                v-show="editType === 'search-tips'" />
              <!-- 输入搜索框shear-tips -->
              <edit-upload :value="inputOptions.val"
                           :column="inputOptions.col"
                           :row="inputOptions.row"
                           @change="uploadChange"
                           ref="eUpload"
                           v-show="false" />
            </div>
          </div>
          <!-- 右边固定操作列 -->
          <div class="fixedRight fl"
               :style="{width: (+fixedRightWidth) + 'px'}">
            <div v-if="(+fixedRightWidth) > 0 && !showFixedRight">
              <div class="rightHeader">操作</div>
              <ul class="rightOparations">
                <li v-for="(item, index) in formatData"
                    :key="item._uuid || index">
                  <slot name="handle"
                        :row="data[index]"
                        :index="index"
                        :fromatRow="item"></slot>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="nodeData"
             v-if="formatData.length === 0">暂无数据</div>
      </div>
      <!-- 固定左边 -->
      <div class="fixedLeft"
           v-show="showFixedLeft"
           :class="scroll.disx > 0 ? 'scrollingLeft' : ''"
           :style="{height: contentHeight + 'px',width: leftWidth + 2 + 'px'}">
        <div v-if="showFixedLeft">
          <div class="fixedColumn fixedTop"
               :style="{width: leftWidth + 'px'}">
            <div class="leftCheckbox"
                 v-if="showCheckbox">
              <div class="leftCheckboxHeader">
                <el-checkbox :value="allCheckBox"
                             :indeterminate="selectSome"
                             @input="selectAll"></el-checkbox>
              </div>
            </div>
            <div class="leftIndex"
                 v-if="showIndex">
              <div class="leftIndeHeander">序号</div>
            </div>
          </div>
          <div class="fixedColumn"
               :style="{width: leftWidth + 'px', transform: `translate3d(0, ${-scroll.disy}px, 0)`}">
            <div class="leftCheckbox"
                 v-if="showCheckbox">
              <div class="leftCheckboxHeader">
                <el-checkbox :value="allCheckBox"
                             :indeterminate="selectSome"
                             @input="selectAll"></el-checkbox>
              </div>
              <ul>
                <li v-for="(item, index) in formatData"
                    :key="item._uuid || index">
                  <el-checkbox :value="item._checkbox"
                               @input="handleCheckbox(index)"></el-checkbox>
                </li>
              </ul>
            </div>
            <div class="leftIndex"
                 v-if="showIndex">
              <div class="leftIndeHeander">序号</div>
              <ul class="leftIndexNumber">
                <li v-for="(item, index) in formatData"
                    :key="item._uuid || index"
                    v-text="index + 1" />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 固定右边 -->
      <div class="fixedRightbox"
           v-show="showFixedRight"
           :class="scroll.disx > 0 ? 'scrollingRight' : ''"
           :style="{height: contentHeight + 'px', width: (+fixedRightWidth) + 'px'}">
        <div v-if="showFixedRight">
          <div class="fixedRightHeader">
            <div class="fixedRight">
              <div class="rightHeader">操作</div>
            </div>
          </div>
          <div class="fixedRight"
               :style="{transform: `translate3d(0, ${-scroll.disy}px, 0)`}">
            <div class="rightHeader">操作</div>
            <ul class="rightOparations">
              <li v-for="(item, index) in formatData"
                  :key="item._uuid || index">
                <slot name="handle"
                      :row="data[index]"
                      :index="index"
                      :fromatRow="item"></slot>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 水平滚动条 -->
      <div class="hScroll"
           v-show="showHScrollbar">
        <div class="hScrollBar"
             ref="hScrollbar"></div>
      </div>
      <!-- 锤值滚动条 -->
      <div class="vScroll"
           v-show="showVScrollbar">
        <div class="vScrollBar"
             ref="vScrollbar"></div>
      </div>
      <div class="dividLine"
           ref="dividLine"
           v-show="mouseConfig.showDivide"></div>
    </div>
    <tool-tip ref="tooltips"
              :dialog="dialog" />
    <div v-if="pages">
      <el-pagination style="margin-top:16px"
                     background
                     @size-change="pageSizeChange"
                     @current-change="pageCurrentChange"
                     :page-size="pages.size"
                     :total="pages.total"
                     :current-page="currentPage"
                     :page-sizes="$pagination.pageSizes"
                     :layout="$pagination.layout">
      </el-pagination>
    </div>
    <canvas ref="textCanvas"
            width="0"
            height="0"
            style="display:none;"></canvas>
  </div>
</template>

<script>
import { createUuid, textOverflow } from './utils'
import Schema from 'async-validator'
// import { differenceWith, isEqual } from 'lodash'
import mixin from './mixin'
import editInput from './edit/input'
import editInputNumber from './edit/input-number'
import editTimeSelect from './edit/time-select'
import editTimePicker from './edit/time-picker'
import editSelect from './edit/select'
import editDatePicker from './edit/date-picker'
import editSearchTips from './edit/search-tips'
import editUpload from './edit/upload'
import toolTip from './edit/tooltip'
export default {
  name: 'kye-edit-canvas-table',
  mixins: mixin,
  components: {
    editInput,
    editInputNumber,
    editTimeSelect,
    editTimePicker,
    editSelect,
    editDatePicker,
    editSearchTips,
    editUpload,
    toolTip
  },
  props: {
    status: {
      type: String,
      default: 'add'
    },
    column: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    pages: Object,
    showIndex: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [Number, String]
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    fixedRightWidth: {
      type: [Number, String],
      default () {
        return 0
      }
    },
    fixedLeft: Boolean,
    fixedRight: Boolean,
    dialog: Boolean
  },
  data () {
    return {
      currentPage: 1,
      originData: [],
      columnConfig: [],
      boxPosition: {
        left: 0,
        top: 0
      },
      editType: '',
      inputOptions: {
        val: '',
        col: {},
        row: {}
      },
      formatData: [],
      allCheckBox: false
    }
  },
  computed: {
    tableMaxHeight () {
      return +this.maxHeight
    },
    leftWidth () {
      let w = 0
      if (this.showIndex) {
        w += 50
      }
      if (this.showCheckbox) {
        w += 50
      }
      return w
    },
    selectSome () {
      if (this.formatData.length === 0) {
        return false
      }
      let no = false
      let yes = false
      let isFinde = false
      // 判断如果有选中和不选中的都为显示扛
      for (let item of this.formatData) {
        if (!item._checkbox) {
          no = true
        } else if (item._checkbox) {
          yes = true
        }
        if (no && yes) {
          isFinde = true
          break
        }
      }
      return isFinde
    },
    showFixedHeader () {
      return this.maxHeight && this.showVScrollbar
    },
    showFixedLeft () {
      return this.fixedLeft && this.showHScrollbar
    },
    showFixedRight () {
      return this.fixedRight && this.showHScrollbar && this.fixedRightWidth > 0
    }
  },
  methods: {
    // 页码改变
    pageSizeChange (size) {
      this.$emit('pageSize', size)
    },
    // 页码改变
    pageCurrentChange (page) {
      this.$emit('pageChange', page)
    },
    handleCheckbox (index) {
      this.formatData[index]._checkbox = !this.formatData[index]._checkbox
      this.selectionRow()
    },
    selectAll () {
      if (this.selectSome) {
        this.allCheckBox = true
      } else {
        this.allCheckBox = !this.allCheckBox
      }
      this.formatData.forEach(item => {
        item._checkbox = this.allCheckBox
      })
      this.selectionRow()
    },
    inputChangeEvent (val) {
      const { editingRow, editingCol, formatData } = this
      const index = editingRow._index
      editingCol.change && editingCol.change(index, formatData[index], val)
    },
    timeChangeEvent (val) {
      const { editingRow, editingCol, formatData } = this
      const index = editingRow._index
      editingCol.change && editingCol.change(index, formatData[index], val)
    },
    // 输入框失去焦点
    inputChange (str, isChange) {
      this.toChangeValue(str, isChange)
      this.inputChangeEvent(str)
    },
    // 数字输入框失去焦点
    inputNumberChange (str, isChange) {
      str = str ? +str : ''
      this.toChangeValue(str, isChange)
      this.inputChangeEvent(str)
    },
    // 时间选择框选择事件
    timeSelectChange (str, isChange) {
      this.toChangeValue(str, isChange)
      this.timeChangeEvent(str)
    },
    // 时间弹出框选择事件
    timePickerChange (str, isChange) {
      this.toChangeValue(str, isChange)
      this.timeChangeEvent(str)
    },
    selectChange ({ val, label, data }, isChange) {
      this.toChangeValue(label, isChange, false)
      const { editingRow, editingCol, originData } = this
      const index = editingRow._index
      const key = editingCol.key
      originData[index][key] = val
      editingCol.change && editingCol.change(index, originData[index], data, val)
    },
    datePickerChange (str, isChange) {
      this.toChangeValue(str, isChange)
      this.timeChangeEvent(str)
    },
    // search-tip
    searchTipsChange ({ str, data }, isChange) {
      this.toChangeValue(str, isChange)
      const { editingRow, editingCol, formatData } = this
      const index = editingRow._index
      editingCol.change && editingCol.change(index, formatData[index], data, editingCol, str)
    },
    uploadChange ({ index, data }) {
      const { col, row } = this.inputOptions
      col.change && col.change(index, row, data)
    },
    async toChangeValue (str, isChange, origin = true) {
      const { editingRow, editingCol, formatData, originData } = this
      const index = editingRow._index
      const key = editingCol.key
      this.editType = ''
      if (origin) {
        originData[index][key] = str
      }
      if (isChange) {
        formatData[index][key] = str
        this.paint()
      }
    },
    async validator (index) {
      if (typeof index === 'number') {
        await this.toValidator(this.formatData[index])
      } else {
        for (let item of this.formatData) {
          const res = await this.toValidator(item)
          if (!res) break
        }
      }
    },
    toValidator (data) {
      return new Promise((resolve, reject) => {
        this.rules.validate(data, (errors, fields) => {
          if (errors) {
            const key = Object.keys(fields)[0] || ''
            const col = this.columnConfig.find(col => col.key === key)
            let label = col ? col.label : ''
            this.$message.error(`${label}-第${data._index + 1}行：${errors[0].message}`)
            resolve(0)
          } else {
            resolve(1)
          }
        })
      })
    },
    getRulesConfig () {
      const obj = {}
      this.columnConfig.forEach(col => {
        if (col.rule && col.key) {
          obj[col.key] = col.rule
        }
      })
      this.rules = new Schema(obj)
    },
    addRow (row) {
      let { columnConfig, format, headerHeight, rowH, textCtx } = this
      let index = this.formatData.length
      let obj = { ...row }
      let vo = {}
      columnConfig.forEach(col => {
        const key = col.key
        obj[key] = format(col, obj[key], index, obj)
        if (col.type === 'checkbox') {
          let b = false
          if (col.checked && typeof col.checked === 'function') {
            b = col.checked(obj)
          }
          obj[`_checkbox-${key}`] = b
        }
        const { over } = textOverflow(textCtx, obj[key], col.width)
        vo[key] = over
      })
      obj._uuid = createUuid()
      obj._checkbox = false
      obj._index = index
      obj.y = index * rowH + headerHeight
      this.formatData.push(obj)
      this.overData.push(vo)
      this.setCanvas()
      this.paint()
      this.initScroll()
    },
    delRow (index) {
      let { headerHeight, rowH, scrollContent, scroll } = this
      this.formatData.splice(index, 1)
      this.formatData.forEach((item, i) => {
        item._index = i
        item.y = i * rowH + headerHeight
      })
      scroll.disy -= rowH
      scroll.disy = scroll.disy <= 0 ? 0 : scroll.disy
      scrollContent.style.transform = `translate3d(${-scroll.disx}px, ${-scroll.disy}px, 0)`
      this.setCanvas()
      this.initScroll()
      this.paint()
    },
    // 选择行事件
    selectRow (row) {
      this.$emit('selectRow', row._index, { ...row })
    },
    selectionRow () {
      const indexArr = this.formatData.filter(item => item._checkbox).reduce((res, item) => {
        res.push(item._index)
        return res
      }, [])
      let arr = this.originData.filter((item, i) => indexArr.includes(i))
      this.$emit('checkboxRow', arr)
    },
    getData () {
      return this.formatData
    }
  },
  mounted () {
    this.rules = {}
    this.columnConfig = [...this.column]
    this.$nextTick(() => {
      this.initDom()
      this.initCanvas()
      this.toCatch()
      this.setCanvas()
      this.paint()
      this.initScroll()
      this.canvasEvents()
    })
    this.getRulesConfig()
  },
  watch: {
    data () {
      this.toCatch()
      this.setCanvas()
      this.paint()
      this.initScroll()
    },
    column: {
      handler (val) {
        this.columnConfig = val
        this.getRulesConfig()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import "./css/index.scss";
</style>
