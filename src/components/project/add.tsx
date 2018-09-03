import * as React from "react";
import {
  Modal,
  Form,
  Select,
  Input,
  Button,
  message,
  Row,
  Col,
  InputNumber
} from "antd";
import { BuilldingItem } from "../../interfaces/model";
import checkcode from "../../services/check-role";
import store from "../../store";
import projectService from "../../services/project";
import buildingService from "../../services/building";
import { RouteComponentProps } from "react-router";
import { FormComponentProps } from "antd/lib/form";
import { CreatProjectRequest } from "../../interfaces/request";

interface UserFormProps extends FormComponentProps {
  age: number;
  name: string;
}
interface Props {
  id: string;
}
interface State {
  rows: BuilldingItem[];
  projectId: number;
  name: string;
  tracking_unit: string;
  tracking_staff: string;
  tracking_contact: string;
  property_type: string;
  method: string;
  area: number;
  type: string;
  business_scale: string;
  informant_sources: string;
  src_buildingId: number;
  project_status: string;
}

export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
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
      <div>
        <Button style={{ marginBottom: 30 }} onClick={this.back.bind(this)}>
          返回上一层
        </Button>
        <Row>
          <Col offset={4} span={8}>
            <Row>
              <Col span={24}>
                <Form.Item label="项目名称" {...formItemLayout}>
                  <Input
                    style={{ width: 200 }}
                    placeholder="请输入项目名称"
                    value={this.state.name}
                    onChange={event => {
                      this.setState({
                        name: event.target.value.trim()
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="跟踪单位" {...formItemLayout}>
                  <Input
                    style={{ width: 200 }}
                    placeholder="跟踪单位"
                    value={this.state.tracking_unit}
                    onChange={event => {
                      this.setState({
                        tracking_unit: event.target.value.trim()
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="跟踪人员" {...formItemLayout}>
                  <Input
                    style={{ width: 200 }}
                    placeholder="跟踪人员"
                    value={this.state.tracking_staff}
                    onChange={event => {
                      this.setState({
                        tracking_staff: event.target.value.trim()
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="跟踪人联系方式:" {...formItemLayout}>
                  <Input
                    style={{ width: 200 }}
                    placeholder="跟踪人联系方式"
                    value={this.state.tracking_contact}
                    onChange={event => {
                      this.setState({
                        tracking_contact: event.target.value.trim()
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="产业划分" {...formItemLayout}>
                  <Select
                    value={this.state.property_type}
                    style={{ width: 200 }}
                    onChange={(value: string) => {
                      this.setState({
                        property_type: value
                      });
                    }}
                  >
                    <Option value="">请选择产业划分...</Option>
                    <Option value="2">工业</Option>
                    <Option value="3">建筑业</Option>
                    <Option value="4">房地产业</Option>
                    <Option value="0">商贸业</Option>
                    <Option value="1">服务业</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="租售意向" {...formItemLayout}>
                  <Select
                    value={this.state.method}
                    style={{ width: 200 }}
                    onChange={(value: string) => {
                      this.setState({
                        method: value
                      });
                    }}
                  >
                    <Option value="">请选择租售意向...</Option>
                    <Option value="1">租赁</Option>
                    <Option value="2">购买</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24}>
                <Form.Item label="意向楼宇" {...formItemLayout}>
                  <Select
                    value={
                      this.state.src_buildingId
                        ? this.state.src_buildingId.toString()
                        : null
                    }
                    onChange={(value: string) => {
                      this.setState({
                        src_buildingId: parseInt(value)
                      });
                    }}
                    style={{ width: 200 }}
                  >
                    <Option value = {"-1"}>
                         请选择意向楼宇...
                        </Option>
                    {this.state.rows.map(item => {
                      return (
                        <Option key={item.id} value={item.id.toString()}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="意向面积" {...formItemLayout}>
                  <InputNumber
                  placeholder = "请输入意向面积"
                    min={1}
                    style={{ width: 200 }}
                    value={this.state.area}
                    onChange={(value: number) => {
                      this.setState({
                        area: value
                      });
                    }}
                    precision={2}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="项目类型" {...formItemLayout}>
                  <Select
                    style={{ width: 200 }}
                    value={this.state.type}
                    onChange={(value: string) => {
                      this.setState({
                        type: value
                      });
                    }}
                  >
                    <Option value="">请选择项目类型...</Option>
                    <Option value="1">市内新注册</Option>
                    <Option value="2">市内迁转</Option>
                    <Option value="3">市内仅办公</Option>
                    <Option value="4">市外新注册</Option>
                    <Option value="5">市外迁转</Option>
                    <Option value="6">市外仅办公</Option>
                    <Option value="7">境外新注册</Option>
                    <Option value="8">境外迁转</Option>
                    <Option value="9">境外仅办公</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="企业规模" {...formItemLayout}>
                  <Select
                    style={{ width: 200 }}
                    value={this.state.business_scale}
                    onChange={(value: string) => {
                      this.setState({
                        business_scale: value
                      });
                    }}
                  >
                     <Option value="">请选择企业规模...</Option>
                    <Option value="1">1-19人</Option>
                    <Option value="2">20-99人</Option>
                    <Option value="3">100-299人 </Option>
                    <Option value="4">300-499人</Option>
                    <Option value="5"> 500-999人</Option>
                    <Option value="6">>1000人</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="信息来源" {...formItemLayout}>
                  <Select
                    style={{ width: 200 }}
                    value={this.state.informant_sources}
                    onChange={(value: string) => {
                      this.setState({
                        informant_sources: value
                      });
                    }}
                  >
                    <Option value="">请选择信息来源...</Option>
                    <Option value="1">招商引资项目</Option>
                    <Option value="2">物业方招商</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="项目状态" {...formItemLayout}>
                  <Select
                    style={{ width: 200 }}
                    value={this.state.project_status}
                    onChange={(value: string) => {
                      this.setState({
                        project_status: value
                      });
                    }}
                  >
                    <Option value="">请选择项目状态...</Option>
                    <Option value="1">再谈</Option>
                    <Option value="2">已落户</Option>
                    <Option value="3">未落户</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="bottom-button">
          <Button type="primary" onClick={this.save.bind(this)}>
            提交
          </Button>
        </div>
      </div>
    );
  }
  state: State = {
    rows: [],
    projectId: null,
    name: "",
    tracking_unit: "",
    tracking_staff: "",
    tracking_contact: "",
    property_type: "",
    method: "",
    area: null,
    type: "",
    business_scale: "",
    informant_sources: "",
    src_buildingId: -1,
    project_status: ""
  };

  async save() {
    if (!this.state.name) {
      return Modal.warn({
        title: "提示",
        content: "项目名称不能为空"
      });
    }
    if (!this.state.tracking_unit) {
      return Modal.warn({
        title: "提示",
        content: "跟踪单位不能为空"
      });
    }
    if (!this.state.tracking_staff) {
      return Modal.warn({
        title: "提示",
        content: "跟踪人员不能为空"
      });
    }
    if (!this.state.tracking_contact) {
      return Modal.warn({
        title: "提示",
        content: "跟踪人员联系方式不能为空+"
      });
    }
    if (!this.state.tracking_contact) {
      return Modal.warn({
        title: "提示",
        content: "跟踪人员联系方式不能为空+"
      });
    }
    if (!this.state.tracking_contact) {
      return Modal.warn({
        title: "提示",
        content: "跟踪人员联系方式不能为空+"
      });
    }
    if (!this.state.tracking_contact) {
      return Modal.warn({
        title: "提示",
        content: "跟踪人员联系方式不能为空+"
      });
    }
    if (!this.state.property_type) {
      return Modal.warn({
        title: "提示",
        content: "产业划分不能为空"
      });
    }
    if (!this.state.method) {
      return Modal.warn({
        title: "提示",
        content: "请选择租售意向"
      });
    }
    if (this.state.src_buildingId === -1) {
      return Modal.warn({
        title: "提示",
        content: "请选择意向楼宇"
      });
    }
    if (this.state.area === null) {
      return Modal.warn({
        title: "提示",
        content: "意向面积不能为空"
      });
    }
    if (!this.state.type) {
      return Modal.warn({
        title: "提示",
        content: "请选择项目类型"
      });
    }
    if (!this.state.business_scale) {
      return Modal.warn({
        title: "提示",
        content: "请选择企业规模"
      });
    }
    if (!this.state.informant_sources) {
      return Modal.warn({
        title: "提示",
        content: "请选择信息来源"
      });
    }
    if (!this.state.project_status) {
      return Modal.warn({
        title: "提示",
        content: "请选择项目状态"
      });
    }
    let opt: CreatProjectRequest = {
      projectId: this.props.match.params.id
        ? parseInt(this.props.match.params.id)
        : null,
      name: this.state.name,
      tracking_unit: this.state.tracking_unit,
      tracking_staff: this.state.tracking_staff,
      tracking_contact: this.state.tracking_contact,
      property_type: this.state.property_type,
      method: this.state.method,
      area: parseInt(this.state.area * 100 + ""),
      type: this.state.type,
      business_scale: this.state.business_scale,
      informant_sources: this.state.informant_sources,
      src_buildingId: this.state.src_buildingId,
      project_status: this.state.project_status
    };
    if (!this.props.match.params.id) {
      // 增新模式
      try {
        let closeLoading = message.loading("数据加载中");
        let data = await projectService.CreateProject(opt);

        if (data.stat == "ok") {
          setTimeout(() => {
            closeLoading();
            message.success("数据加载成功");
          }, 200);
          this.props.history.push(`/home/project`);
        } else {
          checkcode.checkerrcode(data.stat);
        }
      } catch {
        Modal.error({
          title: "提示",
          content: "网络错误"
        });
      }
    } else {
      try {
        let closeLoading = message.loading("正在编辑...");
        let data = await projectService.SetProject(opt);

        if (data.stat == "ok") {
          setTimeout(() => {
            closeLoading();
            message.success("编辑成功");
          }, 200);
          this.props.history.push(`/home/project`);
        } else {
          checkcode.checkerrcode(data.stat);
        }
      } catch {
        Modal.error({
          title: "提示",
          content: "网络错误"
        });
      }

      this.setState({});
    }
  }
  async listData() {
    try {
      let data = await projectService.GetProject(
        parseInt(this.props.match.params.id)
      );
      if (data.stat == "ok") {
        this.setState({
          projectId: parseInt(this.props.match.params.id),
          name: data.item.name,
          tracking_unit: data.item.tracking_unit,
          tracking_staff: data.item.tracking_staff,
          tracking_contact: data.item.tracking_contact,
          property_type: data.item.property_type,
          method: data.item.method,
          area: data.item.area / 100,
          type: data.item.type,
          business_scale: data.item.business_scale,
          informant_sources: data.item.informant_sources,
          src_buildingId: data.item.building.id,
          project_status: data.item.project_status
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
  async listBuilding() {
    try {
      let closeLoading = message.loading("数据加载中");
      let opt = {
        type: "All"
      };
      let data = await buildingService.searchBuilding(opt);
      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 200);
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
  back() {
    this.props.history.goBack();
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "project"
    });
    if (this.props.match.params.id) {
      this.listData();
    }
    this.listBuilding();
  }
}
