<template>
  <div class="map-wrapper">
    <div ref="map"
         id="map"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/mixins/resize'
export default {
  name: 'echarts-line',
  mixins: [resize],
  mounted () {
    this.initCharts()
  },
  data () {
    return {
      chart: null
    }
  },
  methods: {
    initCharts () {
      this.chart = echarts.init(this.$refs.map)
      this.setOptions()
    },
    setOptions () {
      let fontColor = '#fff'
      this.chart.setOption({
        color: ['#bf19ff', '#854cff', '#5f45ff', '#02cdff', '#0090ff', '#f9e264', '#f47a75', '#009db2', '#0780cf', '#765005'],
        backgroundColor: '#0f375f',
        textStyle: {
          fontSize: 18
        },
        title: {
          text: '各级财政投入扶贫专项资金',
          left: 'left',
          textStyle: {
            color: fontColor,
            align: 'center'
          }
        },
        grid: {
          left: '20',
          right: '50',
          bottom: '50',
          top: '80',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333'
            }
          }
        },
        legend: {
          show: true,
          x: 'center',
          top: '20',
          textStyle: {
            color: fontColor
          },
          data: ['中央', '自治区', '盟市', '旗县区', '整合资金', '其他']
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: fontColor
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#397cbc'
            }
          },
          data: ['2016年', '2017年', '2018年', '2019年', '2020年']
        }],
        yAxis: [{
          type: 'value',
          name: '亿元',
          axisLine: {
            lineStyle: {
              color: fontColor
            }
          }
        }],
        series: [{
          name: '中央',
          type: 'line',
          stack: '总量',
          symbolSize: 8,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,44,90,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(0,146,246,0.9)'
                }])
              }
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 260, 280]
        },
        {
          name: '自治区',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,44,90,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(0,212,199,0.9)'
                }])
              }
            }
          },
          data: [220, 182, 191, 210, 230, 270, 270, 201, 154, 140, 240, 250]
        },
        {
          name: '盟市',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,44,90,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(114,144,89,0.9)'
                }])
              }
            }
          },
          data: [150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        },
        {
          name: '旗县区',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,46,101,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(0,166,246,0.9)'
                }])
              }
            }
          },
          data: [150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        },
        {
          name: '整合资金',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,44,90,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(0,212,199,0.9)'
                }])
              }
            }
          },
          data: [150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        },
        {
          name: '其他',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,44,90,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(0,212,199,0.9)'
                }])
              }
            }
          },
          data: [200, 232, 201, 200, 190, 190, 210, 190, 182, 201, 154, 190]
        }
        ]
      })
    }
  }
}
</script>

<style lang="scss">
.map-wrapper {
  background: #fff;
}
#map {
  width: 100%;
  height: 100%;
}
</style>