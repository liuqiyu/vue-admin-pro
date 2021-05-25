<template>
  <div class="query-form">
    <el-form :model="model"
             :inline="true"
             :size="forms.options.size || 'mini'"
             ref="validateForm"
             :label-position="forms.options.labelPosition || 'right'"
             :label-width="forms.options.labelWidth || '70px'">
      <el-row>
        <el-col v-for="(item, index) in forms.formFields"
                :xs="item.lg || 6"
                :sm="item.lg || 6"
                :lg="item.lg || 6"
                :xl="item.xl || 4"
                :key="index">
          <form-item :item="item"
                     :model="model"
                     v-model="model[item.field]"
                     :key="index"></form-item>
        </el-col>
        <el-col :span="4"
                class="lineFeed">
          <div class="query-form-btns">
            <el-button class='submit'
                       type="primary"
                       icon="el-icon-search"
                       @click="handleSubmit">查询</el-button>
            <el-button type="primary"
                       plain
                       icon="el-icon-refresh-right"
                       @click="onReset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import formItem from './form-item'
export default {
  name: 'smart-query-form',
  props: {
    forms: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      model: {},
      lineFeed: false // 换行
    }
  },
  mounted () {
    this.initForm()
    this.__resizeHandler = () => {

    }
    window.addEventListener('resize', this.__resizeHandler)
  },
  components: {
    formItem
  },
  methods: {
    // 初始化
    initForm () {
      this.forms.formFields.forEach((item, index) => {
        // 初始化数据
        this.$set(this.model, item.field, !item.defaultValue && item.defaultValue !== 0 ? undefined : item.defaultValue)

        // 初始化特例组件宽度
        if ((item.type === 'timePicker' && item.props['is-range']) || (item.type === 'datePicker' && item.props.type === 'datetimerange')) {
          this.$set(this.forms.formFields[index], 'lg', 12)
          this.$set(this.forms.formFields[index], 'xl', 8)
        }
      })
    },
    // 查询
    handleSubmit () {
      this.$refs['validateForm'].validate((valid, object) => {
        if (valid) {
          console.log(this.model)
          this.$emit('formSubmit', this.model)
          if (this.forms.options.submitFunc && typeof this.forms.options.submitFunc === 'function') {
            this.forms.options.submitFunc(this.model)
          }
        } else {
          if (Object.keys(object).length > 0) {
            if (object[Object.keys(object)[0]] && object[Object.keys(object)[0]].length > 0) {
              let message = object[Object.keys(object)[0]][0].message
              this.$message.error(message)
            }
          }
          return false
        }
      })
    },
    // 重置
    onReset () {
      // 初始化数据
      this.forms.formFields.forEach((item, index) => {
        this.$set(this.model, item.field, item.defaultValue)
      })
      this.$emit('formSubmit', this.model)
      if (this.forms.options.resetFunc && typeof this.forms.options.resetFunc === 'function') {
        this.forms.options.resetFunc(this.model)
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.__resizeHandler)
  }
}
</script>

<style scoped lang="scss">
@import "~@/style/variable";
.query-form {
  background: #ffffff;
  border: 1px solid $borderColor;
  padding: 10px 10px 0 10px;
  .query-form-btns {
    margin-left: 5px;
    margin-bottom: 5px;
    text-align: right;
    ::v-deep .el-button {
      height: 28px;
      .iconfont {
        display: inline-block;
        height: 12px !important;
        font-size: 12px !important;
        margin-right: 2px;
      }
    }
    .reset {
      color: $theme;
      border-color: $theme;
    }
  }
  .lineFeed {
    float: right;
    text-align: right;
  }
}
</style>
