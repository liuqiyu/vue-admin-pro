<template>
  <div class="tags-view-wrapper">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link v-for="tag in visitedViews"
                   ref="tag"
                   :key="tag.path"
                   :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                   tag="span"
                   class="tags-view-item"
                   :class="isActive(tag)?'active':''"
                   @click.middle.native="closeSelectedTag(tag)"
                   @contextmenu.prevent.native="openMenu(tag, $event)">
        {{tag.meta.title}}
        <span v-if="!tag.meta.affix"
              class="close el-icon-close"
              @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible"
        :style="{left:left+'px',top:top+'px'}"
        class="contextmenu">
<!--      <li @click="refreshSelectedTag(selectedTag)">刷新</li>-->
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
export default {
  name: 'tags-view',
  components: {
    ScrollPane
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    routes () {
      return this.$store.state.router.routes
    }
  },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  mounted () {
    this.initTags()
    this.addTags()
  },
  watch: {
    $route () {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path
    },
    initTags () {
      const affixTags = this.filterAffixTags(this.routes)
      affixTags.forEach((item) => {
        this.$store.dispatch('addView', item)
      })
    },
    filterAffixTags (routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = `${basePath}/${route.path}`
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    addTags () {
      console.log(this.$route)
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
      return false
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag (view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: fullPath
          })
        })
      })
    },
    async closeSelectedTag (view) {
      const { visitedViews } = await this.$store.dispatch('delView', view)
      if (this.isActive(view)) {
        this.toLastView(visitedViews)
      }
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags (view) {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews)
      })
    },
    toLastView (visitedViews) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // You can set another route
        this.$router.push('/')
      }
    },
    openMenu (tag, e) {
      const menuMinWidth = 200
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY - 60
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
  .tags-view-wrapper {
    position: relative;
    flex: none;
    height: 36px;
    width: 100%;
    border-bottom: 1px solid #e1e1e1;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 28px;
      line-height: 27px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 12px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      .close {
        color: rgba(0, 0, 0, 0.3);
        font-size: 13px;
        &:hover {
          color: #45B8FB;
        }
      }
      &.active {
        border-color: #45B8FB;
        color: #000;
        position: relative;
        &:before {
          content: '';
          background: #45B8FB;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>
