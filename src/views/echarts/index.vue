<template>
    <div>
      <div ref="myEchart" id="chart"></div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'echarts',
  data () {
    const self = this
    return {
      chart: null,
      myData: [
        { name: '北京', value: '100' }, { name: '天津', value: '700' },
        { name: '上海', value: self.randomData }, { name: '重庆', value: self.randomData },
        { name: '河北', value: '200' }, { name: '河南', value: self.randomData },
        { name: '云南', value: self.randomData }, { name: '辽宁', value: self.randomData },
        { name: '黑龙江', value: self.randomData }, { name: '湖南', value: self.randomData },
        { name: '安徽', value: self.randomData }, { name: '山东', value: self.randomData },
        { name: '新疆', value: self.randomData }, { name: '江苏', value: self.randomData },
        { name: '浙江', value: self.randomData }, { name: '江西', value: self.randomData },
        { name: '湖北', value: self.randomData }, { name: '广西', value: self.randomData },
        { name: '甘肃', value: self.randomData }, { name: '山西', value: self.randomData },
        { name: '内蒙古', value: self.randomData }, { name: '陕西', value: self.randomData },
        { name: '吉林', value: self.randomData }, { name: '福建', value: self.randomData },
        { name: '贵州', value: self.randomData }, { name: '广东', value: self.randomData },
        { name: '青海', value: self.randomData }, { name: '西藏', value: self.randomData },
        { name: '四川', value: self.randomData }, { name: '宁夏', value: self.randomData },
        { name: '海南', value: self.randomData }, { name: '台湾', value: self.randomData },
        { name: '香港', value: self.randomData }, { name: '澳门', value: self.randomData }
      ]
    }
  },
  computed: {
    randomData () {
      return Math.round(Math.random() * 500)
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption({
        backgroundColor: '#FFFFFF',
        title: {
          text: '全国地图大数据',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: true,
          x: 'left',
          y: 'center',
          splitList: [
            { start: 500, end: 600 }, { start: 400, end: 500 },
            { start: 300, end: 400 }, { start: 200, end: 300 },
            { start: 100, end: 200 }, { start: 0, end: 100 }
          ],
          color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
        },
        series: [{
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: false
            }
          },
          data: this.myData
        }]
      })

      this.chart.on('click', (params) => {
        console.log(params)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  #chart {
    width: 1000px;
    height: 600px;
  }
</style>
