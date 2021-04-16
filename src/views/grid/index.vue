<template>
  <div>
    <grid-layout :layout.sync="layout"
                 :col-num="12"
                 :row-height="10"
                 :is-draggable="true"
                 :is-resizable="true"
                 :is-mirrored="false"
                 :vertical-compact="true"
                 :margin="[20, 20]"
                 :use-css-transforms="true">

      <grid-item class="item"
                 v-for="item in layout"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i">
        {{item.i}}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
var testLayout = [
  { "x": 0, "y": 0, "w": 2, "h": 20, "i": "0" },
  { "x": 2, "y": 0, "w": 2, "h": 40, "i": "1" },
  { "x": 4, "y": 0, "w": 2, "h": 50, "i": "2" },
  { "x": 6, "y": 0, "w": 2, "h": 30, "i": "3" },
  { "x": 8, "y": 0, "w": 2, "h": 30, "i": "4" }
];
export default {
  name: 'admin',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data () {
    return {
      layout: testLayout
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  background: red;
}
</style>
