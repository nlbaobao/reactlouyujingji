import * as React from "react";
import { Row, Col, message, Modal } from "antd";
import "./style.less";
import { EChartOption } from "echarts";
import { StatisticToalInfo } from "../../interfaces/model";
import staticService from "../../services/static";
import checktype from "../../services/check-role";
import checkRole from "../../services/check-role";
interface Props {
  title?: string;
  buildingId?: string;
}
interface State {
  row: StatisticToalInfo;
}
export default class extends React.Component<Props> {
  render() {
    return (
      <div>
        <Row>
          <Col offset={1} span={4}>
            <div className="databox">
              <span>
                {this.state.row.total == null
                  ? null
                  : this.division(
                      this.state.row.total.total_companies,
                      ",",
                      3
                    )}家
              </span>
              <span className="databox-span">入驻企业总数</span>
            </div>
          </Col>
          <Col offset={2} span={4}>
            <div className="databox">
              <span>
                {this.state.row.total == null
                  ? null
                  : this.division(
                      this.state.row.total.total_income / 100,
                      ",",
                      3
                    )}万元
              </span>
              <span className="databox-span">总收入</span>
            </div>
          </Col>
          <Col offset={2} span={4}>
            <div className="databox">
              <span>
                {this.state.row.total == null
                  ? null
                  : this.division(
                      this.state.row.total.total_tax_amount / 100,
                      ",",
                      3
                    )}万元
              </span>
              <span className="databox-span">总税收</span>
            </div>
          </Col>
          <Col offset={2} span={4}>
            <div className="databox">
              <span>
                {this.state.row.total == null
                  ? null
                  : this.division(
                      this.state.row.total.tax_amount_average,
                      ",",
                      3
                    )}元
              </span>
              <span className="databox-span">每平方米税收产出</span>
            </div>
          </Col>
          <Col offset={1} span={4}>
            <div className="databox">
              <span>
                {this.state.row.total == null
                  ? null
                  : this.division(
                      this.state.row.total.total_employee_number,
                      ",",
                      3
                    )}人
              </span>
              <span className="databox-span">企业总从业人员数</span>
            </div>
          </Col>
          <Col offset={2} span={4}>
            <div className="databox">
              <span>
                {this.state.row.total == null
                  ? null
                  : this.division(
                      this.state.row.total.total_vacant_area / 100,
                      ",",
                      3
                    )}m²
              </span>
              <span className="databox-span">空置面积</span>
            </div>
          </Col>
          <Col offset={2} span={4}>
            <div className="databox">
              <span>
                {this.state.row.total == null
                  ? null
                  : this.division(
                      this.state.row.total.total_rented_area / 100,
                      ",",
                      3
                    )}m²
              </span>
              <span className="databox-span">租用面积</span>
            </div>
          </Col>
          <Col offset={2} span={4}>
            <div className="databox">
              {
                <span>
                  {this.state.row.total == undefined
                    ? null
                    : this.division(
                        this.state.row.total.total_sell_area / 100,
                        ",",
                        3
                      )}m²
                </span>
              }
              <span className="databox-span">出售面积</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={9} offset={3}>
            <h4 className="detail-title">纳税在地率</h4>
            <div className="chart-wrap">
              <div className="pay-echart" style={{ width: 350, height: 200 }} />
            </div>
            <Col span={12}>
              企业纳税在地数：{this.state.row.company
                ? parseInt(this.state.row.company.taxes_companies + "")
                : null}家
            </Col>
            <Col span={12}>
              企业总数：{this.state.row.total == null
                ? null
                : this.state.row.total.total_companies}家
            </Col>
          </Col>
          <Col span={9} offset={3}>
            <h4 className="detail-title">空置率</h4>
            <div className="chart-wrap">
              <div
                className="vacant-echart"
                style={{ width: 350, height: 200 }}
              />
            </div>
            <Col span={12}>
              空置面积：{this.state.row.vacant
                ? this.state.row.vacant.vacant_area / 100
                : null}平方米
            </Col>
            {/* <Col span={12}>
              已迁出面积：{this.state.row.vacant
                ? this.state.row.vacant.use_area
                : null}平方米
            </Col> */}
            <Col span={12}>
              使用面积：{this.state.row.vacant
                ? this.state.row.vacant.use_area / 100
                : null}平方米
            </Col>
            {/* <Col span={12}>稳定使用面积：200平米</Col> */}
            <Col span={12}>
              意向迁出面积：{this.state.row.vacant
                ? this.state.row.vacant.quit_area / 100
                : null}平方米
            </Col>
            <Col span={12}>
              总面积：{this.state.row.vacant
                ? this.state.row.vacant.total_area / 100
                : null}平方米
            </Col>
          </Col>
          <Col span={9} offset={3}>
            <h4 className="detail-title">注册在地率</h4>
            <div className="chart-wrap">
              <div
                className="register-echart"
                style={{ width: 350, height: 200 }}
              />
            </div>
            <Col span={12}>
              企业注册在地数：
              {this.state.row.company
                ? parseInt(this.state.row.company.register_companies + "")
                : null}家
            </Col>
            <Col span={12}>
              企业注册总数：
              {this.state.row.total == null
                ? null
                : this.state.row.total.total_companies}家
            </Col>
          </Col>
          <Col span={9} offset={3}>
            <h4 className="detail-title">企业类型</h4>
            <div className="chart-wrap">
              <div
                className="company-echart"
                style={{ width: 350, height: 200 }}
              />
            </div>
          </Col>
          <Col span={20} offset={3}>
            <h4 className="detail-title">行业企业占比</h4>
            <div className="chart-wrap">
              <div
                className="organ-echart"
                style={{ width: 350, height: 200 }}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  chart: echarts.ECharts;
  initChartVacant() {
    this.chart = echarts.init(document.querySelector(".vacant-echart"));
    let option: EChartOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["空置率", "使用率"]
      },
      series: [
        {
          name: "硚口区大数据平台",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "16"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: this.state.row.vacant
                ? this.state.row.vacant.vacant_area / 100
                : null,
              name: "空置率"
            },
            {
              value: this.state.row.vacant
                ? this.state.row.vacant.use_area / 100
                : null,
              name: "使用率"
            }
          ]
        }
      ]
    };
    this.chart.setOption(option);
  }
  initChartRegister() {
    this.chart = echarts.init(document.querySelector(".register-echart"));
    let option: EChartOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["注册在地率", "非注册在地率"]
      },
      series: [
        {
          name: "硚口区大数据平台",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "16"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: this.state.row.company.register_companies,
              name: "注册在地率"
            },
            {
              value:
                this.state.row.total.total_companies -
                this.state.row.company.register_companies,
              name: "非注册在地率"
            }
          ]
        }
      ]
    };
    this.chart.setOption(option);
  }
  initChartPay() {
    this.chart = echarts.init(document.querySelector(".pay-echart"));
    let option: EChartOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["纳税在地率", "非纳税在地率"]
      },
      series: [
        {
          name: "硚口区大数据平台",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "16"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: this.state.row.company.taxes_companies,
              name: "纳税在地率"
            },
            {
              value:
                this.state.row.total.total_companies -
                this.state.row.company.taxes_companies,
              name: "非纳税在地率"
            }
          ]
        }
      ]
    };
    this.chart.setOption(option);
  }
  initChartCompany() {
    this.chart = echarts.init(document.querySelector(".company-echart"));
    let option: EChartOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: this.state.row.organizationType.map(item =>
          checktype.checkorganizationtype(item.name)
        )
      },
      series: [
        {
          name: "硚口区大数据平台",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "16"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.state.row.organizationType.map(item => {
            return {
              value: item.number,
              name: checktype.checkorganizationtype(item.name)
            };
          })
        }
      ]
    };
    this.chart.setOption(option);
  }
  initChartOrgan() {
    this.chart = echarts.init(document.querySelector(".organ-echart"));
    let option: EChartOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: this.state.row.industryType.map(item =>
          checktype.checkindustrytype(item.name)
        )
      },
      series: [
        {
          name: "硚口区大数据平台",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "16"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.state.row.industryType.map(item => {
            return {
              value: item.number,
              name: checktype.checkindustrytype(item.name)
            };
          })
        }
      ]
    };
    this.chart.setOption(option);
  }
  state: State = {
    row: {}
  };
  async listTotalData() {
    try {
      let data = null;
      let closeLoading = message.loading("数据加载中");
      if (this.props.buildingId) {
        data = await staticService.getOneBuildingStatisticsData(
          parseInt(this.props.buildingId)
        );
      } else {
        data = await staticService.getTotalStatisticsData();
      }

      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 200);
      if (data.stat == "ok") {
        this.setState(
          {
            row: data
          },
          () => {
            this.initChartVacant();
            this.initChartRegister();
            this.initChartPay();
            this.initChartCompany();
            this.initChartOrgan();
          }
        );
      } else {
        checkRole.checkerrcode(data.stat);
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  division(type: number, flg: string, sn: number) {
    let newstr = "";
    let dgl = type + "";
    if (dgl.indexOf(".") > -1) {
      var length = dgl.indexOf(".");
      var substr = dgl
        .substr(0, length)
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < length; i = i + sn) {
        var tmp = substr.substring(i, i + sn);
        newstr += tmp + flg;
      }
      return (
        newstr
          .substr(0, newstr.length - 1)
          .split("")
          .reverse()
          .join("") + dgl.substr(length, dgl.length)
      );
    } else {
      var str = dgl
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < str.length; i = i + sn) {
        var tmp = str.substring(i, i + sn);
        newstr += tmp + flg;
      }
      return newstr
        .substr(0, newstr.length - 1)
        .split("")
        .reverse()
        .join("");
    }
  }
  componentDidMount() {
    this.listTotalData();
  }
  componentWillUnmount() {
    this.chart.dispose();
  }
}
