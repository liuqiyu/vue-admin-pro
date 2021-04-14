<template>
  <div class="map-wrapper">
    <el-breadcrumb class="breadcrumb"
                   separator="/">
      <el-breadcrumb-item><a @click="handlePathChina">全国</a></el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList"
                          :key="index"><a @click="handlePath(item, index)">{{item.name}}</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="map">
      <div ref="map"
           id="map"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { randomNumber } from '@/utils/utils'
import resize from '@/mixins/resize'

let chinaId = 100000
let chinaName = 'china'
export default {
  name: 'echarts-map',
  mixins: [resize],
  mounted () {
    this.initCharts(chinaName, chinaId)
  },
  data () {
    return {
      chart: null,
      data: [],
      breadcrumbList: []
    }
  },
  methods: {
    handlePathChina () {
      this.initCharts(chinaName, chinaId)
      this.breadcrumbList = []
    },
    handlePath (item, index) {
      if (this.breadcrumbList.length !== index + 1) {
        this.breadcrumbList = this.breadcrumbList.splice(0, index + 1)
        this.initCharts(item.name, item.id)
      }
    },
    initCharts (mapName, id) {
      const geoJson = require(`static/mapGeoJson/${id}.json`)
      echarts.registerMap(mapName, geoJson)
      this.data = geoJson.features.map(item => {
        return {
          name: item.properties.name,
          value: randomNumber(1, 100),
          id: item.id || item.properties.adcode
        }
      })
      this.chart = echarts.init(this.$refs.map)
      this.setOptions(mapName)
      this.chart.off('click')
      this.chart.on('click', (params) => {
        console.log(params)
        let id = params.data.id
        if (id) {
          this.breadcrumbList.push({
            id,
            name: params.name
          })
          this.initCharts(params.name, id)
        }
      })
    },
    setOptions (mapName) {
      this.chart.setOption({
        title: {
          text: '中国地图（2020）',
          subtext: '人口密度数据来自Wikipedia',
          sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 人'
        },
        visualMap: {
          min: 1,
          max: 100,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [
          {
            name: 'map',
            type: 'map',
            map: mapName,
            roam: true, // 是否允许缩放
            zoom: 1, // 默认显示级别
            scaleLimit: { min: 1, max: 3 }, // 缩放级别
            center: 0, // 保持居中
            label: {
              normal: {
                show: true,
                color: '#fff',
                position: ['50%', '50%'],
                verticalAlign: 'top',
                align: 'left'
              },
              emphasis: {
                show: false, // 鼠标经过不显示 省
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                areaColor: 'lightskyblue',
                borderColor: '#7fa9fe',
                borderWidth: 1
              },
              emphasis: {
                areaColor: '#f2d64c'
              }
            },
            data: this.data
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
  display: flex;
  flex-direction: column;
  .breadcrumb {
    height: 24px;
    flex: none;
  }
  .map {
    flex: 1;
    padding: 20px;
    border: 1px #e1e1e1 solid;
  }
}
#map {
  width: 100%;
  height: 100%;
}
</style>