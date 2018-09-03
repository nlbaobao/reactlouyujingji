import * as React from "react";
import { Unsubscribe } from "redux";
import { RouteComponentProps } from "react-router";
import { Tabs, message, Tag, Row, Col, Button } from "antd";
import { BuilldingItem, Role, UserInfo } from "../../interfaces/model";
import Datacole from "../publicassembly/pie";
import StreetDiagram from "../publicassembly/street";
import store from "../../store";
import checkRole from "../../services/check-role";
import loaderService from "../../services/loader";
import "./style.less";
import * as ReactDOM from "react-dom";
interface State {
  rows: BuilldingItem[];
  id: number;
  roles: Role[];
  user: UserInfo;
}
export default class extends React.Component<RouteComponentProps<any>> {
  render() {
    const TabPane = Tabs.TabPane;
    const { CheckableTag } = Tag;
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="统计数据总览" key="1">
            <div className="statics-wrap">
              <Datacole />
            </div>
          </TabPane>
          {checkRole.check(
            ["streetBuildingManager"],
            this.state.roles
          ) ? null : (
            <TabPane tab="街道统计数据" key="2">
              <div className="list">
                {/* <Row>
                <Col span={1} offset={1}>
                  街道：
                </Col>
                {this.state.rows.map(item => {
                  return (
                    <Col span={2} key={item.key}>
                      <Button size="small" onClick={() => this.onClick(item)}>
                        {item}
                      </Button>
                    </Col>
                  );
                })}
              </Row> */}
              </div>
              <div>
                <StreetDiagram id={this.state.id} />
              </div>
              <Row />
            </TabPane>
          )}
        </Tabs>
      </div>
    );
  }
  state: State = {
    rows: [],
    id: null,
    roles: [],
    user: {}
  };

  onClick(info: BuilldingItem) {
    this.setState({
      id: info.id
    });
  }
  unsub: Unsubscribe;
  componentWillMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        user: store.getState().user,
        roles: store.getState().user.src_roles || []
      });
    });
  }

  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "statistic"
    });
  }
}
