<template>
  <div class="right-bar">
    <div class="tools">
      <smart-theme-picker></smart-theme-picker>
      <span class="iconfont icon-quanping"
            @click="screenfull"></span>
    </div>
    <el-avatar class="avatar"
               :size="30">
      <img src="@/images/avatar.png" /></el-avatar>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <span class="name">
          {{username}}
        </span>
        <i class="el-icon-caret-bottom el-icon--right"></i>
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
import { mapState } from 'vuex'
import screenfull from 'screenfull'

export default {
  name: 'right-bar',
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username
    })
  },
  methods: {
    init () {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
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
          // this.$message.success('注销成功')
          location.reload()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        })
      })
    },

    // 切换全屏
    screenfull () {
      if (screenfull.enabled) {
        screenfull.toggle()
      }
    },

    // 变量
    change () {
      this.isFullscreen = screenfull.isFullscreen
    }
  },
  beforeDestroy () {
    if (screenfull.enabled) {
      screenfull.off('change', this.change)
    }
  }
}
</script>

<style scoped lang="scss">
.right-bar {
  display: flex;
  align-items: center;
  height: 100%;
  .tools {
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    > * {
      font-size: 22px;
      margin-right: 12px;
      color: #f1f1f1;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .avatar {
    margin-right: 12px;
  }
  ::v-deep .el-dropdown {
    cursor: pointer;
    .el-dropdown-link {
      /*display: block;*/
      height: 40px;
      display: flex;
      align-items: center;
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
