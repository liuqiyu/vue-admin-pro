<template>
  <div class="query-form">
    <el-form :model="model"
             :inline="true"
             size="mini"
             label-position="right">
      <template v-for="(item, index) in formFields">
        <form-item :item="item" v-model="model[item.columnName]" :key="index"></form-item>
      </template>
      <el-form-item class="query-form-btns">
        <el-button type="primary" icon="iconfont icon-search" @click="onSubmit">
          查询</el-button>
        <el-button type="text" icon="iconfont icon-reset" @click="onSubmit">重置</el-button>
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
      // console.log('submit!');
      console.log(this.model)
    },
    createModel () {
      this.formFields.forEach((item) => {
        // if (item.type === 'daterange') {
        //   this.$set(this.model, item.columnName, []);
        // } else {
        //
        // }
        this.$set(this.model, item.columnName, '')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .query-form {
    margin-bottom: 6px;
    border-bottom: 1px solid #dcdae2;
  }
</style>
