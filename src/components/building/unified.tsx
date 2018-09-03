import * as React from "react";
import { Modal, Form, Button, InputNumber } from "antd";
interface Props {
  afterClose?: () => void;
  onSuccess: (totalarea: number, businesearea: number) => void;
}
interface State {
  visible: boolean;
  totalarea: number;
  businesearea: number;
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
        title={"统一面积录入"}
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
        <Form.Item label="统一总面积(m²)" {...formItemLayout}>
          <InputNumber
            min={0}
            style={{ width: 200 }}
            onChange={(value: number) => {
              this.setState({
                totalarea: value
              });
            }}
            precision={2}
            placeholder="请输入统一总面积(m²)"
          />
        </Form.Item>
        <Form.Item label="统一商用面积" {...formItemLayout}>
          <InputNumber
            max={this.state.totalarea}
            style={{ width: 200 }}
            onChange={(value: number) => {
              this.setState({
                businesearea: value
              });
            }}
            precision={2}
            placeholder="请输入统一商用面积"
          />
        </Form.Item>
      </Modal>
    );
  }

  state: State = {
    visible: true,
    totalarea: null,
    businesearea: null
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
  save() {
    if (!this.state.totalarea) {
      return Modal.warn({
        title: "提示",
        content: "统一总面积不能为空"
      });
    }
    if (!this.state.businesearea) {
      return Modal.warn({
        title: "提示",
        content: "统一商用面积不能为空"
      });
    }

    this.close();
    if (this.props.onSuccess) {
      this.props.onSuccess(this.state.totalarea, this.state.businesearea);
    }
  }
}
