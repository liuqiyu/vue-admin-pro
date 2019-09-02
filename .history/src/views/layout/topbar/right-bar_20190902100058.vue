<template>
  <div class="right-bar">
    <el-dropdown trigger="click">
      <span class="el-icon-caret-bottom">
        <el-avatar class="avatar"
                   :size="30">
          <img src="@/images/avatar.png" /></el-avatar>
        <span class="name">
          刘岂宇
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modifyUserinfo">修改信息</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="logout">
      <span class="iconfont icon-zhuxiao"
            @click="logout"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'right-bar',
  data () {
    return {
    }
  },
  methods: {
    modifyUserinfo () {
      console.log('修改信息')
    },
    logout () {
      this.$confirm('确认注销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout').then(res => {
          console.log('注销')
          if (res.code === 200) {
            this.$message.success(res.message)
            this.$router.push({ path: '/login' })
          } else {
            this.$message.error('注销失败！')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.right-bar {
  display: flex;
  align-items: center;
  height: 100%;
  /deep/ .el-dropdown {
    .el-dropdown-link {
      /*display: block;*/
      height: 40px;
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 12px;
      }
      .name {
        color: #f1f1f1;
      }
      > i {
        color: #f5f5f5;
      }
    }
  }
  .logout {
    width: 68px;
    height: 100%;
    text-align: center;
    margin-left: 12px;
    line-height: 50px;
    cursor: pointer;
    background-image: linear-gradient(-169deg, #0b44c7 6%, #4a86f0 100%);
    span {
      font-size: 26px;
      color: #fff;
    }
  }
}
</style>
