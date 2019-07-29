<template>
  <div class="nav-item">
    <el-submenu v-if="item.children && (isNest ? item.children.length > 0 : item.children.length > 1)"
                :index="resolvePath(item.path)">
      <template slot="title">
        <i class="icon iconfont"
           :class="item.meta.icon"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <nav-item v-for="(cell, key) in item.children"
                :key="key"
                :item="cell"
                :is-nest="true"
                :base-path="resolvePath(cell.path)"></nav-item>
    </el-submenu>
    <el-menu-item v-else
                  :index="isNest ? resolvePath(item.path, isNest) : resolvePath(item.children[0].path, isNest)">
      <i class="icon iconfont"
         :class="isNest ? item.meta.icon : item.children[0].meta.icon"></i>
      <span slot="title">{{isNest ? item.meta.title :item.children[0].meta.title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'nav-item',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean
    }
  },
  methods: {
    resolvePath (routePath, isNest) {
      if (isNest) {
        return path.resolve(this.basePath)
      }
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
