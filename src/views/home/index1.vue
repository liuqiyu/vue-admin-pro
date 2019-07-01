<template>
  <div id="mynetwork">
    <div class="map-tooltip">
      <header class="title">中国移动数据中心</header>
      <p class="address">广东省什么路</p>
      <div class="table-style">
        <div class="tr">
          <div class="td label1">楼层总数</div>
          <div class="td value">6</div>
        </div>
        <div class="tr">
          <div class="td label1">机楼类型</div>
          <div class="td value">6</div>
        </div>
        <div class="tr">
          <div class="td label1">产权属性</div>
          <div class="td value">6</div>
        </div>
        <div class="tr">
          <div class="td label1">变电站一</div>
          <div class="td value">6</div>
        </div>
        <div class="tr">
          <div class="td label1">变电站二</div>
          <div class="td value">6</div>
        </div>
        <div class="tr">
          <div class="td label1">市电容量</div>
          <div class="td value">6</div>
        </div>
        <div class="tr">
          <div class="td label1">动力机房数量</div>
          <div class="td value">6</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    click () {
      this.$router.push({
        path: '/a/index',
        query: {
          a: 1
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
#mynetwork {
  font-size: 0.14rem;
}
.map-tooltip {
  width: 300px;
  position: relative;
  padding: 10px 15px 5px 25px;
  background:rgba(9,8,76,1);
  color: #fff;
  >.title {
    color: #FFE566;
    font-size: 18px;
  }
  .address {
    font-size: 14px;
    margin-top: 8px;
  }
  .table-style {
    margin-top: 16px;
    width: 100%;
    .tr {
      height: 34px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 12px;
      &:nth-child(odd) {
        background: #141868;
      }
      .value {
        flex: 1;
      }
      .label1 {
        width: 80px;
        flex: none;
        text-overflow: ellipsis;
        white-space:nowrap;
        overflow:hidden;
      }
    }
  }
}
</style>
