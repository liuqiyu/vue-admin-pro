<template>
  <div class="nav-item">
    <el-submenu v-if="item.children && item.children.length > 1"
                :index="item.title">
      <template slot="title">
        <i class="icon iconfont"
           :class="item.icon"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item v-for="(cell, key) in item.children"
                    :index="cell.path"
                    :key="key">{{cell.title}}</el-menu-item>
    </el-submenu>
    <el-menu-item v-else
                  :index="resolvePath(item.children[0].path)">
      <i class="icon iconfont"
         :class="item.children[0].meta.icon"></i>
      <span slot="title">{{item.children[0].meta.title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
import path from 'path'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 10px;
}
</style>
