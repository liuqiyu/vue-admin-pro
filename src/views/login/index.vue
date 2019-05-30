<template>
  <div class="login-container">
    <el-form class="login-box"
             ref="ruleForm"
             label-width="0"
             :rules="rules"
             :model="formData">
      <div class="form-title">
        通用型后台管理系统
      </div>
      <el-form-item prop="username">
        <el-input v-model="formData.username"
                  placeholder="账号">
          <i slot="prefix"
             class="el-input__icon el-icon-s-custom"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password"
                  type="password"
                  placeholder="密码">
          <i slot="prefix"
             class="el-input__icon el-icon-s-cooperation"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button"
                   type="primary"
                   @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      redirect: '',
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route: {
      handler (route) {
        this.redirect = route.query.redirect || ''
      },
      immediate: true
    }
  },
  methods: {
    submitForm () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          this.$store.dispatch('login', {
            username: this.formData.username,
            password: this.formData.password
          }).then(res => {
            if (res.code === 200) {
              this.$router.push({ path: this.redirect || '/' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  // 外边框
  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: #2d3a4b;
    overflow: hidden;
    // 登录的中心盒子
    .login-box {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
      // 标题
      .form-title {
        text-align: center;
        font-size: 30px;
        color: #fff;
        padding: 20px 0 40px 0;
      }
      // 登录按钮
      .login-button {
        width: 100%;
      }
    }
  }
</style>
