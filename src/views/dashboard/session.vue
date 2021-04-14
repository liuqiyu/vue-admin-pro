<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-14 17:14:57
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-19 11:39:36
 -->
<template>
  <el-card class="box-card console-wrapper">
    <div slot="header"
         class="clearfix">
      <span>会话数</span>
    </div>
    <div class="chart-wrapper">
      <div class="chart-session"
           ref="chart"></div>
    </div>
  </el-card>

</template>

<script>
import echarts from 'echarts'

export default {
  name: 'session',
  mounted () {
    this.initCharts()
  },
  data () {
    return {
      chart: null,
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
        },
        grid: {
          top: '5%',
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      }
    }
  },
  methods: {
    initCharts () {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.options)
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>

<style lang="scss" scoped>
.chart-session {
  width: 100%;
  height: 100%;
}
.chart-wrapper {
  width: 100%;
  padding: 20px;
  height: 250px;
  background: #fff;
}
</style>
