import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AdviceInfo } from "../../interfaces/model";

import cheecktype from "../../services/check-role";
import companyService from "../../services/company";
import { ColumnProps } from "antd/lib/table";
import moment from "moment";
import { Button, Form, Table, message, Modal } from "antd";
import checkcode from "../../services/check-role";
import store from "../../store";
import "./style.less";

interface Props {
  id: string;
}
interface State {
  rows?: AdviceInfo[];
  name: string;
  occ: string;
  companyId: number;
  registered_capital: number;
  register_address: string;
  business_scope: string;
  employee_number: number;
  buildingname: string;
  quit_status: string;
  street: string;
  business_holdings: string;
  business_status: string;
  register_time: number;
  isRegister: boolean;
  isTaxes: boolean;
  operating_income: number;
  tax_amount: string | number;
  organization_type: string;
  isStorehouse: boolean;
  isNetwork: boolean;
  contract: string;
  contact_method: string;
  taxable: string;
  property_type: string;
  industry_type: string;
  floor_number: string;
  area: number;
  business_entry_time: number;
  isQuit: string;
  quit_time: moment.Moment;
  status: number;
  method: string;
  entry_method: number;
  retime: moment.Moment;
  entime: moment.Moment;
  rent_expires: moment.Moment;
}
export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.back.bind(this)}>
          返回上一层
        </Button>
        <div className="company-detail-wrap">
          <h1 className="title" style={{ marginBottom: 30 }}>
            {this.state.name}
          </h1>
          <table className="projecttable">
            <tbody>
              <tr>
                <td className="td1">企业名称：</td>
                <td className="td2">{this.state.name}</td>
                <td className="td1">所在楼宇：</td>
                <td className="td2">{this.state.buildingname}</td>
              </tr>
              <tr>
                <td className="td1">组织机构代码：</td>
                <td className="td2">{this.state.occ}</td>
                <td className="td1">是否区内纳税：</td>
                <td className="td2">{checkcode.ischeck(this.state.isTaxes)}</td>
              </tr>
              <tr>
                <td className="td1">注册资本(万元)：</td>
                <td className="td2">
                  {this.state.registered_capital !== null
                    ? (this.state.registered_capital / 100).toFixed(2)
                    : null}
                </td>
                <td className="td1">是否为统计联网直报单位：</td>
                <td className="td2">
                  {" "}
                  {checkcode.ischeck(this.state.isNetwork)}
                </td>
              </tr>
              <tr>
                <td className="td1">企业联系人：</td>
                <td className="td2">{this.state.contract}</td>
                <td className="td1">是否在名录库：</td>
                <td className="td2">
                  {checkcode.ischeck(this.state.isStorehouse)}
                </td>
              </tr>
              <tr>
                <td className="td1">注册地址：</td>
                <td className="td2">{this.state.register_address}</td>
                <td className="td1">是否区内注册：</td>
                <td className="td2">
                  {checkcode.ischeck(this.state.isRegister)}
                </td>
              </tr>
              <tr>
                <td className="td1">经营范围：</td>
                <td className="td2">{this.state.business_scope}</td>
                <td className="td1">纳税地：</td>
                <td className="td2">
                  {checkcode.checktaxable(this.state.taxable)}
                </td>
              </tr>
              <tr>
                <td className="td1">企业控股情况：</td>
                <td className="td2">
                  {cheecktype.businessholdings(this.state.business_holdings)}
                </td>
                <td className="td1">产业划分：</td>
                <td className="td2">
                  {cheecktype.checkpropertytype(this.state.property_type)}
                </td>
              </tr>
              <tr>
                <td className="td1">企业营业状态：</td>
                <td className="td2"> {this.state.contact_method}</td>
                <td className="td1">营业收入(万元)：</td>
                <td className="td2">
                  {this.state.operating_income === null
                    ? null
                    : (this.state.operating_income / 100).toString()}
                </td>
              </tr>
              <tr>
                <td className="td1">注册变更时间：</td>
                <td className="td2">
                  {this.state.retime == null
                    ? null
                    : this.state.retime.format("YYYY-MM-DD")}
                </td>
                <td className="td1">年纳税额(万元)：</td>
                <td className="td2">
                  {(this.state.tax_amount as string).indexOf("*") > -1
                    ? "******"
                    : parseInt(this.state.tax_amount as string) / 100}
                </td>
              </tr>
              <tr>
                <td className="td1">从业人员数：</td>
                <td className="td2">{this.state.employee_number}</td>
                <td className="td1">房号：</td>
                <td className="td2">{this.state.floor_number}</td>
              </tr>

              <tr>
                <td className="td1">联系方式：</td>
                <td className="td2">{this.state.contact_method}</td>
                <td className="td1">面积（m²）：</td>
                <td className="td2">
                  {this.state.area ? (this.state.area / 100).toString() : null}
                </td>
              </tr>
              <tr>
                <td className="td1">行业划分：</td>
                <td className="td2">
                  {cheecktype.checkindustrytype(this.state.industry_type)}
                </td>
                <td className="td1">企业入驻时间：</td>
                <td className="td2">
                  {this.state.entime == null
                    ? null
                    : this.state.entime.format("YYYY-MM-DD")}
                </td>
              </tr>
              <tr>
                <td className="td1">机构类型：</td>
                <td className="td2">
                  {cheecktype.checkorganizationtype(
                    this.state.organization_type
                  )}
                </td>
                <td className="td1">是否有意向迁出：</td>
                <td className="td2">{this.state.isQuit}</td>
              </tr>
              <tr>
                <td className="td1">租售方式：</td>
                <td className="td2">
                  {this.state.entry_method == 0 ? "租赁" : "购买"}
                </td>
                <td className="td1">企业意向迁出时间：</td>
                <td className="td2">
                  {this.state.quit_time == null
                    ? null
                    : this.state.quit_time.format("YYYY-MM-DD")}
                </td>
              </tr>
              <tr>
                <td className="td1">租约期限：</td>
                <td className="td2">
                  {this.state.rent_expires == null
                    ? null
                    : this.state.rent_expires.format("YYYY-MM-DD")}
                </td>
                <td className="td1">企业迁出状态</td>
                <td className="td2">
                  {checkcode.quitestatus(this.state.quit_status)}
                </td>
              </tr>
              <tr>
                <td className="td1">所属街道：</td>
                <td className="td2"> {this.state.street}</td>
                <td className="td1" />
                <td className="td2" />
              </tr>
            </tbody>
          </table>
          <div className="bottom-button">
            <Form layout="inline">
              <Form.Item>
                <Button type="primary">查看网络数据</Button>
              </Form.Item>
            </Form>
          </div>
          <Table
            pagination={false}
            dataSource={this.state.rows}
            columns={this.columns}
            style={{ marginTop: 30 }}
          />
        </div>
      </div>
    );
  }
  columns: ColumnProps<AdviceInfo>[] = [
    {
      title: "投诉时间",
      width: "20%",
      dataIndex: "time",
      render: (text, record) => {
        return moment(record.time).format("YYYY-MM-DD hh:mm:ss");
      }
    },
    {
      title: "投诉内容",
      dataIndex: "content",
      width: "70%"
    },
    {
      title: "投诉处理",
      dataIndex: "result",
      width: "10%"
    }
  ];
  back() {
    this.props.history.goBack();
  }
  state: State = {
    quit_status: "",
    rows: [],
    companyId: null,
    name: "",
    occ: "",
    registered_capital: null,
    register_address: "",
    business_scope: "",
    employee_number: null,
    business_holdings: "",
    business_status: "",
    register_time: null,
    isRegister: null,
    isTaxes: null,
    operating_income: null,
    tax_amount: "",
    organization_type: "",
    isStorehouse: null,
    isNetwork: null,
    contract: "",
    contact_method: "",
    taxable: "",
    property_type: "",
    industry_type: "",
    floor_number: "",
    area: null,
    business_entry_time: null,
    isQuit: null,
    quit_time: null,
    status: null,
    method: "",
    entry_method: null,
    buildingname: "",
    street: "",
    retime: null,
    entime: null,
    rent_expires: null
  };
  async listData(id: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let data =
        this.props.match.path == "/home/company/detail/:id"
          ? await companyService.getCompanyInfo(
              parseInt(this.props.match.params.id)
            )
          : await companyService.getHistoryCompanyInfo(
              parseInt(this.props.match.params.id)
            );

      if (data.stat == "ok") {
        setTimeout(() => {
          closeLoading();
          message.success("数据加载成功");
        }, 200);
        this.setState(
          {
            companyId: data.item.id,
            name: data.item.name,
            occ: data.item.occ,
            registered_capital: data.item.registered_capital,
            register_address: data.item.register_address,
            business_scope: data.item.business_scope,
            employee_number: data.item.employee_number,
            business_holdings: data.item.business_holdings,
            business_status: data.item.business_status,
            retime: moment(data.item.register_time * 1000),
            isRegister: data.item.isRegister,
            isTaxes: data.item.isTaxes,
            operating_income: data.item.operating_income,
            tax_amount: data.item.tax_amount,
            organization_type: data.item.organization_type,
            isStorehouse: data.item.isStorehouse,
            isNetwork: data.item.isNetwork,
            contract: data.item.contract,
            contact_method: data.item.contact_method,
            taxable: data.item.taxable,
            property_type: data.item.property_type,
            industry_type: data.item.industry_type,
            floor_number: data.item.floor_number,
            area: data.item.area,
            entime: moment(data.item.business_entry_time * 1000),
            isQuit: data.item.isQuit,
            quit_time:
              data.item.quit_time == 0
                ? null
                : moment(data.item.quit_time * 1000),
            rent_expires:
              data.item.rent_expires == 0
                ? null
                : moment(data.item.rent_expires * 1000),
            status: data.item.status,
            quit_status: data.item.quit_status,
            entry_method: data.item.entry_method,
            buildingname: data.item.srcBuilding.name,
            street: data.item.srcStreet.name
          },
          () => {
            this.listAdvice();
          }
        );
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
  async listAdvice() {
    try {
      let data = await companyService.getAdvice(this.state.occ);

      if (data.stat == "ok") {
        setTimeout(() => {
          message.success("投诉与建议加载成功");
        }, 200);
        this.setState({
          rows: JSON.parse(data.item.d)
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
    store.dispatch({
      type: "SET_MENU",
      menu: "company"
    });
    this.listData(parseInt(this.props.match.params.id));
  }
}
