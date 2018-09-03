import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Button, message, Progress, Row, Col, Modal } from "antd";
import store from "../../store";
import { FloorInfo } from "../../interfaces/model";
import floorservice from "../../services/building";
import "./style.less";
import checkRole from "../../services/check-role";
interface Props {
  id: string;
}
interface State {
  rows: FloorInfo[];
}
export default class extends React.Component<RouteComponentProps<Props>> {
  render() {
    return (
      <div className="floor-wrap">
        <Button type="primary" onClick={this.back.bind(this)}>
          返回上一层
        </Button>
        {this.state.rows.map(item => {
          return (
            <div className="progress" key={item.id}>
              <Row>
                <Col span={1}>
                  <span>第{item.level}层：</span>
                </Col>
                <Col span={20}>
                  {item.total_area == 0 ? (
                    <Progress percent={0} />
                  ) : (
                    <Progress
                      percent={Number(
                        (
                          ((item.total_area - item.vacant_area) /
                            item.total_area) *
                          100
                        ).toFixed(2)
                      )}
                      gapDegree={50}
                    />
                  )}

                  <span>
                    {item.level}层已入驻面积/总面积：{item.total_area / 100 -
                      item.vacant_area / 100}㎡/{item.total_area / 100}㎡，已入驻{
                      item.total_companies
                    }家企业
                  </span>
                </Col>
                <Col offset={1} span={2}>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.go(item);
                    }}
                  >
                    查看入住企业
                  </Button>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    );
  }
  back() {
    this.props.history.goBack();
  }
  go(floor: FloorInfo) {
    this.props.history.push(`/home/map/floor/floordetail/${floor.id}`);
  }
  state: State = {
    rows: []
  };
  async listData(id: number) {
    try {
      let closeloading = message.loading("正在加载数据");
      let data = await floorservice.searchSimpleFloorByBuilding(
        id,
        "asc",
        "level"
      );
      setTimeout(() => {
        closeloading();
        message.success("数据加载成功");
      }, 500);
      if (data.stat == "ok") {
        this.setState({
          rows: data.items
        });
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
  fixed(type: number) {
    return type.toFixed(2);
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "map"
    });
    this.listData(parseInt(this.props.match.params.id));
  }
}
