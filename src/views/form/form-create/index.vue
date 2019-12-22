<!--
 * @Author: liuqiyu
 * @Date: 2019-12-20 10:39:54
 * @LastEditTime : 2019-12-20 20:42:38
 * @LastEditors  : liuqiyu
 * @Description: In User Settings Edit
 * @FilePath: \pcc_front1\src\views\pcc\commodity\add\create\common\form-create\query-form.vue
 -->
<template>
  <div class="form-create">
    <el-form ref="validateForm" :model="model" size="mini" label-width="120px">
      <div
        v-for="(item, index) in formCreate.formList"
        :name="index"
        :key="index"
      >
        <el-row>
          <el-col
            v-for="(cell, key) in item.formFields"
            :key="key"
            :span="cell.span || 12"
          >
            <form-item
              v-show="cell.show === undefined ? true : cell.show"
              :item="cell"
              v-model="model[cell.columnName]"
            >
            </form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <toolList :tool-list="formCreate.toolList"></toolList>
  </div>
</template>

<script>
import formItem from './form-item';
import toolList from './tool-list';
export default {
  name: 'FormCreate',
  components: {
    formItem,
    toolList
  },
  props: {
    formCreate: {
      type: Object,
      default: () => {}
    },
    formList: {
      type: Array,
      default: () => []
    },
    toolList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      model: {}
    };
  },
  created () {
    this.$nextTick(() => {
      this.createModel();
      // console.log(this.formFields)
    });
  },
  methods: {
    onSubmit () {
      this.$refs['validateForm'].validate(valid => {
        if (valid) {
          console.log('submit!');
          this.$emit('formSubmit', this.model);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onReset () {
      this.createModel();
      this.$emit('reset');
    },
    getModel () {
      return this.model;
    },
    createModel () {
      const ARRAY_ITEM = ['datetimerange', 'daterange'];
      this.formList.forEach(cell => {
        cell.formFields.forEach(item => {
          if (item.show === undefined || item.show) {
            if (ARRAY_ITEM.indexOf(item.type) >= 0 || item.multiple) {
              this.$set(this.model, item.columnName, item.defaultValue || []);
            } else if (item.type === 'selectTree') {
              this.$set(
                this.model,
                item.columnName,
                item.defaultCheckedKeys || []
              );
              // console.log(item.defaultCheckedKeys)
            } else {
              this.$set(this.model, item.columnName, item.defaultValue || '');
            }
          }
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.form-create {
  .el-col {
    // border-bottom: 1px solid #d9d9d9;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
