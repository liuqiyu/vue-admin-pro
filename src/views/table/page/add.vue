<template>
  <smart-content-page>
    <smart-details-page v-loading="loading"
                        :options="options"
                        :tools="tools">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="60px"
               class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名"
                          prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称"
                          prop="nickname">
              <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄"
                          prop="age">
              <el-input v-model="ruleForm.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="性别"
                          prop="gender">
              <el-input v-model="ruleForm.gender"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址"
                          prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </smart-details-page>
  </smart-content-page>

</template>

<script>
export default {
  name: 'page-table-details',
  data () {
    return {
      options: {
        back: '/table/page'
      },
      status: 'details',
      loading: false,
      tools: [
        {
          label: '保存',
          icon: 'iconfont icon-querengou',
          func: () => {
            this.save()
          }
        }
      ],
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
  computed: {
    disabled () {
      return this.status === 'details'
    }
  },
  methods: {
    save () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$router.push({
            path: '/table/page/details/1'
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
