<template>
  <div class="chart-session"
       ref="chart"></div>
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
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '5%',
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '会话数',
            type: 'bar',
            barWidth: '25%',
            data: [10, 52, 200, 334, 390, 450, 500, 523, 560, 590, 650, 770]
          }
        ]
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
</style>
