<template>
  <div ref="myEchart" style="width: 1000px; height: 600px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  mounted () {
    var nodes = [
      {
        x: '5',
        y: '5',
        name: '服务器',
        img: 'data-1547632686885-o5Rfi3tyk.png',
        alarm: '产生告警了哦'
      },
      {
        x: '3',
        y: '0',
        name: '存储设备1',
        img: 'data-1547633192258-2EYYUDdcd.png'
      },
      {
        x: '7',
        y: '0',
        name: '存储设备2',
        img: 'data-1547633192258-2EYYUDdcd.png'
      },
      {
        x: '0',
        y: '10',
        name: '防火墙',
        img: 'data-1547633094304-08Q_2YEvH.png'
      },
      {
        x: '5',
        y: '10',
        name: '网络设备1',
        img: 'data-1547632915872-WZMUphq72.png',
        alarm: '产生告警了哦'
      },
      {
        x: '12',
        y: '12',
        name: '网络设备2',
        img: './'
      }
    ]
    var links = [
      {
        source: '存储设备2',
        target: '存储设备1',
        name: '数据传输'
      }, {
        source: '存储设备1',
        target: '服务器',
        name: '数据传输'
      },
      {
        source: '服务器',
        target: '防火墙',
        name: '访问'
      },
      {
        source: '防火墙',
        target: '网络设备1',
        name: '访问'
      },
      {
        source: '网络设备1',
        target: '网络设备2',
        name: '访问'
      }
    ]
    var charts = {
      nodes: [],
      links: [],
      linesData: []
    }
    var dataMap = new Map()
    for (var j = 0; j < nodes.length; j++) {
      var x = parseInt(nodes[j].x)
      var y = parseInt(nodes[j].y)
      var node = {
        name: nodes[j].name,
        value: [x, y],
        symbolSize: 50,
        alarm: nodes[j].alarm,
        symbol: 'image:///asset/get/s/' + nodes[j].img,
        itemStyle: {
          normal: {
            color: '#12b5d0'
          }
        }
      }
      dataMap.set(nodes[j].name, [x, y])
      charts.nodes.push(node)
    }
    for (var i = 0; i < links.length; i++) {
      var link = {
        source: links[i].source,
        target: links[i].target,
        label: {
          normal: {
            show: true,
            formatter: links[i].name
          }
        },
        lineStyle: {
          normal: {
            color: '#12b5d0',
            curveness: 0
          }
        }
      }
      charts.links.push(link)
      // 组装动态移动的效果数据
      var lines = [{
        coord: dataMap.get(links[i].source)
      }, {
        coord: dataMap.get(links[i].target)
      }]
      charts.linesData.push(lines)
    }
    const option = {
      title: {
        text: '网络拓扑图'
      },
      xAxis: {
        show: false,
        type: 'value'
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [{
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        symbolSize: 50,
        label: {
          normal: {
            show: true,
            position: 'bottom',
            color: '#12b5d0'
          }
        },
        lineStyle: {
          normal: {
            width: 2,
            shadowColor: 'none'
          }
        },
        edgeSymbolSize: 8,
        data: charts.nodes,
        links: charts.links,
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: function (item) {
                return item.data.name
              }
            }
          }
        }
      }, {
        name: 'A',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
          show: true,
          trailLength: 0,
          symbol: 'arrow',
          color: '#12b5d0',
          symbolSize: 8
        },
        lineStyle: {
          normal: {
            curveness: 0
          }
        },
        data: charts.linesData
      }]
    }
    // 用于告警的动态效果
    const myChart = echarts.init(this.$refs.myEchart)
    setInterval(() => {
      var dataI = []
      for (var n = 0; n < nodes.length; n++) {
        var alarm = nodes[n].alarm
        if (alarm !== null && alarm !== '' && alarm !== undefined) {
          option.series[0].data[n].symbolSize = 60
          option.series[0].data[n].label = {
            normal: {
              color: '#DC143C'
            }
          }
          option.series[0].itemStyle.normal.label.formatter = function (item) {
            if (item.data.alarm !== undefined) {
              return item.data.name + '\n[ ' + item.data.alarm + ' ]'
            } else {
              return item.data.name
            }
          }
          dataI.push(n)
        }
      }
      myChart.setOption(option)
      setTimeout(() => {
        for (var m = 0; m < dataI.length; m++) {
          option.series[0].data[dataI[m]].symbolSize = 50
          option.series[0].data[dataI[m]].label = {
            normal: {
              color: '#12b5d0'
            }
          }
          option.series[0].itemStyle.normal.label.formatter = function (item) {
            return item.data.name
          }
        }
        myChart.setOption(option)
      }, 500)
    }, 1000)
  }
}
</script>

<style scoped>

</style>
