import * as React from "react";
import {
  Modal,
  Form,
  Select,
  Button,
  message,
  Row,
  Col,
  InputNumber
} from "antd";
import { FloorInfo, FloorItem } from "../../interfaces/model";
import store from "../../store";
import buildingService from "../../services/building";
import { RouteComponentProps } from "react-router";
import checkcode from "../../services/check-role";
import { BrowserRouterProps } from "react-router-dom";
interface Props {
  id: string;
  floornumber: string;
}

interface State {
  rows: FloorInfo[];
  vacantaera: number;
  totalarea: number;
  total_area: number;
  level: number;
  commercial_area: number;
  floorList: FloorItem[];
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    return (
      <div>
        <Button style={{ marginBottom: 30 }} onClick={this.back.bind(this)}>
          返回上一层
        </Button>
        <h1 className="title-center">楼宇楼层基本信息编辑</h1>
        <Row>
          <Col offset={5} span={16}>
            <Row style={{ marginBottom: 30 }}>
              <Col offset={4} span={8}>
                请输入总面积(m²)
              </Col>
              <Col offset={1} span={8}>
                请输入商用面积(m²)
              </Col>
            </Row>
            {this.state.rows.length > 0
              ? this.state.rows.map((item, index) => {
                  return (
                    <Row key={index}>
                      <Col span={12}>
                        <Form.Item
                          label={"第" + item.level + "层"}
                          {...formItemLayout}
                        >
                          <InputNumber
                            min={0}
                            style={{ width: 200 }}
                            value={
                              item.total_area == 0 ? null : item.total_area
                            }
                            onChange={(value: number) => {
                              this.state.rows[index].total_area = value;
                              this.setState({
                                rows: this.state.rows
                              });
                            }}
                            precision={2}
                            placeholder="请输入总面积"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item {...formItemLayout}>
                          <InputNumber
                            min={0}
                            style={{ width: 200 }}
                            value={
                              item.commercial_area == 0
                                ? null
                                : item.commercial_area
                            }
                            onChange={(value: number) => {
                              this.state.rows[index].commercial_area = value;
                              this.setState({
                                rows: this.state.rows
                              });
                            }}
                            placeholder="请输入商用面积"
                            precision={2}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                })
              : this.state.floorList.map((item, index) => {
                  return (
                    <Row key={index}>
                      <Col span={12}>
                        <Form.Item
                          label={"第" + (index + 1) + "层"}
                          {...formItemLayout}
                        >
                          <InputNumber
                            min={0}
                            style={{ width: 200 }}
                            value={item.total_area}
                            onChange={(value: number) => {
                              this.state.floorList[index].total_area = value;
                              this.setState({
                                floorList: this.state.floorList
                              });
                            }}
                            precision={2}
                            placeholder="请输入商用面积"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item {...formItemLayout}>
                          <InputNumber
                            min={0}
                            style={{ width: 200 }}
                            value={item.commercial_area}
                            onChange={(value: number) => {
                              this.state.floorList[
                                index
                              ].commercial_area = value;
                              this.setState({
                                floorList: this.state.floorList
                              });
                            }}
                            precision={2}
                            placeholder="请输入商用面积"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                })}
          </Col>
        </Row>

        {/* <Router {...this.getConfirmation}>
          <div>
            <Prompt message="确定要离开吗？" />
          </div>
        </Router> */}

        <div className="bottom-button">
          <Button type="primary" onClick={this.setFloor.bind(this)}>
            保存
          </Button>
        </div>
      </div>
    );
  }
  state: State = {
    rows: [],
    vacantaera: null,
    totalarea: null,
    total_area: 0,
    level: 0,
    commercial_area: 0,
    floorList: []
  };
  back() {
    this.props.history.goBack();
  }

  async setFloor() {
    try {
      let closeLoading = message.success("正在保存");
      let rows = null;
      if (this.state.rows.length > 0) {
        rows = this.state.rows.map((item, index) => {
          return {
            total_area:
              item.total_area == null
                ? 0
                : parseInt(item.total_area * 100 + ""),
            level: item.level,
            commercial_area:
              item.commercial_area == null
                ? 0
                : parseInt(item.commercial_area * 100 + ""),
            id: item.id
          };
        });
        let data = await buildingService.setFloorInfo(rows);
        if (data.stat == "ok") {
          setTimeout(() => {
            closeLoading();
            message.success("楼层编辑成功");
            this.props.history.push(`/home/buildingList`);
          });
        } else {
          checkcode.checkerrcode(data.stat);
        }
      } else {
        rows = this.state.floorList.map((item, index) => {
          return {
            total_area:
              this.state.total_area == null
                ? 0
                : parseInt(item.total_area * 100 + ""),
            level: item.level,
            commercial_area:
              this.state.commercial_area == null
                ? 0
                : parseInt(item.commercial_area * 100 + "")
          };
        });
        let data = await buildingService.createBuildingFloor(
          parseInt(this.props.match.params.id),
          rows
        );
        if (data.stat == "ok") {
          setTimeout(() => {
            closeLoading();
            message.success("楼层编辑成功");
            this.props.history.push(`/home/buildingList`);
          });
        } else {
          checkcode.checkerrcode(data.stat);
        }
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  async listData(id: number) {
    try {
      let closeloading = message.loading("正在加载数据");
      let data = await buildingService.searchSimpleFloorByBuilding(
        id,
        "asc",
        "level"
      );
      setTimeout(() => {
        closeloading();
        message.success("数据加载成功");
      }, 500);
      if (data.stat == "ok") {
        if (data.items.length === 0) {
          this.addfloor(null, null);
        }
        data.items.forEach(item => {
          item.commercial_area /= 100;
          item.total_area /= 100;
        });
        this.setState({
          rows: data.items
        });
      } else {
        checkcode.checkerrcode(data.stat);
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  getConfirmation: BrowserRouterProps = {
    getUserConfirmation: (message: string, callback: (ok: boolean) => void) => {
      if (window.confirm(message)) {
        callback(true);
      
      } else {
        callback(false);
      
      }
    }
  };
  addfloor(totalarea: number, businesearea: number) {
    let floorList: FloorItem[] = [];
    for (let i = 0; i < parseInt(this.props.match.params.floornumber); i++) {
      let FloorItem: FloorItem = {
        level: i + 1,
        total_area: totalarea,
        commercial_area: totalarea
      };
      floorList.push(FloorItem);
    }
    this.setState({
      floorList: floorList
    });
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "buildingList"
    });
    this.listData(parseInt(this.props.match.params.id));
  }
}
