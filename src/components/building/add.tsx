import * as React from "react";
import { Modal, Form, Select, Input, Button, message } from "antd";
import { BuilldingItem, Dept } from "../../interfaces/model";
import buildingService from "../../services/building";
import checkcode from "../../services/check-role";
interface Props {
  data?: BuilldingItem;
  afterClose?: () => void;
  onSuccess?: () => void;
  lng?: string;
  lat?: string;
}
interface State {
  visible: boolean;
  name: string;
  street: string;
  status: number;
  rows: Dept[];
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
    const Option = Select.Option;
    return (
      <Modal
        title={this.props.data ? "编辑楼宇信息" : "添加信息"}
        maskClosable={false}
        visible={this.state.visible}
        onCancel={this.close.bind(this)}
        afterClose={this.destroy.bind(this)}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={this.close.bind(this)}>
            取消
          </Button>,
          <Button type="primary" key="ok" onClick={this.save.bind(this)}>
            确定
          </Button>
        ]}
      >
        <Form.Item label="楼宇名称" {...formItemLayout}>
          <Input
            placeholder="楼宇名称"
            value={this.state.name}
            onChange={event =>
              this.setState({
                name: event.target.value.trim()
              })
            }
          />
        </Form.Item>
        <Form.Item label="所属街道" {...formItemLayout}>
          <Select
            value={this.state.street}
            style={{ width: 200 }}
            onChange={(value: string) => {
              this.setState({
                street: value
              });
            }}
          >
            {this.state.rows.map(item => {
              return (
                <Option
                  key={item.id}
                  value={item.id ? item.id.toString() : null}
                >
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="楼宇状态" {...formItemLayout}>
          <Select
            value={
              this.state.status !== null ? this.state.status.toString() : null
            }
            style={{ width: 100 }}
            onChange={(value: string) => {
              this.setState({
                status: parseInt(value)
              });
            }}
          >
            <Option value="0">已建成</Option>
            <Option value="1">未建成</Option>
          </Select>
        </Form.Item>
      </Modal>
    );
  }

  state: State = {
    visible: true,
    name: this.props.data ? this.props.data.name : "",
    status: this.props.data ? this.props.data.building_status : null,
    street: this.props.data
      ? this.props.data.src_streetDept.id.toString()
      : null,
    rows: []
  };

  destroy() {
    if (this.props.afterClose) {
      this.props.afterClose();
    }
  }

  close() {
    this.setState({
      visible: false
    });
  }

  async save() {
    if (!this.state.name) {
      return Modal.warn({
        title: "提示",
        content: "楼宇名称不能为空"
      });
    }
    if (!this.state.street) {
      return Modal.warn({
        title: "提示",
        content: "街道不能为空"
      });
    }
    if (this.state.status == null) {
      return Modal.warn({
        title: "提示",
        content: "楼宇状态不能为空"
      });
    }
    if (!this.props.data) {
      try {
        let opt = {
          name: this.state.name,
          // latitude: parseFloat(this.props.lat).toFixed(3),
          latitude: Number(this.props.lat),
          longitude: Number(this.props.lng),
          building_status: this.state.status,
          streetDId: parseInt(this.state.street)
        };
        let data = await buildingService.createSimpleBuilding(opt);

        if (data.stat == "ok") {
          setTimeout(() => {
            message.success("楼宇添加成功");
          }, 500);
        } else {
          checkcode.checkerrcode(data.stat);
        }
      } catch {
        Modal.error({
          title: "提示",
          content: "网络错误"
        });
      }
      this.close();
      if (this.props.onSuccess) {
        this.props.onSuccess();
      }
    } else {
      try {
        let opt = {
          buildingId: this.props.data.id,
          name: this.state.name,
          building_status: this.state.status,
          streetDId: parseInt(this.state.street)
        };
        let data = await buildingService.setSimpleBuilding(opt);

        if (data.stat == "ok") {
          setTimeout(() => {
            message.success("楼宇编辑成功");
          }, 500);
        } else {
          checkcode.checkerrcode(data.stat);
        }
      } catch {
        Modal.error({
          title: "提示",
          content: "网络错误"
        });
      }
      this.close();
      if (this.props.onSuccess) {
        this.props.onSuccess();
      }
    }
  }
  async listStreet() {
    try {
      let data = await buildingService.ListAllStreet();
      if (data.stat == "ok") {
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
  componentDidMount() {
    this.listStreet();
  }
}
