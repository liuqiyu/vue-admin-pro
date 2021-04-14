<template>
  <smart-content-page v-loading="loading">
    <smart-details-page :options="options"
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
            this.$refs.ruleForm.clearValidate()
            this.fatchData()
          }
        },
        {
          label: '保存',
          show: () => this.status === 'modify',
          icon: 'iconfont icon-querengou',
          func: () => {
            this.save()
          }
        },
        {
          label: '删除',
          icon: 'iconfont icon-shanchu',
          func: () => {
            this.delete()
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
  mounted () {
    this.fatchData()
  },
  methods: {
    confirm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('close')
          this.$message({
            message: `成功!`,
            type: 'success'
          })
        } else {
          return false
        }
      })
    },
    save () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            const res = await this.$http.post('/editTable', this.ruleForm)
            this.ruleForm = Object.assign({}, this.ruleForm, res.data)
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.status = 'details'
            this.loading = false
          } catch (e) {
            console.log(e)
          }
        } else {
          return false
        }
      })
    },
    delete () {
      this.$confirm('删除此数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$router.push({
          path: this.options.back
        })
      })
    },
    async fatchData () {
      try {
        this.loading = true
        const res = await this.$http.post('/getTableDetails')
        this.ruleForm = Object.assign({}, this.ruleForm, res.data)
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
