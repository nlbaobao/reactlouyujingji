import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Table, Button, Menu, Form, Row, Col } from 'antd'
import store from '../../store'
import "./style.less";
interface Props {
  id: number;
}
export default class extends React.Component<RouteComponentProps<Props>> {
  render() {
    return (
      <div>
        <Button onClick={this.back.bind(this)}>返回上一层</Button>
        <h1 className="detail-title">xxxx基本信息</h1>
        <Row>
          <Col offset={2} span={6}>
            <div className="logo">
              <img src="https://cdn.gratisography.com/photos/447H.jpg" alt="" />
            </div>
          </Col>
          <Col span={12} offset={2}>
            <Row className="row-30">
              <Col span={12}>座落地址：xxxxxxxxxxxxxxxxxxxxxxxx</Col>
              <Col span={12}>座落地址：xxxxxxxxxxxxxxxxxxxxxxxx</Col>
              <Col span={12}>座落地址：xxxxxxxxxxxxxxxxxxxxxxxx</Col>
              <Col span={12}>座落地址：xxxxxxxxxxxxxxxxxxxxxxxx</Col>
              <Col span={12}>座落地址：xxxxxxxxxxxxxxxxxxxxxxxx</Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
  back() {
    this.props.history.goBack();
  }
  listData(id: number) {
    id=this.props.match.params.id
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "building"
    });
  }
}
