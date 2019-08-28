<template>
  <div class="breadcrumb">
    <div class="icon iconfont icon-daohangzhankai-"
         :class="icon"
         @click="IS_COLLAPSE"></div>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item v-if="!item.meta.notLink"
                            :to="item.path"
                            :key=index>
          {{item.meta.title}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else
                            :key=index>
          {{item.meta.title}}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      levelList: []
    }
  },
  watch: {
    '$route' () {
      this.getBreadcrumb()
    }
  },
  methods: {
    ...mapMutations([
      'IS_COLLAPSE'
    ]),
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ]),
    icon () {
      return this.isCollapse ? 'icon-daohangzhankai-' : 'icon-daohangshouqi-'
    }
  },
  mounted () {
    this.getBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #000;
  .icon {
    margin-right: 15px;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
