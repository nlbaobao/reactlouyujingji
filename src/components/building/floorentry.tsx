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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Prompt } from "react-router-dom";
import { FloorItem } from "../../interfaces/model";
import store from "../../store";
import loaderService from "../../services/loader";
import buildingService from "../../services/building";
import Unified from "./unified";
import checkcode from "../../services/check-role";
import { RouteComponentProps } from "react-router";
interface Props {
  floornumber: string;
  id: string;
  totalarea: number;
  businesearea: number;
}

interface State {
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
        <Button type="primary" onClick={this.unified.bind(this)}>
          统一录入面积
        </Button>
        {/* <Button style={{ marginBottom: 30 }} onClick={this.back.bind(this)}>
          返回上一层
        </Button> */}
        <h1 className="title-center">楼宇楼层基本信息录入</h1>
        <Row>
          <Col offset={5} span={16}>
            <Row style={{ marginBottom: 30 }}>
              <Col offset={4} span={8}>
                输入总面积(m²)
              </Col>
              <Col offset={1} span={11}>
                输入商用面积(m²)
              </Col>
            </Row>
            {this.state.floorList.map((item, index) => {
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
                          this.state.floorList[index].commercial_area = value;
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

        <div className="bottom-button">
          <Button type="primary" onClick={this.creatFloor.bind(this)}>
            保存
          </Button>
        </div>
      </div>
    );
  }
  state: State = {
    total_area: 0,
    level: 0,
    commercial_area: 0,
    floorList: []
  };
  back() {
    this.props.history.goBack();
  }

  unified() {
    let unmount = loaderService.mount(
      <Unified
        afterClose={() => unmount()}
        onSuccess={(totalarea: number, businesearea: number) => {
          this.addfloor(totalarea, businesearea);
        }}
      />
    );
  }

  async creatFloor() {
    let rows = this.state.floorList.map((item, index) => {
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
    try {
      let closeLoading = message.success("正在保存");
      let data = await buildingService.createBuildingFloor(
        parseInt(this.props.match.params.id),
        rows
      );
      if (data.stat == "ok") {
        setTimeout(() => {
          closeLoading();
          message.success("楼层创建成功");
        });
        this.props.history.push(`/home/buildingList`);
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
    this.addfloor(null, null);
    store.dispatch({
      type: "SET_MENU",
      menu: "project"
    });
  }
}
