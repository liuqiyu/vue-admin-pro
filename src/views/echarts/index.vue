<template>
  <div class="main-chart"
       ref="myEchart"></div>
</template>

<script>
import echarts from 'echarts'
import { CITY_GEO_COORD_MAP, CHINA_GEO_COORD_MAP } from './GEO_COORD_MAP'
import { debounce } from './../../utils/utils'

export default {
  name: 'charts-country',
  data () {
    const _this = this
    return {
      chart: null,
      chartCity: null,
      // 目的地
      dataFrom: '北京市',
      options: {
        tooltip: {
          trigger: 'item',
          enterable: true,
          formatter: function (params) {
            // console.log(params)
            if (params.seriesType === 'scatter') {
              return params.name
            } else if (params.seriesType === 'effectScatter') {
              // return params.name + ' : ' + params.value[2]
              return '<div class="map-tooltip">' +
                '       <span class="icon iconfont iconjiaobiao"></span>\n' +
                '        <header class="title">' + params.name + '数据中心</header>\n' +
                '        <div class="box alarm">\n' +
                '          <header>告警</header>\n' +
                '          <section class="wrapper">\n' +
                '            <div class="alarm-item level-1">168</div>\n' +
                // '            <div class="alarm-item level-2">168</div>\n' +
                // '            <div class="alarm-item level-3">168</div>\n' +
                // '            <div class="alarm-item level-4">168</div>\n' +
                '          </section>\n' +
                '        </div>\n' +
                '        <div class="box assets">\n' +
                '          <header>资产</header>\n' +
                '          <section class="wrapper">\n' +
                '            <div class="assets-item"><span>楼：</span>23</div>\n' +
                '            <div class="assets-item"><span>楼层：</span>26</div>\n' +
                '            <div class="assets-item"><span>机房：</span>21</div>\n' +
                '          </section>\n' +
                '          <section class="wrapper">\n' +
                '            <div class="assets-item"><span>通道：</span>33</div>\n' +
                '            <div class="assets-item"><span>列头柜：</span>30</div>\n' +
                '            <div class="assets-item"><span>机柜：</span>35</div>\n' +
                '          </section>\n' +
                '        </div>\n' +
                '      </div>'
            }
          },
          backgroundColor: 'rgba(0,48,255,0.9)',
          borderColor: 'rgba(102,204,255,1)',
          borderWidth: 2,
          alwaysShowContent: true
        },
        // 左下角图标
        visualMap: {
          // min: 0,
          // max: 100,
          calculable: true,
          itemWidth: 20 * _this.$store.state.resolutionRatio, // 左下角图形的宽度，即长条的宽度。
          color: ['#FFE566', '#17294D'],
          seriesIndex: [1], // series 作用域
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: null,
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
              areaColor: 'rgba(16, 36, 102, 0.8)',
              borderColor: '#7fa9fe',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#002aa4'
            }
          }
        },
        series: [
          {
            type: 'map',
            map: null,
            geoIndex: 0,
            aspectScale: 0.75,
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: []
          },
          {
            name: 'pm2.5',
            type: 'scatter',
            symbol: 'circle',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 6 * _this.$store.state.resolutionRatio,
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
              shadowBlur: 6 * _this.$store.state.resolutionRatio
            }
          },
          // 省份的图标
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            showEffectOn: 'render',
            // 涟漪特效相关配置。
            rippleEffect: {
              scale: 4 * _this.$store.state.resolutionRatio, // 扩散范围
              brushType: 'stroke' // 扩散类型
            },
            symbol: 'circle', // 形状
            symbolSize: 15 * _this.$store.state.resolutionRatio, // 大小
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
                lineHeight: 18 * _this.$store.state.resolutionRatio,
                verticalAlign: 'middle',
                backgroundColor: '#0055fe',
                padding: [0, 12 * _this.$store.state.resolutionRatio],
                fontSize: 14 * _this.$store.state.resolutionRatio
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
          },
          // 悬浮效果
          {
            name: 'computerRoom',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'image://' + require('./center.png'), // 气泡
            symbolSize: 100 * _this.$store.state.resolutionRatio,
            symbolOffset: [0, '-50%'],
            itemStyle: {
              normal: {
                color: '#28a7de'
              }
            },
            zlevel: 6,
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    // 判断当前路由是否全国
    if (this.$route.query.city) {
      this.initSubMap('jiangxi', '南昌市')
    } else {
      const china = require('./../../static/map/json/china')
      this.initCharts(china, 'china')
    }
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  destroyed () {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    /**
     * 加载地图
     * @param json
     * @param name
     */
    initCharts (mapData, mapName) {
      const mainPointData = [
        { name: '广西', value: 177 },
        { name: '广东', value: 177 },
        { name: '吉林', value: 177 },
        { name: '辽宁', value: 177 },
        { name: '重庆', value: 177 }
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
          value: 229
        },
        {
          name: '南充',
          value: 229
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
          value: 229
        },
        {
          name: '郑州',
          value: 229
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
      const iconData = [
        { name: '广西', value: 177 },
        { name: '广东', value: 177 },
        { name: '吉林', value: 177 },
        { name: '辽宁', value: 177 },
        { name: '重庆', value: 177 }
      ]
      // 注册地图数据
      echarts.registerMap(mapName, mapData)
      this.$set(this.options.geo, 'map', mapName)
      this.$set(this.options.series[0], 'map', mapName)
      this.$set(this.options.series[0], 'data', this.convertData(mainPointData, CHINA_GEO_COORD_MAP))
      this.$set(this.options.series[1], 'data', this.convertData(dataCity, CITY_GEO_COORD_MAP))
      this.$set(this.options.series[2], 'data', this.convertData(mainPointData, CHINA_GEO_COORD_MAP))
      this.$set(this.options.series[3], 'data', this.convertData(iconData, CHINA_GEO_COORD_MAP))

      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption(this.options)
      // 添加事件
      this.chart.off('click')
      this.chart.on('click', (params) => {
        this.initSubMap('chongqing', '重庆市')
      })
    },
    initSubMap (name, dataFrom) {
      const mapData = require('./../../static/map/json/province/chongqing')
      console.log(mapData)

      const mainPointData = [
        { name: '渝北', value: 177 },
        { name: '北碚', value: 177 },
        { name: '涪陵', value: 177 },
        { name: '永川', value: 177 },
        { name: '黔江', value: 177 },
        { name: '万州', value: 177 },
        { name: '主城片区', value: 177 }
      ]
      const dataCity = [
        {
          name: '渝北',
          value: 9
        }
      ]
      const iconData = [
        { name: '重庆', value: 177 }
        // { name: '北碚', value: 177 },
        // { name: '涪陵', value: 177 },
        // { name: '永川', value: 177 },
        // { name: '黔江', value: 177 },
        // { name: '万州', value: 177 },
        // { name: '主城片区', value: 177 }
      ]
      // 注册地图数据
      echarts.registerMap(name, mapData)
      this.$set(this.options.geo, 'map', name)
      this.$set(this.options.series[0], 'map', name)
      this.$set(this.options.series[0], 'data', this.convertData(mainPointData, CHINA_GEO_COORD_MAP))
      this.$set(this.options.series[1], 'data', this.convertData(dataCity, CITY_GEO_COORD_MAP))
      this.$set(this.options.series[2], 'data', this.convertData1(mainPointData, mapData.features))
      this.$set(this.options.series[3], 'data', this.convertData1(iconData, mapData.features))

      this.chart1 = echarts.init(this.$refs.myEchart)
      this.chart1.setOption(this.options)
      // 添加事件
      this.chart1.off('click')
      this.chart1.on('click', (params) => {
        console.log(123)
        if (params.seriesName === 'computerRoom') {
          this.$router.push({
            name: 'dataCenter',
            query: {
              'data-center': `${params.name}数据中心`
            }
          })
        }
      })
    },
    /**
     * 数据处理 全国
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
     * 数据处理 省
     * @param dataFrom
     * @param data
     * @param geoCoordMap
     * @returns {Array}
     */
    convertData1 (data, geoCoordMap) {
      const res = []
      data.forEach((item) => {
        console.log(item)
        geoCoordMap.forEach((cell) => {
          if (cell.properties.name.indexOf(item.name) >= 0) {
            res.push({
              name: item.name,
              value: cell.properties.cp
            })
          }
        })
      })
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
  .main-chart {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<style lang="scss">

  .map-tooltip {
    width: 300px;
    position: relative;
    padding: 10px 15px 5px 25px;
    .icon {
      position: absolute;
      top: 11px;
      font-size: 12px;
      left: 4px;
      color: rgba(128,255,255,1);
    }
    > .title {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .box {
      margin-bottom: 20px;
      header {
        font-size: 14px;
        margin-bottom: 15px;
      }
      .wrapper {
        display: flex;
        flex-direction: row;
        .alarm-item {
          flex: 1;
          position: relative;
          padding-left: 14px;
          &:after {
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -4px;
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }
          &.level-1:after {
            background-color: red;
          }
          &.level-2:after {
            background-color: yellow;
          }
          &.level-3:after {
            background-color: pink;
          }
          &.level-4:after {
            background-color: blue;
          }
        }
        .assets-item {
          flex: 1;
          margin-bottom: 10px;
        }
      }
    }
    .assets {
      margin-bottom: 0;
    }
  }
</style>
