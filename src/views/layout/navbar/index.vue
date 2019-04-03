<template>
  <div class="nav-bar">
    <div class="left-nav"
         @mouseover="hoverNavbar"
         @mouseleave="leaveNavbar">
      <ul>
        <li v-for="(item, idx) in $store.getters.mainNav"
            class="item"
            :to="item.path"
            :key="idx">{{item.name}}</li>
      </ul>
      <div class="drop-menu" v-show="showDropMenu">
        <ul>
          <router-link tag="li"
                       to="/coding/index">代码首页</router-link>
          <router-link tag="li"
                       to="/coding/add">添加</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  mounted () {
    console.log(this.$store.router)
  },
  data () {
    return {
      showDropMenu: false
    }
  },
  methods: {
    hoverNavbar (e) {
      this.showDropMenu = true
      // console.log(e.target)
    },
    leaveNavbar () {
      this.showDropMenu = false
    }
  }
}
</script>

<style scoped lang="scss">
  .nav-bar {
    position: relative;
    width: 100%;
    height: 34px;
    background: #000000;
    padding: 0 20px;
    line-height: 34px;
    .left-nav {
      > ul {
        overflow: hidden;
      }
      .item {
        float: left;
        margin-right: 10px;
        font-size: 12px;
        cursor: pointer;
      }
    }
    .drop-menu {
      position: absolute;
      top: 34px;
      left: 0;
      width: 100%;
      height: 100px;
      background: #FDFDFD;
      color: #000;
      padding: 20px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, .3);
      z-index: 99;
      ul li {
        float: left;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
</style>
