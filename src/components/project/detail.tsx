import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Table,
  Button,
  Menu,
  Form,
  Row,
  Col,
  Dropdown,
  Select,
  Icon,
  Input,
  message,
  Modal
} from "antd";
import store from "../../store";
import loaderService from "../../services/loader";
import "./style.less";
import projectService from "../../services/project";
import checktype from "../../services/check-role";
import { Z_FILTERED } from "zlib";
import checkRole from "../../services/check-role";
interface Props {
  id: string;
}
interface State {
  projectId: number;
  name: string;
  tracking_unit: string;
  tracking_staff: string;
  tracking_contact: string;
  property_type: string;
  method: string;
  ctime: number;
  area: number;
  type: string;
  business_scale: string;
  informant_sources: string;
  src_buildingId: number;
  project_status: string;
  buildingname: string;
}
export default class extends React.Component<RouteComponentProps<Props>> {
  render() {
    return (
      <div>
        <Button onClick={this.back.bind(this)}>返回上一层</Button>
        <h1 className="project-title">{this.state.name}详细信息</h1>
        <div className="detail-wrap">
          <table className="projecttable">
            <tbody>
              <tr>
                <td className="td1">项目名称：</td>
                <td className="td2">{this.state.name}</td>
                <td className="td1">意向楼宇：</td>
                <td className="td2">{this.state.buildingname}</td>
              </tr>
              <tr>
                <td className="td1">跟踪单位：</td>
                <td className="td2">{this.state.tracking_unit}</td>
                <td className="td1">意向面积：</td>
                <td className="td2">{this.state.area}</td>
              </tr>
              <tr>
                <td className="td1">跟踪人员 ：</td>
                <td className="td2">{this.state.tracking_staff}</td>
                <td className="td1"> 项目类型：</td>
                <td className="td2">
                  {checktype.projectType(this.state.type)}
                </td>
              </tr>
              <tr>
                <td className="td1"> 跟踪人联系方式：</td>
                <td className="td2">{this.state.tracking_contact}</td>
                <td className="td1">
                  {" "}
                  <Col span={24}>企业规模：</Col>
                </td>
                <td className="td2">
                  {checktype.businesScale(this.state.business_scale)}
                </td>
              </tr>
              <tr>
                <td className="td1"> 产业类型：</td>
                <td className="td2">
                  {checktype.checkpropertytype(this.state.property_type)}
                </td>
                <td className="td1"> 信息来源：</td>
                <td className="td2">
                  {this.state.informant_sources ? "招商引资项目" : "物业方招商"}
                </td>
              </tr>
              <tr>
                <td className="td1"> 租售意向：</td>
                <td className="td2">
                  {this.state.method == "1" ? "租赁" : "购买"}
                </td>
                <td className="td1"> 状态：</td>
                <td className="td2">
                  {checktype.projcectStatus(this.state.project_status)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  back() {
    this.props.history.goBack();
  }
  state: State = {
    projectId: null,
    name: "",
    tracking_unit: "",
    tracking_staff: "",
    tracking_contact: "",
    property_type: "",
    method: "",
    ctime: null,
    area: null,
    type: "",
    business_scale: "",
    informant_sources: "",
    src_buildingId: null,
    project_status: "",
    buildingname: ""
  };
  async listData() {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await projectService.GetProject(
        parseInt(this.props.match.params.id)
      );
      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 200);
      if (data.stat == "ok") {
        this.setState({
          projectId: parseInt(this.props.match.params.id),
          name: data.item.name,
          tracking_unit: data.item.tracking_unit,
          tracking_staff: data.item.tracking_staff,
          tracking_contact: data.item.tracking_contact,
          property_type: data.item.property_type,
          method: data.item.method,
          ctime: data.item.ctime,
          area: data.item.area,
          type: data.item.type,
          business_scale: data.item.business_scale,
          informant_sources: data.item.informant_sources,
          src_buildingId: data.item.building.id,
          project_status: data.item.project_status,
          buildingname: data.item.building.name
        });
      }
      else{
        checkRole.checkerrcode(data.stat)
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }

    this.setState({});
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "building"
    });
    this.listData();
  }
}
