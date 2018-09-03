import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Form, Icon, Input, Button, Modal, message } from "antd";
import "./style.less";
import authService from "../../services/auth";
import checkRole from "../../services/check-role";

export default class extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div className="login-box">
        <Form.Item className="login-form-title">
          硚口区楼宇经济大数据平台
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="user" />}
            placeholder="请输入账号"
            value={this.state.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({
                name: event.target.value.trim()
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            prefix={<Icon type="lock" />}
            placeholder="请输入密码"
            value={this.state.pwd}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({
                pwd: event.target.value.trim()
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="login-form-button"
            disabled={this.disabled}
            onClick={this.login.bind(this)}
          >
            {this.loginText}
          </Button>
        </Form.Item>
      </div>
    );
  }

  state = {
    name: "",
    pwd: "",
    state: "waiting",
    token: ""
  };

  get disabled(): boolean {
    return (
      this.state.name === "" ||
      this.state.pwd === "" ||
      this.state.state === "processing"
    );
  }
  get loginText(): string {
    if (this.state.state === "processing") {
      return "正在登录";
    } else {
      return "登录";
    }
  }
  async CheckLogin() {
    try {
      let result = await authService.CheckLogin();
      if (result.stat == "ok") {
        this.props.history.push("/home");
      }
    } catch (error) {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }

  async login() {
    try {
      this.setState({
        state: "processing"
      });
      let result = await authService.login(this.state.name, this.state.pwd);
      this.setState({
        state: "waiting"
      });
      if (result.stat === "ok") {
        this.setState({
          token: result.token
        });
        this.props.history.push("/home");

        message.success("登录成功");
      } else {
        checkRole.checkerrcode(result.stat);
      }
    } catch (error) {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  componentDidMount() {
    this.CheckLogin();
  }
}
