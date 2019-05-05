<template>
  <div class="echarts">
    <div class="main-chart"
         ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js'
import { CITY_GEO_COORD_MAP, CHINA_GEO_COORD_MAP } from './GEO_COORD_MAP'

export default {
  name: 'charts-country',
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    const china = require('./../../assets/map/json/china')
    this.initCharts(china, 'china')
  },
  methods: {
    /**
     * 加载地图
     * @param json
     * @param name
     */
    initCharts (mapData, mapName) {
      const data = [
        { name: '北京', value: 177 },
        { name: '新疆', value: 177 },
        { name: '云南', value: 177 },
        { name: '广西', value: 177 },
        { name: '西藏', value: 177 },
        { name: '青海', value: 177 },
        { name: '甘肃', value: 177 },
        { name: '四川', value: 177 },
        { name: '安徽', value: 177 },
        { name: '江西', value: 177 },
        { name: '湖北', value: 177 },
        { name: '湖南', value: 177 },
        { name: '辽宁', value: 177 },
        { name: '台湾', value: 177 }
      ]
      const dataCity = [
        {
          name: '海门',
          value: 9
        },
        {
          name: '鄂尔多斯',
          value: 12
        },
        {
          name: '招远',
          value: 12
        },
        {
          name: '舟山',
          value: 12
        },
        {
          name: '齐齐哈尔',
          value: 14
        },
        {
          name: '盐城',
          value: 15
        },
        {
          name: '赤峰',
          value: 16
        },
        {
          name: '青岛',
          value: 18
        },
        {
          name: '乳山',
          value: 18
        },
        {
          name: '金昌',
          value: 19
        },
        {
          name: '泉州',
          value: 21
        },
        {
          name: '莱西',
          value: 21
        },
        {
          name: '日照',
          value: 21
        },
        {
          name: '胶南',
          value: 22
        },
        {
          name: '南通',
          value: 23
        },
        {
          name: '拉萨',
          value: 24
        },
        {
          name: '云浮',
          value: 24
        },
        {
          name: '北海',
          value: 60
        },
        {
          name: '西安',
          value: 61
        },
        {
          name: '金坛',
          value: 62
        },
        {
          name: '东营',
          value: 62
        },
        {
          name: '牡丹江',
          value: 63
        },
        {
          name: '遵义',
          value: 63
        },
        {
          name: '绍兴',
          value: 63
        },
        {
          name: '扬州',
          value: 64
        },
        {
          name: '常州',
          value: 64
        },
        {
          name: '潍坊',
          value: 65
        },
        {
          name: '重庆',
          value: 66
        },
        {
          name: '台州',
          value: 67
        },
        {
          name: '南京',
          value: 67
        },
        {
          name: '滨州',
          value: 70
        },
        {
          name: '贵阳',
          value: 71
        },
        {
          name: '无锡',
          value: 71
        },
        {
          name: '本溪',
          value: 71
        },
        {
          name: '克拉玛依',
          value: 72
        },
        {
          name: '渭南',
          value: 72
        },
        {
          name: '马鞍山',
          value: 72
        },
        {
          name: '宝鸡',
          value: 72
        },
        {
          name: '焦作',
          value: 75
        },
        {
          name: '句容',
          value: 75
        },
        {
          name: '北京',
          value: 79
        },
        {
          name: '徐州',
          value: 79
        },
        {
          name: '衡水',
          value: 80
        },
        {
          name: '包头',
          value: 80
        },
        {
          name: '绵阳',
          value: 80
        },
        {
          name: '乌鲁木齐',
          value: 84
        },
        {
          name: '枣庄',
          value: 84
        },
        {
          name: '杭州',
          value: 84
        },
        {
          name: '淄博',
          value: 85
        },
        {
          name: '鞍山',
          value: 86
        },
        {
          name: '溧阳',
          value: 86
        },
        {
          name: '库尔勒',
          value: 86
        },
        {
          name: '安阳',
          value: 90
        },
        {
          name: '开封',
          value: 90
        },
        {
          name: '济南',
          value: 92
        },
        {
          name: '德阳',
          value: 93
        },
        {
          name: '温州',
          value: 95
        },
        {
          name: '九江',
          value: 96
        },
        {
          name: '邯郸',
          value: 98
        },
        {
          name: '临安',
          value: 99
        },
        {
          name: '兰州',
          value: 99
        },
        {
          name: '沧州',
          value: 100
        },
        {
          name: '临沂',
          value: 103
        },
        {
          name: '南充',
          value: 104
        },
        {
          name: '天津',
          value: 105
        },
        {
          name: '富阳',
          value: 106
        },
        {
          name: '泰安',
          value: 112
        },
        {
          name: '诸暨',
          value: 112
        },
        {
          name: '郑州',
          value: 113
        },
        {
          name: '哈尔滨',
          value: 114
        },
        {
          name: '聊城',
          value: 116
        },
        {
          name: '芜湖',
          value: 117
        },
        {
          name: '唐山',
          value: 119
        },
        {
          name: '平顶山',
          value: 119
        },
        {
          name: '邢台',
          value: 119
        },
        {
          name: '德州',
          value: 120
        },
        {
          name: '济宁',
          value: 120
        },
        {
          name: '荆州',
          value: 127
        },
        {
          name: '宜昌',
          value: 130
        },
        {
          name: '义乌',
          value: 132
        },
        {
          name: '丽水',
          value: 133
        },
        {
          name: '洛阳',
          value: 134
        },
        {
          name: '秦皇岛',
          value: 136
        },
        {
          name: '株洲',
          value: 143
        },
        {
          name: '石家庄',
          value: 147
        },
        {
          name: '莱芜',
          value: 148
        },
        {
          name: '常德',
          value: 152
        },
        {
          name: '保定',
          value: 153
        },
        {
          name: '湘潭',
          value: 154
        },
        {
          name: '金华',
          value: 157
        },
        {
          name: '岳阳',
          value: 169
        },
        {
          name: '长沙',
          value: 175
        },
        {
          name: '衢州',
          value: 177
        },
        {
          name: '廊坊',
          value: 193
        },
        {
          name: '菏泽',
          value: 194
        },
        {
          name: '合肥',
          value: 229
        },
        {
          name: '武汉',
          value: 273
        },
        {
          name: '大庆',
          value: 279
        }
      ]
      // 目的地
      var dataFrom = '北京市'
      const BJData = [
        [
          {
            name: '北京'
          },
          {
            name: '新疆',
            value: 95
          }
        ],
        [
          {
            name: '北京'
          },
          {
            name: '云南',
            value: 95
          }
        ],
        [
          {
            name: '北京'
          },
          {
            name: '广西',
            value: 95
          }
        ],
        [
          {
            name: '北京'
          },
          {
            name: '辽宁',
            value: 95
          }
        ],
        [
          {
            name: '北京'
          },
          {
            name: '西藏',
            value: 95
          }
        ]
      ]
      // 注册地图数据
      echarts.registerMap(mapName, mapData)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params)
            if (params.seriesType === 'scatter') {
              return params.name + ' : ' + params.value[2]
            } else if (params.seriesType === 'effectScatter') {
              return params.name + ' : ' + params.value[2]
            }
          }
        },
        // 左下角图标
        visualMap: {
          // min: 0,
          // max: 100,
          calculable: true,
          itemWidth: 20, // 左下角图形的宽度，即长条的宽度。
          color: ['#FFE566', '#17294D'],
          seriesIndex: [1], // series 作用域
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: mapName,
          name: 'MAP',
          type: 'map',
          mapType: 'china',
          zoom: 1.2,
          label: {
            normal: {
              show: false,
              color: '#fff'
            },
            emphasis: {
              show: false, // 鼠标经过不显示 省
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(16, 40, 116, 0.7)',
              borderColor: '#fff'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          // 连线
          {
            name: '北京市',
            type: 'lines',
            zlevel: 5,
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              symbol: 'circle',
              trailLength: 0,
              symbolSize: 12
            },
            lineStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#f4cd04' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#d4d3d1' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
                width: 3,
                opacity: 0.5,
                curveness: 0.2 // 尾迹线条曲直度
              }
            },
            data: this.convertDataLink(dataFrom, BJData, CHINA_GEO_COORD_MAP)
          },
          // 点点 效果市
          {
            name: 'pm2.5',
            type: 'scatter',
            symbol: 'circle',
            coordinateSystem: 'geo',
            data: this.convertData(dataCity, CITY_GEO_COORD_MAP),
            symbolSize: 5,
            // hoverAnimation: true,
            legendHoverLink: false,
            // large: true, // 是否开启大数据量优化
            // largeThreshold: 10,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            // 点点的阴影效果
            itemStyle: {
              shadowColor: '#fee75b',
              shadowBlur: 6
            }
          },
          // 省份的图标
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.convertData(data, CHINA_GEO_COORD_MAP),
            // symbolSize: function (val) {
            //   return val[2] / 10
            // },
            showEffectOn: 'render',
            // 涟漪特效相关配置。
            rippleEffect: {
              scale: 4, // 扩散范围
              brushType: 'stroke' // 扩散类型
            },
            symbol: 'circle', // 形状
            symbolSize: 15, // 大小
            hoverAnimation: true,
            // 省份
            label: {
              normal: {
                color: '#fff',
                fontWeight: '200',
                formatter: '{b}',
                position: 'right',
                distance: 5,
                show: true,
                lineHeight: 18,
                verticalAlign: 'middle',
                backgroundColor: '#0055fe',
                padding: [0, 12]
              }
            },
            itemStyle: {
              normal: {
                color: '#e0edf6',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 4
          }
          // 悬浮效果
          // {
          //   name: '悬浮效果',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   symbol: 'pin', // 气泡
          //   symbolSize: 60,
          //   label: {
          //     normal: {
          //       show: true,
          //       textStyle: {
          //         color: '#fff',
          //         fontSize: 1
          //       }
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#28a7de' // 标志颜色
          //     }
          //   },
          //   zlevel: 6,
          //   data: convertData1(data)
          // }
        ]
      }

      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption(option)

      // 添加事件
      this.chart.on('click', (params) => {
        console.log(params)
        const mapData = require('./../../assets/map/json/province/jiangxi')
        this.initCharts(mapData, 'jiangxi')
      })
    },
    /**
     * 数据处理
     * @param data
     * @param geoCoordMap
     * @returns {Array}
     */
    convertData (data, geoCoordMap) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    /**
     * 连线数据处理
     * @param dataFrom
     * @param data
     * @param geoCoordMap
     * @returns {Array}
     */
    convertDataLink (dataFrom, data, geoCoordMap) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const geoCoord = CHINA_GEO_COORD_MAP[data[i][0].name]
        if (geoCoord) {
          res.push({
            fromName: dataFrom,
            toName: data[i][1].name,
            coords: [
              CHINA_GEO_COORD_MAP[dataFrom],
              CHINA_GEO_COORD_MAP[data[i][1].name]
            ]
          })
        }
      }
      return res
    }
  }
}
</script>

<style scoped lang="scss">
  .echarts {
    position: relative;
    height: 100%;
    .go-back {
      position: absolute;
      top: -80px;
      right: 8px;
      cursor: pointer;
    }
    .main-chart {
      width: 100%;
      height: 70vh;
      min-height: 520px;
      overflow: hidden;
    }
    .popFrame {
      position: absolute;
      padding: 10px 20px 5px 20px;
      bottom: 10px;
      left: 20px;
      border: 1px solid #CBCBCB;
      background: rgba(255,255,255, .7);
      border-radius: 12px;
      header {
        text-align: center;
        font-size: 14px;
        color: #000;
        margin-bottom: 10px;
      }
      .site-wrapper {
        width: 200px;
        .row {
          margin: 0 !important;
        }
        .point-wrapper {
          margin-bottom: 20px;
          margin-top: 5px;
          .point {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 50%;
          }
        }
        .site-item {
          display: flex;
          font-size: 12px;
          margin-bottom: 8px;
        }
      }
    }
    .pop-color {
      position: absolute;
      right: 0;
      bottom: 5px;
      font-size: 13px;
      letter-spacing: 1px;
      .point {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
</style>
