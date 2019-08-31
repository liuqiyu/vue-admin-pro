<template>
  <div v-loading="loading">
    <v-details-page :options="options"
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
              <el-input v-model="ruleForm.name"
                        :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称"
                          prop="nickname">
              <el-input v-model="ruleForm.nickname"
                        :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄"
                          prop="age">
              <el-input v-model="ruleForm.age"
                        :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="性别"
                          prop="gender">
              <el-input v-model="ruleForm.gender"
                        :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址"
                          prop="address">
              <el-input v-model="ruleForm.address"
                        :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </v-details-page>
  </div>
</template>

<script>
export default {
  name: 'details-table-details',
  data () {
    return {
      options: {
        back: '/table/details'
      },
      status: 'details',
      loading: false,
      tools: [
        {
          label: '编辑',
          show: () => this.status === 'details',
          icon: 'iconfont icon-bianji',
          func: () => {
            this.status = 'modify'
          }
        },
        {
          label: '取消',
          show: () => this.status === 'modify',
          icon: 'iconfont icon-quxiao',
          func: () => {
            this.status = 'details'
            this.cancel()
          }
        },
        {
          label: '保存',
          show: () => this.status === 'modify',
          icon: 'iconfont icon-querengou',
          func: () => {
            this.save()
          }
        }
      ],
      ruleForm: {
        name: '1',
        nickname: '2',
        age: '3',
        gender: '4',
        address: '5'
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
  mounted () {
    this.fatchData()
  },
  methods: {
    confirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('close')
          this.$message({
            message: `成功!`,
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
    },
    save () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.status = 'details'
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async fatchData () {
      try {
        this.loading = true
        const res = await this.$http.post('/getTableDetails')
        console.log(res)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
