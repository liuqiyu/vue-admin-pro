<template>
  <div class="content-container">
    <div ref="new">
      <div class="console-wrapper">
        <el-row :gutter="40">
          <el-col :span="6"
                  v-for="(item, index) in cardList"
                  :key="index">
            <div class="grid-content">
              <div class="iconfont"
                   :class="item.icon"
                   :style="{color: item.color}"></div>
              <div class="desc">
                <div class="label1">{{item.label}}</div>
                <div class="value">
                  <countTo :startVal='0'
                           :endVal='item.value'
                           :duration='3000'></countTo>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <user></user>
      <session></session>
      <session></session>
      <session></session>
    </div>

    <img :src="photoUrl"
         alt="">
  </div>
</template>

<script>
import Session from './session'
import User from './user'

export default {
  name: 'dashboard',
  data () {
    return {
      show: false,
      photoUrl: '',
      photoShow: false,
      cardList: [
        {
          label: '用户量',
          icon: 'icon-yonghu',
          value: 1843243,
          color: '#409EFF'
        },
        {
          label: '会话数',
          icon: 'icon-huihua-copy',
          value: 9232,
          color: '#67C23A'

        },
        {
          label: '鲜花数',
          icon: 'icon-shouye1',
          value: 1998,
          color: '#F56C6C'
        },
        {
          label: '点赞数',
          icon: 'icon-dianzan',
          value: 2999,
          color: '#E6A23C'
        }
      ]
    }
  },
  components: {
    Session,
    User
  },
  mounted () {
    var a = document.querySelector('.smart-content')
    a.addEventListener('scroll', () => {
      console.log(123)
      this.show = true
    })
  }
}
</script>

<style scoped lang="scss">
.content-container {
  padding: 30px !important;
  .console-wrapper {
    margin-bottom: 20px;
    .grid-content {
      width: 100%;
      height: 100px;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      .iconfont {
        font-size: 40px;
        font-weight: bolder;
        cursor: pointer;
        color: rgb(70, 118, 229);
      }
      .desc {
        .label1 {
          font-size: 16px;
          color: #999;
          padding: 5px 0;
        }
        .value {
          font-size: 24px;
          font-weight: bolder;
          padding: 5px 0;
          color: #666;
        }
      }
    }
  }
}
</style>
