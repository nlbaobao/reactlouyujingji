import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { EChartOption } from 'echarts'
import store from '../../store'

export default class extends React.Component {
  render() {
    return (
      <div>
        项目招商
        <div className="chart-demo" style={{ width: 300, height: 300 }} />
      </div>
    )
  }

  chart: echarts.ECharts
  initChart() {
    this.chart = echarts.init(document.querySelector('.chart-demo'))
    let option: EChartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    }
    this.chart.setOption(option)
  }

  componentDidMount() {
    store.dispatch({
      type: 'SET_MENU',
      menu: 'merchants'
    })
    this.initChart()
  }

  componentWillUnmount() {
    this.chart.dispose()
  }
}
