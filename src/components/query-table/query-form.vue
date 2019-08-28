<template>
  <div class="query-form">
    <el-form :model="model"
             :inline="true"
             size="mini"
             label-position="right">
      <template v-for="(item, index) in formFields">
        <form-item :item="item"
                   v-model="model[item.columnName]"
                   :key="index"></form-item>
      </template>
      <el-form-item class="query-form-btns">
        <el-button type="primary"
                   icon="iconfont icon-sousuo"
                   @click="onSubmit">
          查询
        </el-button>
        <el-button type="text"
                   icon="iconfont icon-zhongzhi"
                   @click="onReset">重置</el-button>
      </el-form-item>
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
      model: {}
    }
  },
  created () {
    this.createModel()
    console.log(this.model)
  },
  components: {
    formItem
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      console.log(this.model)
      this.$emit('formSubmit', this.model)
    },
    onReset () {
      console.log('reset!')
      console.log(this.model)
    },
    createModel () {
      this.formFields.forEach((item) => {
        if (item.type === 'daterange') {
          this.$set(this.model, item.columnName, [])
        } else {
          this.$set(this.model, item.columnName, '')
        }
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
  /deep/ .el-form-item {
    margin-bottom: 15px;
    .el-form-item__content {
      width: 140px !important;
    }
  }
  .query-form-btns {
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
}
</style>
