import * as React from "react";
import { message, Modal } from "antd";
import staticService from "../../services/static";
import "./style.less";
import { StatisticStreetInfo } from "../../interfaces/model";
import { EChartOption } from "echarts";
import checkRole from "../../services/check-role";
interface Props {
  id: number;
}
interface State {
  rows: StatisticStreetInfo[];
}
export default class extends React.Component<Props> {
  render() {
    return (
      <div className="bar-wrap">
        <div
          style={{ width: 1000, height: 600, marginBottom: 30 }}
          className="tax-rate"
        />
        <div style={{ width: 1000, height: 600 }} className="vacancy-rate" />
        <div style={{ width: 1000, height: 600 }} className="register-rate" />
        <div style={{ width: 1000, height: 600 }} className="ground-rate" />
        <div style={{ width: 1000, height: 600 }} className="company-number" />
      </div>
    );
  }
  chart: echarts.ECharts;
  initTax() {
    this.chart = echarts.init(document.querySelector(".tax-rate"));
    let labelOption = {
      normal: {
        show: true,
        rotate: 90,
        align: "left",
        verticalAlign: "left",
        position: "insideBottom",
        distance: 30,
        formatter: "{c}  {name|{a}}",
        fontSize: 13,
        rich: {
          name: {
            color: "white"
          }
        }
      }
    };
    let option: EChartOption = {
      color: ["#76a36c", "#547df9"],
      title: {
        text: "纳税总金额（万元）"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        {
          show: true,
          axisLabel: {
            interval: 0,
            rotate: -20,
            textStyle: {
              align: "left"
            }
          },
          width: "20",
          axisTick: {
            alignWithLabel: true
          },
          type: "category",
          data: this.state.rows.map(item => item.streetdName)
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "纳税总金额",
          type: "bar",
          barGap: 0,

          label: labelOption,
          data: this.state.rows.map(item => item.tax_amount/100)
        }
      ]
    };
    this.chart.setOption(option);
  }
  initVacancy() {
    this.chart = echarts.init(document.querySelector(".vacancy-rate"));
    let labelOption = {
      normal: {
        show: true,
        rotate: 90,
        align: "left",
        verticalAlign: "left",
        position: "insideBottom",
        distance: 30,
        formatter: "{c}  {name|{a}}",
        fontSize: 13,
        rich: {
          name: {
            color: "white"
          }
        }
      }
    };
    let option: EChartOption = {
      title: {
        text: "空置率"
      },
      color: ["#5097d5", "#547df9"],
      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        {
          show: true,
          axisLabel: {
            interval: 0,
            rotate: -20,
            textStyle: {
              align: "left"
            }
          },
          width: "20",
          axisTick: {
            alignWithLabel: true
          },
          type: "category",
          data: this.state.rows.map(item => item.streetdName)
        }
      ],
      yAxis: [
        {
          type: "value",
          min:0,
          max:1
        }
      ],
      series: [
        {
          name: "空置率",
          type: "bar",
          barGap: 0,

          label: labelOption,
          data: this.state.rows.map(item => item.vacant_rate)
        }
      ]
    };
    this.chart.setOption(option);
  }
  intGround() {
    this.chart = echarts.init(document.querySelector(".ground-rate"));
    let labelOption = {
      normal: {
        show: true,
        rotate: 90,
        align: "left",
        verticalAlign: "left",
        position: "insideBottom",
        distance: 30,
        formatter: "{c}  {name|{a}}",
        fontSize: 13,
        rich: {
          name: {
            color: "white"
          }
        }
      }
    };
    let option: EChartOption = {
      color: ["#b34038", "#547df9"],
      title: {
        text: "纳税在地率"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        {
          show: true,
          axisLabel: {
            interval: 0,
            rotate: -20,
            textStyle: {
              align: "left"
            }
          },
          width: "20",
          axisTick: {
            alignWithLabel: true
          },
          type: "category",
          data: this.state.rows.map(item => item.streetdName)
        }
      ],
      yAxis: [
        {
          type: "value",
          min:0,
          max:1
        }
      ],
      series: [
        {
          name: "纳税在地率",
          type: "bar",
          barGap: 0,

          label: labelOption,
          data: this.state.rows.map(item => item.taxes_companies_rate)
        }
      ]
    };
    this.chart.setOption(option);
  }
  initRegister() {
    this.chart = echarts.init(document.querySelector(".register-rate"));
    let labelOption = {
      normal: {
        show: true,
        rotate: 90,
        align: "left",
        verticalAlign: "left",
        position: "insideBottom",
        distance: 30,
        formatter: "{c}  {name|{a}}",
        fontSize: 13,
        rich: {
          name: {
            color: "white"
          }
        }
      }
    };
    let option: EChartOption = {
      color: ["#6f9fa7", "#547df9"],
      title: {
        text: "注册在地率"
      },
      tooltip: {
        trigger: "axis"
      },
     
      xAxis: [
        {
          show: true,
          axisLabel: {
            interval: 0,
            rotate: -20,
            textStyle: {
              align: "left"
            }
          },
          width: "20",
          axisTick: {
            alignWithLabel: true
          },
          type: "category",
          data: this.state.rows.map(item => item.streetdName)
        }
      ],
      yAxis: [
        {
          type: "value",
          min:0,
          max:1
        }
      ],
      series: [
        {
          name: "注册在地率",
          type: "bar",
          barGap: 0,

          label: labelOption,
          data: this.state.rows.map(item => item.register_companies_rate)
        }
      ]
    };
   
    this.chart.setOption(option);
  }
  initCompany() {
    this.chart = echarts.init(document.querySelector(".company-number"));
    let labelOption = {
      normal: {
        show: true,
        rotate: 90,
        align: "left",
        verticalAlign: "left",
        position: "insideBottom",
        distance: 30,
        formatter: "{c}  {name|{a}}",
        fontSize: 13,
        rich: {
          name: {
            color: "white"
          }
        }
      }
    };
    let option: EChartOption = {
      color: ["#c9856b", "#547df9"],
      title: {
        text: "入驻企业数（家）"
      },
      tooltip: {
        trigger: "axis"
      },
      // chart.calculable: true,
      xAxis: [
        {
          show: true,
          axisLabel: {
            interval: 0,
            rotate: -20,
            textStyle: {
              align: "left"
            }
          },
          width: "20",
          axisTick: {
            alignWithLabel: true
          },
          type: "category",
          data: this.state.rows.map(item => item.streetdName)
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "入驻企业数",
          type: "bar",
          barGap: 0,

          label: labelOption,
          data: this.state.rows.map(item => item.total_companies)
        }
      ]
    };
    this.chart.setOption(option);
  }
  state: State = {
    rows: []
  };
  async steetData() {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await staticService.getStreetStatisticsData();
      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 200);
      if (data.stat == "ok") {
        this.setState(
          {
            rows: data.street
          },
          () => {
            this.initTax();
            this.initCompany();
            this.initRegister();
            this.initVacancy();
            this.intGround();
          }
        );
      }
      else{
        checkRole.checkerrcode(data.stat)
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  componentDidMount() {
    this.steetData();
  }
  componentWillUnmount() {}
}
