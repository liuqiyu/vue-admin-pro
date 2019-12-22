<template>
<<<<<<< HEAD
  <yus-content-page>
    {{a}}
    <yus-button type="primary"
                @click="submit">按钮</yus-button>
  </yus-content-page>
=======
  <div style="width: 70%"
       ref="pie"
       class="right-chart"></div>
>>>>>>> feat: add from create
</template>

<script>
import echarts from 'echarts';

export default {
<<<<<<< HEAD
  name: 'echarts',
  data () {
    return {
      a: 1
    }
  },
  mounted () {
  },
  methods: {
    submit () {
      // this.a += 1
      this.$http.post('/api/editor/add', { a: this.a })
    }
  }
}
=======
  name: 'charts-level-report',
  data () {
    return {
      chart: null
    };
  },
  mounted () {
    this.setCharts();
  },
  beforeDestroy () {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //
    setCharts () {
      var options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['CPU', '内存']
        },
        xAxis: [
          {
            type: 'category',
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#7FC6EC'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#528BB2'
              }
            },
            data: [
              'IT公司',
              '网络部',
              '信安中心',
              '中移互联网公司',
              '在线服务公司',
              '政企分公司',
              '杭州研发中心',
              '计划部',
              '采购共享中心',
              '设计院',
              '计划部',
              '咪咕公司',
              '中移铁通',
              '广东移动',
              '法律事务部'
            ],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'CPU',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              color: '#7FC6EC',
              formatter: '{value} %'
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#528BB2'
              }
            }
          },
          {
            type: 'value',
            name: '内存',
            min: 0,
            max: 100,
            interval: 10,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#7FC6EC',
              formatter: '{value} %'
            },
            axisLine: {
              lineStyle: {
                color: '#528BB2'
              }
            }
          }
        ],
        series: [
          {
            name: 'CPU',
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#00DCFF'
                  },
                  {
                    offset: 1,
                    color: '#009CFF'
                  }
                ]),
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            label: {
              normal: {
                show: true,
                color: '#FFFFFF',
                position: ['0', '-15']
              }
            },
            data: [
              33.56,
              10.87,
              44.43,
              26.13,
              31.39,
              18.71,
              12.22,
              23.64,
              13.39,
              16.12,
              12.83,
              39.02,
              11.51,
              25.72,
              31.24
            ]
          },
          {
            name: '内存',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#FBD01D'
              }
            },
            label: {
              normal: {
                show: true,
                color: '#FBD01D',
                position: ['0', '-15']
              }
            },
            data: [
              20.03,
              6.7,
              20.81,
              29.61,
              24.32,
              14.79,
              15.92,
              19.74,
              21.57,
              20.21,
              29.54,
              26.36,
              19.88,
              26.8,
              22.52
            ]
          }
        ]
      };
      this.chart = echarts.init(this.$refs.pie);
      this.chart.setOption(options);
    }
  }
};
>>>>>>> feat: add from create
</script>

<style scoped>
</style>
