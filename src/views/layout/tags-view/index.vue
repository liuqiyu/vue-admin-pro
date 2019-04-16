<template>
  <div class="tags-view-wrapper">
    <router-link v-for="tag in visitedViews"
                 ref="tag"
                 :key="tag.path"
                 :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                 tag="span"
                 class="tags-view-item"
                 @click.middle.native="closeSelectedTag(tag)"
                 @contextmenu.prevent.native="openMenu(tag, $event)">
      {{tag.meta.title}}
    </router-link>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tags-view',
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
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
  watch: {
    $route () {
      this.addTags()
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
    addTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
      return false
    },
    closeSelectedTag (view) {
      console.log(view)
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    openMenu (tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeAllTags (view) {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews)
      })
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
  .tags-view-wrapper {
    flex: none;
    height: 35px;
    width: 100%;
    border-bottom: 1px solid #e1e1e1;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
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
