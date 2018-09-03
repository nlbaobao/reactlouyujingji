import * as React from "react";
import { RouteComponentProps } from "react-router";
import { BuilldingItem } from "../../interfaces/model";
import { Button, Row, Col, Modal } from "antd";
import store from "../../store";
import projectService from "../../services/project";
import "./style.less";
import Datacole from "../publicassembly/pie";
import buildingservice from "../../services/building";
import moment from "moment";
import checkRole from "../../services/check-role";
interface Props {
  id: string;
}
interface State {
  building: BuilldingItem;
  btime: moment.Moment;
  totalmovein: number;
}
export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    return (
      <div className="building-wrap">
        <Button onClick={this.back.bind(this)}>返回上一层</Button>
        <h3 className="detail-title">
          {this.state.building.name}
          <Button
            className="offsetleft"
            onClick={() => {
              this.go();
            }}
            type="primary"
          >
            查看楼层信息
          </Button>
        </h3>
        <Row>
          <Col offset={2} span={6}>
            <div className="buliding-logo">
              <img
                src={
                  this.state.building.images == null
                    ? ""
                    : this.state.building.images[0]
                }
                alt=""
              />
            </div>
          </Col>
          <Col span={15} offset={1}>
            <Row className="row-test">
              <Col span={8}>楼宇地址：{this.state.building.address}</Col>
              <Col span={8}>
                楼宇建成时间：{this.state.btime == null
                  ? null
                  : this.state.btime.format("YYYY-MM-DD")}
              </Col>
              <Col span={8}>
                楼宇总高(m)：{this.state.building.building_height == 0
                  ? null
                  : this.state.building.building_height / 100}
              </Col>
              <Col span={8}>
                楼层总数：{this.state.building.floor_count == 0
                  ? null
                  : this.state.building.floor_count}
              </Col>
              <Col span={8}>
                单层层高(m)：{this.state.building.single_storey == 0
                  ? null
                  : this.state.building.single_storey / 100}
              </Col>
              <Col span={8}>
                总面积(m²)：{this.state.building.construction_area == 0
                  ? null
                  : this.state.building.construction_area / 100}
              </Col>
              <Col span={8}>
                空置面积(m²)：{this.state.building.stock_area == 0
                  ? null
                  : this.state.building.stock_area / 100}
              </Col>
              <Col span={8}>
                交付标准：{checkRole.deliverystandard(
                  this.state.building.delivery_standard
                )}
              </Col>
              <Col span={8}>
                经营方式：{checkRole.modelofoperation(
                  this.state.building.model_of_operation
                )}
              </Col>
              <Col span={8}>
                租金(元)：{this.state.building.rent == 0
                  ? null
                  : this.state.building.rent}
              </Col>
              <Col span={8}>
                物业费(元)：{this.state.building.property_costs == 0
                  ? null
                  : this.state.building.property_costs}
              </Col>
              <Col span={8}>
                车位总数(个)：{this.state.building.parking_space == 0
                  ? null
                  : this.state.building.parking_space}
              </Col>
              {/* <Col span={8}>车位租金：</Col> */}
              <Col span={8}>
                电梯总数(个)：{this.state.building.number_of_elevators == 0
                  ? null
                  : this.state.building.number_of_elevators}
              </Col>
              <Col span={8}>
                楼宇主导业态：{checkRole.buildingbusiness(
                  this.state.building.building_business
                )}
              </Col>
              <Col span={8}>
                物业管理方：{this.state.building.property_management}
              </Col>
              <Col span={8}>
                楼长：{this.state.building.manager == null
                  ? ""
                  : this.state.building.manager.nickName}
              </Col>
              <Col span={8}>
                楼长联系方式：{this.state.building.manager_contact}
              </Col>
              <Col span={8}>
                意向项目个数(个)：{this.state.building.project_number}
                <Button
                  type="primary"
                  size="small"
                  onClick={this.goproject.bind(this)}
                  style={{ fontSize: 12, marginLeft: 30 }}
                >
                  查看意向项目
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <h3 className="detail-title"> {this.state.building.name}数据统计</h3>
        <Datacole buildingId={this.props.match.params.id} />
      </div>
    );
  }
  state: State = {
    building: {},
    btime: null,
    totalmovein: null
  };
  back() {
    this.props.history.goBack();
  }
  goproject() {
    this.props.history.push(`/home/project/${this.props.match.params.id}`);
  }
  go() {
    if (this.state.building.floor_count == 0) {
      return Modal.warn({
        title: "提示",
        content: "暂无任何楼层信息"
      });
    }
    this.props.history.push(
      `/home/map/building/floor/${this.props.match.params.id}`
    );
  }
  async listFile(id: number) {
    try {
      let data = await buildingservice.getBuilding(id);
      if (data.stat === "ok") {
        this.setState({
          building: data.building,
          btime:
            data.building.build_time == 0
              ? null
              : moment(data.building.build_time * 1000)
        });
      } else {
        checkRole.checkerrcode(data.stat);
      }
    } catch (error) {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }

  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "map"
    });
    this.listFile(parseInt(this.props.match.params.id));
  }
}
