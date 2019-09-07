<template>
  <div class="query-form">
    <el-form :model="model"
             :inline="true"
             size="mini"
             label-position="right"
             label-width="70px">
      <el-row :gutter="10">
        <el-col v-for="(item, index) in formFields"
                :xs="item.lg || 6"
                :sm="item.lg || 6"
                :lg="item.lg || 6"
                :xl="item.xl || 4"
                :key="index">
          <form-item v-if="!!item.show || false"
                     :item="item"
                     v-model="model[item.columnName]"
                     :key="index"></form-item>
        </el-col>
        <el-col :span="4"
                :class="{lineFeed: lineFeed}">
          <div class="query-form-btns">
            <el-button type="primary"
                       icon="iconfont icon-sousuo"
                       @click="onSubmit">
              查询
            </el-button>
            <el-button type="text"
                       icon="iconfont icon-zhongzhi"
                       @click="onReset">重置</el-button>
            <el-button v-if="needControl || false"
                       type="text"
                       @click="onControl">
              {{status ? '展开' : '收起'}}
              <i class=" el-icon--right"
                 :class="!status ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import formItem from './form-item'
export default {
  name: 'query-form',
  props: {
    formFields: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      model: {},
      lineFeed: false,
      needControl: false,
      status: 'close'
    }
  },
  created () {
    this.initForm()
  },
  components: {
    formItem
  },
  methods: {
    initForm () {
      this.formFields.forEach((item, index) => {
        this.$set(this.model, item.columnName, item.defaultValue || null)

        switch (item.type) {
          case 'daterange':
            this.$set(this.formFields[index], 'lg', 8)
            this.$set(this.formFields[index], 'xl', 6)
            break
          case 'datetimerange':
            this.$set(this.formFields[index], 'lg', 8)
            this.$set(this.formFields[index], 'xl', 6)
            break
          default:
            this.$set(this.formFields[index], 'lg', 6)
            this.$set(this.formFields[index], 'xl', 4)
            break
        }
      })
      this.formItemControl()
    },
    onSubmit () {
      console.log('submit!')
      console.log(this.model)
      this.$emit('formSubmit', this.model)
    },
    onReset () {
      console.log('reset!')
      console.log(this.model)
    },
    onControl () {
      this.status = !this.status
      this.formItemControl()
    },
    formItemControl () {
      if (!this.status) {
        this.formFields.forEach((item, index) => {
          this.$set(this.formFields[index], 'show', true)
        })
        return false
      }
      let total = 0
      this.formFields.forEach((item, index) => {
        if (document.body.clientWidth >= 1920) {
          total += item.xl
        } else {
          total += item.lg
        }

        if (total > 24) {
          this.needControl = true
          this.status = 'close'
          this.$set(this.formFields[index], 'show', false)
        } else {
          this.needControl = false
          this.status = 'close'
          this.$set(this.formFields[index], 'show', true)
        }
      })

      // 换行
      if (total + 4 > 24) {
        this.lineFeed = true
      } else {
        this.lineFeed = false
      }
    },
    createModel () {
      // const total = 0
      this.formFields.forEach((item) => {
        this.$set(this.model, item.columnName, item.defaultValue || null)
        // if (item.type === 'daterange' || item.type === 'datetimerange' || (item.type === 'select' && item.multiple)) {
        //   this.$set(this.model, item.columnName, item.defaultValue || [])
        // } else {
        //   this.$set(this.model, item.columnName, item.defaultValue || '')
        // }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.query-form {
  background: #ffffff;
  border: 1px solid #dee8f8;
  padding: 10px 10px 0 10px;
  .query-form-btns {
    margin-left: 20px;
    margin-bottom: 5px;
    /deep/ .el-button {
      height: 28px;
      .iconfont {
        display: inline-block;
        height: 12px !important;
        font-size: 12px !important;
        margin-right: 2px;
      }
    }
  }
  .lineFeed {
    float: right;
    text-align: right;
  }
  .el-row {
    .el-col {
      // padding: 0 !important;
    }
  }
}
</style>
