import * as React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import buildingservice from "../../services/building";
import { BuilldingItem } from "../../interfaces/model";
import checkRole from "../../services/check-role";
interface Props {
  lng: number;
  lat: number;
  afterClose?: () => void;
  successLook?: () => void;
  id: string;
}

interface State {
  visible: boolean;
  lng: number;
  lat: number;
  row: BuilldingItem;
}

export default class extends React.Component<Props, State> {
  render() {
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
    return (
      <Modal
        title="楼宇详细信息"
        maskClosable={false}
        visible={this.state.visible}
        onCancel={this.close.bind(this)}
        afterClose={this.destroy.bind(this)}
        destroyOnClose={true}
        footer={
          <div>
            <Button type="primary" key="ok" onClick={this.close.bind(this)}>
              确定
            </Button>
            <Button type="primary" onClick={this.seedetail.bind(this)}>
              查看详情
            </Button>
          </div>
        }
      >
        <Form.Item label="空置率" {...formItemLayout}>
          {this.state.row.name}
        </Form.Item>
        <Form.Item label="纳税在地率" {...formItemLayout}>
          {this.state.row.name}
        </Form.Item>
        <Form.Item label="注册在地率" {...formItemLayout}>
          {this.state.row.name}
        </Form.Item>
      </Modal>
    );
  }

  state: State = {
    visible: true,
    lng: this.props.lng,
    lat: this.props.lat,
    row: {}
  };

  destroy() {
    if (this.props.afterClose) {
      this.props.afterClose();
    }
  }
  seedetail() {
    if (this.props.successLook) {
      //判断这个方法是不是存在
      this.props.successLook();
    }
  }
  close() {
    this.setState({
      visible: false
    });
  }
  async listData() {
    try {
      let data = await buildingservice.getBuilding(parseInt(this.props.id));
      if (data.stat === "ok") {
        this.setState({
          row: data.building
        });
      } else {
     checkRole.checkerrcode(data.stat)
      }
    } catch (error) {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  componentDidMount() {
    this.listData();
  }
}
