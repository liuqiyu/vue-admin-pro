<template>
  <div>
    <div class="yy-dialog-body">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="60px"
               class="demo-ruleForm">
        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称"
                      prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="年龄"
                      prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="gender">
          <el-input v-model="ruleForm.gender"></el-input>
        </el-form-item>
        <el-form-item label="地址"
                      prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="yy-dialog_footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary"
                 @click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-dialog',
  props: {
    dialogData: {
      type: Object
    }
  },
  data () {
    return {
      ruleForm: {
        name: '',
        nickname: '',
        age: '',
        gender: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    Object.assign(this.ruleForm, this.dialogData.data)
    console.log(this.ruleForm)
  },
  methods: {
    confirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('close')
          this.$message({
            message: `${this.dialogData.label}成功!`,
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
