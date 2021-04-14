<template>
  <div class="login-container">
    <div class="login-content">
      <div class="content-box logo">
        <div class="img">
          <img src="~@/assets/images/login-logo.png"
               alt="">
        </div>
        <div class="title">通用型后台管理系统</div>
      </div>
      <div class="content-box form">
        <el-form ref="ruleForm"
                 :model="formData"
                 :rules="rules"
                 label-width="0"
                 size="mini">
          <el-form-item prop="username">
            <el-input prefix-icon="el-input__icon el-icon-s-custom"
                      placeholder="请输入用户名"
                      v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"
                      prefix-icon="el-input__icon el-icon-s-cooperation"
                      placeholder="请输入密码"
                      v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%"
                       type="primary"
                       @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('user/login', {
            username: this.formData.username,
            password: this.formData.password
          })
          this.$router.push({ path: this.redirect || '/' })
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
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  background: url(~@/assets/images/login-bg.png);
  background-size: 100% 100%;
  // 登录的中心盒子
  .login-content {
    position: absolute;
    border-radius: 5px;
    overflow: hidden;
    top: 50%;
    left: 50%;
    margin-top: -225px;
    margin-left: -400px;
    width: 800px;
    height: 450px;
    display: flex;
    .content-box {
      overflow: hidden;
      flex: 0 0 50%;
      width: fit-conten;
      &.logo {
        // opacity: 0.65;
        background: rgba(5, 21, 84, 0.65);
        padding-top: 90px;
        .img {
          margin: 0 auto;
          width: 340px;
          > img {
            width: 100%;
          }
        }
        .title {
          margin-top: 20px;
          text-align: center;
          font-size: 24px;
          color: #fff;
          font-family: "幼圆";
        }
      }
      &.form {
        background: #ffffff;
        padding: 160px 60px;
      }
    }
  }
}
</style>
