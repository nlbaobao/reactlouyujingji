import * as React from "react";
import { RouteComponentProps } from "react-router";
import { EChartOption } from "echarts";
import { FloorInfo, CompanyInfo } from "../../interfaces/model";
import loaderService from "../../services/loader";
import buildingservice from "../../services/building";
import companyservice from "../../services/company";
import { Button, message, Progress, Row, Col, Modal, Form } from "antd";
import store from "../../store";
import checkRole from "../../services/check-role";
interface Props {
  id: string;
}
interface State {
  row: FloorInfo;
  cols: CompanyInfo[];
}
interface Clickname {
  name: string;
}
export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    return (
      <div className="floor-wrap">
        <div className="floor-message">
          <Form layout="inline">
            <Button type="primary" onClick={this.back.bind(this)}>
              返回上一层
            </Button>
            <Button
              style={{ marginLeft: 30 }}
              type="primary"
              onClick={this.listAll.bind(this)}
            >
              查看全部企业
            </Button>
          </Form>

          <div className="chart" />
        </div>
        <div className="company-bar">
          {this.state.cols
            ? this.state.cols.map(item => {
                return (
                  <Row key={item.id}>
                    <h5 className="bar-title">{item.name}</h5>
                    <Col offset={3} span={21}>
                      注册资本:{item.registered_capital}
                    </Col>
                    <Col offset={3} span={21}>
                      从业人员数:{item.employee_number}
                    </Col>
                    <Col offset={3} span={21}>
                      注册地址:{item.register_address}
                    </Col>
                    <Button
                      size="small"
                      className="bar-detail"
                      onClick={() => {
                        this.go(item.id);
                      }}
                    >
                      查看详情
                    </Button>
                  </Row>
                );
              })
            : null}
        </div>
      </div>
    );
  }

  back() {
    this.props.history.goBack();
  }

  go(id: number) {
    this.props.history.push(`/home/company/detail/${id}`);
  }

  chart: echarts.ECharts;
  initChart() {
    this.chart = echarts.init(document.querySelector(".chart"));
    let option: EChartOption = {
      title: {
        text: this.state.row.src_building
          ? this.state.row.src_building.name
          : "",
        subtext: "第" + this.state.row.level + "层",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "right",
        data: ["空置", "已租", "已售"]
      },
      series: [
        {
          name: "访问来源",
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
            { value: this.state.row.vacant_area, name: "空置" },
            { value: this.state.row.rented_area, name: "已租" },
            { value: this.state.row.sell_area, name: "已售" }
          ]
        }
      ]
    };
    this.chart.setOption(option);
    this.chart.on("click", (params: Clickname) => {
   
      if (params.name == "已租") {
        this.listCompany(parseInt(this.props.match.params.id), "Rented");
      }
      if (params.name == "已售") {
        this.listCompany(parseInt(this.props.match.params.id), "Sold");
      }
    });
  }

  state: State = {
    row: {},
    cols: []
  };

  async listData(id: number) {
    try {
      let closeloading = message.loading("数据加载中");
      let data = await buildingservice.getFloorInfo(id);
      setTimeout(() => {
        closeloading();
        message.success("数据加载成功");
      }, 200);
      if (data.stat === "ok") {
        this.setState(
          {
            row: data.floor
          },
          () => {
            this.initChart();
          }
        );
      }else{
        checkRole.checkerrcode(data.stat)
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  async listCompany(id: number, type: string) {
    try {
      let data = await companyservice.getCompanylist(
        parseInt(this.props.match.params.id),
        type
      );

      if (data.stat === "ok") {
        this.setState({
          cols: data.items
        });
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
  listAll() {
    this.listCompany(parseInt(this.props.match.params.id), "All");
  }
  componentDidMount() {
    // store.dispatch({
    //   type: "SET_MENU",
    //   menu: "map"
    // });
    this.listData(parseInt(this.props.match.params.id));
    this.listCompany(parseInt(this.props.match.params.id), "All");
  }
  componentWillUnmount() {
    this.chart.dispose();
  }
}
