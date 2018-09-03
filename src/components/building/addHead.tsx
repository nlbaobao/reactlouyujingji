import * as React from "react";
import { Modal, Form, Select, Input, Button, message } from "antd";
import {
  BuilldingItem,
  UserInfo
} from "../../interfaces/model";
import adminService from "../../services/admin";
import buildingService from "../../services/building";
import checkcode from "../../services/check-role";
interface Props {
  data?: BuilldingItem;
  afterClose?: () => void;
  onSuccess?: () => void;
  ids: number[];
}
interface State {
  visible: boolean;
  leader: number;
  leaderphone: string;
  rows: UserInfo[];
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
        title={this.props.data ? "编辑楼长" : "添加楼长"}
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
        <Form.Item label="楼长" {...formItemLayout}>
          <Select
            style={{ width: 200 }}
            value={this.state.leader ? this.state.leader.toString() : ""}
            onChange={(value: string) => {
              this.setState({
                leader: parseInt(value)
              });
            }}
          >
            {this.state.rows.map(item => {
              return (
                <Option
                  key={item.id}
                  value={item.id ? item.id.toString() : null}
                >
                  {`${item.nickName}（${item.name}）`}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="楼长联系方式" {...formItemLayout}>
          <Input
            placeholder="请输入楼长联系方式"
            value={this.state.leaderphone}
            onChange={event =>
              this.setState({
                leaderphone: event.target.value.trim()
              })
            }
          />
        </Form.Item>
      </Modal>
    );
  }

  state: State = {
    visible: true,
    leader: this.props.data ? this.props.data.manager.id : null,
    leaderphone: this.props.data ? this.props.data.manager_contact : "",
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
  //加载楼长
  async listData() {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await adminService.searchManagerRoleByUser();
      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 500);
      if (data.stat == "ok") {
        if (data.items.length > 0) {
          this.setState({
            rows: data.items
          });
        } else {
          return Modal.warn({
            title: "提示",
            content: "无可选楼长"
          });
        }
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
  async save() {
    if (!this.state.leader) {
      return Modal.warn({
        title: "提示",
        content: "楼长不能为空"
      });
    }
    if (!this.state.leaderphone) {
      return Modal.warn({
        title: "提示",
        content: "联系方式不能为空"
      });
    }

    try {
      let closeLoading = message.loading("正在设置");
      let opt = {
        buildingIds: this.props.ids,
        manager: Number(this.state.leader),
        manager_contact: this.state.leaderphone
      };
      let data = await buildingService.setBuildingManager(opt);

      if (data.stat == "ok") {
        setTimeout(() => {
          closeLoading();
          message.success("设置成功");
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
  componentDidMount() {
    this.listData();
  
  }
}
