<template>
  <div class="right-tools">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <div class="avatar">
          <img width="40"
               height="40"
               src="@/assets/images/main-bg.jpg"
               alt="">
        </div>
        <span class="name">
          刘岂宇
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modifyUserinfo">修改信息</el-dropdown-item>
        <el-dropdown-item divided
                          @click.native="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'right-tools',
  methods: {
    modifyUserinfo () {
      console.log('修改信息')
    },
    logout () {
      this.$store.dispatch('logout').then(res => {
        console.log('注销')
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$router.push({ path: '/login' })
        } else {
          this.$message.error('注销失败！')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.right-tools {
  display: flex;
  align-items: center;
  /deep/ .el-dropdown {
    .el-dropdown-link {
      /*display: block;*/
      height: 40px;
      display: flex;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #e1e1e1;
        overflow: hidden;
        margin-right: 10px;
      }
      .name {
        color: #f1f1f1;
      }
      > i {
        color: #f5f5f5;
      }
    }
  }
}
</style>
