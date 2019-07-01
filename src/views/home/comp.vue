<template>
  <div id="mynetwork">
    <span class="point"
          :style="{}"
          :class="[item.label, { actived: item.actived }]"
          v-for="(item, index) in lists"
          :key="index"
          @click="click(item, index)"></span>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      lists: [
        {
          label: 'top1',
          value: [0, 0]
        },
        {
          label: 'top2',
          value: [0.25, 0]
        },
        {
          label: 'top3',
          value: [0.5, 0]
        },
        {
          label: 'top4',
          value: [0.75, 0]
        },
        {
          label: 'top5',
          value: [1, 0]
        },
        {
          label: 'bottom1',
          value: [0, 1]
        },
        {
          label: 'bottom2',
          value: [0.25, 1]
        },
        {
          label: 'bottom3',
          value: [0.5, 1]
        },
        {
          label: 'bottom4',
          value: [0.75, 1]
        },
        {
          label: 'bottom5',
          value: [1, 1]
        },
        {
          label: 'left2',
          value: [0, 0.25]
        },
        {
          label: 'left3',
          value: [0, 0.5]
        },
        {
          label: 'left4',
          value: [0, 0.75]
        },
        {
          label: 'right2',
          value: [1, 0.25]
        },
        {
          label: 'right3',
          value: [1, 0.5]
        },
        {
          label: 'right4',
          value: [1, 0.75]
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.value.forEach(item => {
        console.log(item)
        this.lists.forEach((cell, index) => {
          console.log(JSON.stringify(item) === JSON.stringify(cell.value))
          if (JSON.stringify(item) === JSON.stringify(cell.value)) {
            this.$set(this.lists[index], 'actived', true)
          }
        })
      })
      console.log(this.lists)
    },
    click (item, index) {
      console.log(item)
      if (item.actived) {
        this.$set(this.lists[index], 'actived', false)
      } else {
        this.$set(this.lists[index], 'actived', true)
      }
      const arr = []
      this.lists.forEach(item => {
        if (item.actived) {
          arr.push(item.value)
        }
      })
      this.$emit('input', arr)
    }
  }
}
</script>

<style scoped lang="scss">
  #mynetwork {
    width: 100px;
    height: 100px;
    border: 1px solid #e1e1e1;
    position: relative;
    .point {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #e1e1e1;
      &.actived {
        background: red;
      }
      &.top1 {
        top: -6px;
        left: -6px;
      }
      &.top2 {
        top: -6px;
        left: 19px;
      }
      &.top3 {
        top: -6px;
        left: 44px;
      }
      &.top4 {
        top: -6px;
        left: 69px;
      }
      &.top5 {
        top: -6px;
        right: -6px;
      }
      &.bottom1 {
        bottom: -6px;
        left: -6px;
      }
      &.bottom2 {
        bottom: -6px;
        left: 19px;
      }
      &.bottom3 {
        bottom: -6px;
        left: 44px;
      }
      &.bottom4 {
        bottom: -6px;
        left: 69px;
      }
      &.bottom5 {
        bottom: -6px;
        right: -6px;
      }

      &.left2 {
        top: 19px;
        left: -6px;
      }
      &.left3 {
        top: 44px;
        left: -6px;
      }
      &.left4 {
        top: 69px;
        left: -6px;
      }

      &.right2 {
        top: 19px;
        right: -6px;
      }
      &.right3 {
        top: 44px;
        right: -6px;
      }
      &.right4 {
        top: 69px;
        right: -6px;
      }
    }
  }
</style>
