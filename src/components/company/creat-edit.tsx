import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FloorInfo, Role, UserInfo } from "../../interfaces/model";
import checkcode from "../../services/check-role";
import { Unsubscribe } from "redux";
import companyService from "../../services/company";
import moment from "moment";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  DatePicker,
  Radio,
  Modal,
  InputNumber
} from "antd";
import store from "../../store";
import "./style.less";
import checkRole from "../../services/check-role";
interface Props {
  id: string;
  buildingid: string;
}
interface State {
  user: UserInfo;
  datafrom: string;
  rows: FloorInfo[];
  roles: Role[];
  quit_status: string;
  name: string;
  occ: string;
  buildingname: string;
  street: string;
  companyId: number;
  registered_capital: number;
  register_address: string;
  business_scope: string;
  employee_number: number;
  business_holdings: string;
  business_status: string;
  register_time: moment.Moment;
  isRegister: boolean;
  isTaxes: boolean;
  operating_income: number;
  rent_expires: moment.Moment;
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
  business_entry_time: moment.Moment;
  isQuit: string;
  quit_time: moment.Moment;
  status: number;
  method: string;
  formtime: moment.Moment;
  flag: boolean;
  entry_method: number;
  set_tax_user: UserInfo;
  disabled: boolean;
}
export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    const Option = Select.Option;
    const RadioGroup = Radio.Group;
    return (
      <div className="creat-wrap">
        <Form layout="inline" className="building-form">
          <Form.Item>
            <Button onClick={this.goback.bind(this)}>返回上一层</Button>
          </Form.Item>
        </Form>
        <div className="creat-table">
          <ul className="table-left">
            {/* <li className="creat-li">
              <span className="creat-span">楼层</span>
              <Select
                value={
                  this.state.floorId
                    ? this.state.floorId.toString()
                    : "请选择楼层..."
                }
                onChange={(value: string) => {
                  this.setState({
                    floorId: parseInt(value)
                  });
                }}
                style={{ width: 200 }}
              >
                {this.state.rows.map(item => {
                  return (
                    <Option value={item.id.toString()}>第{item.level}层</Option>
                  );
                })}
              </Select>
            </li> */}
            <li className="creat-li">
              <span className="creat-span">企业名称</span>
              <Input
                placeholder="请输入企业名称"
                style={{ width: 300 }}
                value={this.state.name}
                onChange={event => {
                  this.setState({
                    name: event.target.value.trim()
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">注册地址</span>
              <Input
                placeholder="请输入注册地址"
                style={{ width: 200 }}
                value={this.state.register_address}
                onChange={event => {
                  this.setState({
                    register_address: event.target.value.trim()
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">注册资本(万元)</span>
              <InputNumber
                min={0}
                placeholder="请输入注册资本"
                style={{ width: 200 }}
                value={this.state.registered_capital}
                onChange={(value: number) => {
                  this.setState({
                    registered_capital: value
                  });
                }}
                precision={2}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">经营范围</span>
              <Input
                placeholder="请输入经营范围"
                style={{ width: 200 }}
                value={this.state.business_scope}
                onChange={event => {
                  this.setState({
                    business_scope: event.target.value.trim()
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">从业人员数</span>
              <InputNumber
                placeholder="请输入从业人员数"
                min={0}
                style={{ width: 200 }}
                value={this.state.employee_number}
                onChange={(value: number) => {
                  this.setState({
                    employee_number: value
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">企业控股情况</span>

              <Select
                value={this.state.business_holdings}
                onChange={(value: string) => {
                  this.setState({
                    business_holdings: value
                  });
                }}
                style={{ width: 200 }}
              >
                <Option value="1">国有控股</Option>
                <Option value="2">集体控股</Option>
                <Option value="3">私人控股</Option>
                <Option value="4">港澳台商控股</Option>
                <Option value="5">外商控股</Option>
                <Option value="9">其他</Option>
              </Select>
            </li>
            <li className="creat-li">
              <span className="creat-span">企业营业状态</span>
              <Select
                value={this.state.business_status}
                onChange={(value: string) => {
                  this.setState({
                    business_status: value
                  });
                }}
                style={{ width: 200 }}
              >
                <Option value="1">营业</Option>
                <Option value="2">停业(歇业)</Option>
                <Option value="3">筹建</Option>
                <Option value="4">当年关闭</Option>
                <Option value="5">当年破产</Option>
                <Option value="9">其他</Option>
              </Select>
            </li>
            <li className="creat-li">
              <span className="creat-span">注册变更时间</span>
              <DatePicker
                style={{ width: 200 }}
                value={this.state.register_time}
                onChange={value => {
                  this.setState({
                    register_time: value
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">企业联系人</span>
              <Input
                placeholder="请输入企业联系人"
                style={{ width: 200 }}
                value={this.state.contract}
                onChange={event => {
                  this.setState({
                    contract: event.target.value.trim()
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">联系方式</span>
              <Input
                placeholder="请输入企业营业状态"
                style={{ width: 200 }}
                value={this.state.contact_method}
                onChange={event => {
                  this.setState({
                    contact_method: event.target.value.trim()
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">行业划分</span>
              <Select
                value={this.state.industry_type}
                onChange={(value: string) => {
                  this.setState({
                    industry_type: value
                  });
                }}
                style={{ width: 150 }}
              >
                <Option value="A">农业</Option>
                <Option value="B">工业</Option>
                <Option value="C">建筑业</Option>
                <Option value="D">运输邮电业</Option>
                <Option value="E">批发和零售业</Option>
                <Option value="F">其他零售业</Option>
                <Option value="S">住宿和餐饮业</Option>
                <Option value="X">房地产业</Option>
                <Option value="U">其他组织机构</Option>
              </Select>
            </li>
            <li className="creat-li">
              <span className="creat-span">机构类型</span>
              <Select
                value={this.state.organization_type}
                onChange={(value: string) => {
                  this.setState({
                    organization_type: value
                  });
                }}
                style={{ width: 150 }}
              >
                <Option value="10">企业</Option>
                <Option value="20">事业单位</Option>
                <Option value="30">机关</Option>
                <Option value="40">事业团体</Option>
                <Option value="52">基金会</Option>
                <Option value="53">居委会</Option>
                <Option value="54">村委会</Option>
                <Option value="55">分支机构</Option>
                <Option value="56">办事处</Option>
                <Option value="90">其他组织机构</Option>
              </Select>
            </li>
            <li className="creat-li">
              <span className="creat-span">所属街道</span>
              <Input
                placeholder="请输入所属街道"
                style={{ width: 200 }}
                value={this.state.street}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">所在楼宇</span>
              <Input
                placeholder="请输入所在楼宇"
                value={this.state.buildingname}
                style={{ width: 200 }}
              />
            </li>
            {/* <li className="creat-li">
              <span className="creat-span">数据更新时间</span>
              <DatePicker style={{ width: 200 }} />
            </li> */}
          </ul>
          <ul className="table-right">
            <li className="right-li">
              <span className="span-checkbox">是否在名录库</span>
              <RadioGroup
                value={this.state.isStorehouse ? "1" : "0"}
                onChange={e => {
                  if (e.target.value == "1") {
                    this.setState({
                      isStorehouse: true
                    });
                  } else {
                    this.setState({
                      isStorehouse: false
                    });
                  }
                }}
              >
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </RadioGroup>
            </li>
            <li className="right-li">
              <span className="span-checkbox">是否为统计联网直报单位</span>
              <RadioGroup
                value={this.state.isNetwork ? "1" : "0"}
                onChange={e => {
                  if (e.target.value == "1") {
                    this.setState({
                      isNetwork: true
                    });
                  } else {
                    this.setState({
                      isNetwork: false
                    });
                  }
                }}
              >
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </RadioGroup>
            </li>
            <li className="right-li">
              <span className="span-checkbox">是否区内注册</span>
              <RadioGroup
                value={this.state.isRegister ? "1" : "0"}
                onChange={e => {
                  if (e.target.value == "1") {
                    this.setState({
                      isRegister: true
                    });
                  } else {
                    this.setState({
                      isRegister: false
                    });
                  }
                }}
              >
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </RadioGroup>
            </li>
            <li className="right-li">
              <span className="span-checkbox">是否区内纳税</span>
              <RadioGroup
                value={this.state.isTaxes ? "1" : "0"}
                onChange={e => {
                  if (e.target.value == "1") {
                    this.setState({
                      isTaxes: true
                    });
                  } else {
                    this.setState({
                      isTaxes: false
                    });
                  }
                }}
              >
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </RadioGroup>
            </li>
            <li className="right-li">
              <span className="span-checkbox">纳税地</span>
              <Select
                value={this.state.taxable}
                style={{ width: 200 }}
                onChange={(value: string) => {
                  this.setState({
                    taxable: value
                  });
                }}
              >
                <Option value="1">江岸区</Option>
                <Option value="2">江汉区</Option>
                <Option value="3">硚口区</Option>
                <Option value="4">汉阳区</Option>
                <Option value="5">武昌区</Option>
                <Option value="6">洪山区</Option>
                <Option value="7">青山区</Option>
                <Option value="8">东西湖区</Option>
                <Option value="9">蔡甸区</Option>
                <Option value="10">江夏区</Option>
                <Option value="11">黄陂区</Option>
                <Option value="12">新洲区</Option>
                <Option value="13">汉南区</Option>
                <Option value="14">其它</Option>
              </Select>
            </li>
            <li className="right-li">
              <span className="span-checkbox">产业划分</span>
              <Select
                onChange={(value: string) => {
                  this.setState({
                    property_type: value
                  });
                }}
                value={this.state.property_type}
                style={{ width: 200 }}
              >
                <Option value="2">工业服务业</Option>
                <Option value="3">商贸业</Option>
                <Option value="4">健康医疗产业</Option>
                <Option value="0">金融业</Option>
                <Option value="5">互联网产业</Option>
                <Option value="1">其他</Option>
              </Select>
            </li>
            <li className="right-li">
              <span className="span-checkbox">营业收入(万元)</span>
              <InputNumber
                min={0}
                placeholder="请输入营业收入"
                value={this.state.operating_income}
                onChange={(value: number) => {
                  this.setState({
                    operating_income: value
                  });
                }}
                style={{ width: 200 }}
                precision={2}
              />
            </li>
            <li className="right-li">
              <span className="span-checkbox">年纳税额（万元）</span>
              {checkRole.check(
                ["streetCheckTaxAmountRole"],
                this.state.roles
              ) ? (
                <InputNumber
                  placeholder="请输入年纳税额"
                  value={this.state.tax_amount as number}
                  disabled={this.state.disabled}
                  min={0}
                  onChange={(value: number) => {
                    this.setState({
                      tax_amount: value
                    });
                  }}
                  style={{ width: 200 }}
                  precision={2}
                />
              ) : (
                <InputNumber
                  placeholder="*******"
                  disabled
                  onChange={(value: number) => {}}
                  style={{ width: 200 }}
                />
              )}
            </li>
            <li className="right-li">
              <span className="span-checkbox">房号</span>
              <Input
                placeholder="请输入房号"
                value={this.state.floor_number}
                onChange={event => {
                  this.setState({
                    floor_number: event.target.value.trim()
                  });
                }}
                style={{ width: 200 }}
              />
            </li>
            <li className="right-li">
              <span className="span-checkbox">租售方式</span>
              <Select
                value={
                  this.state.entry_method !== null
                    ? this.state.entry_method.toString()
                    : null
                }
                onChange={(value: string) => {
                  this.setState({
                    entry_method: parseInt(value)
                  });
                }}
                style={{ width: 150 }}
              >
                <Option value="0">租赁</Option>
                <Option value="1">购买</Option>
              </Select>
            </li>
            {this.state.entry_method === 1 ? null : (
              <li className="right-li">
                <span className="span-checkbox">租约期限</span>
                <DatePicker
                  style={{ width: 200 }}
                  value={this.state.rent_expires}
                  onChange={value => {
                    this.setState({
                      rent_expires: value
                    });
                  }}
                />
              </li>
            )}

            <li className="right-li">
              <span className="span-checkbox">数据来源</span>
              <Input
                style={{ width: 200 }}
                value={this.state.datafrom}
                disabled={true}
              />
            </li>
            <li className="right-li">
              <span className="span-checkbox">面积(m²)</span>
              <InputNumber
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
            </li>
            <li className="right-li">
              <span className="span-checkbox">企业入驻时间</span>
              <DatePicker
                style={{ width: 200 }}
                disabled={true}
                value={this.state.business_entry_time}
                onChange={value => {
                  this.setState({
                    business_entry_time: value
                  });
                }}
              />
            </li>
            <li className="right-li">
              <span className="span-checkbox">是否有意向迁出</span>
              <Select
                value={this.state.isQuit}
                onChange={(value: string) => {
                  this.setState({
                    isQuit: value
                  });
                }}
                style={{ width: 150 }}
              >
                <Option value="是">是</Option>
                <Option value="否">否</Option>
              </Select>
            </li>
            {this.state.isQuit == "是" ? (
              <li className="right-li">
                <span className="span-checkbox">企业意向迁出时间</span>
                <DatePicker
                  style={{ width: 200 }}
                  value={this.state.quit_time}
                  onChange={value => {
                    this.setState({
                      quit_time: value
                    });
                  }}
                />
              </li>
            ) : null}
            {this.state.isQuit == "是" ? (
              <li className="right-li">
                <span className="span-checkbox">企业迁出状态</span>
                <Select
                  value={this.state.quit_status}
                  onChange={(value: string) => {
                    this.setState({
                      quit_status: value
                    });
                  }}
                  style={{ width: 150 }}
                >
                  <Option value="A">未签约</Option>
                  <Option value="B">已签约</Option>
                </Select>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="bottom-button">
          <Form layout="inline">
            <Form.Item>
              <Button type="primary" onClick={this.save.bind(this)}>
                确定
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  state: State = {
    user: {},
    disabled: true,
    roles: [],
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
    tax_amount: null as number,
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
    datafrom: "",
    business_entry_time: null,
    isQuit: "",
    quit_time: null,
    rent_expires: null,
    status: null,
    method: "",
    formtime: moment(),
    flag: false,
    entry_method: null,
    buildingname: "",
    street: "",
    set_tax_user: {}
  };

  async listData(id: string) {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await companyService.getCompanyInfo(
        parseInt(this.props.match.params.id)
      );
      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 200);
      if (data.stat == "ok") {
        this.setState({
          companyId: data.item.id,
          name: data.item.name,
          occ: data.item.occ,
          registered_capital: data.item.registered_capital / 100,
          register_address: data.item.register_address,
          business_scope: data.item.business_scope,
          employee_number: data.item.employee_number,
          business_holdings: data.item.business_holdings,
          business_status: data.item.business_status,
          register_time: moment(data.item.register_time * 1000),
          isRegister: data.item.isRegister,
          isTaxes: data.item.isTaxes,
          datafrom: data.item.data_source,
          operating_income: data.item.operating_income / 100,
          tax_amount:
            (data.item.tax_amount as string).indexOf("*") > -1
              ? -1
              : parseInt(data.item.tax_amount as string) / 100,
          organization_type: data.item.organization_type,
          isStorehouse: data.item.isStorehouse,
          isNetwork: data.item.isNetwork,
          contract: data.item.contract,
          contact_method: data.item.contact_method,
          taxable: data.item.taxable,
          property_type: data.item.property_type,
          industry_type: checkcode.optionindustrytype(data.item.industry_type),
          floor_number: data.item.floor_number,
          area: data.item.area / 100,
          business_entry_time: moment(data.item.business_entry_time * 1000),
          isQuit: data.item.isQuit,
          quit_status: data.item.quit_status,
          quit_time: moment(data.item.quit_time * 1000),
          rent_expires:
            data.item.rent_expires == 0
              ? null
              : moment(data.item.rent_expires * 1000),
          status: data.item.status,
          entry_method: data.item.entry_method,
          buildingname: data.item.srcBuilding.name,
          street: data.item.srcStreet.name,
          set_tax_user: data.item.set_tax_user
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

  // async getFloor() {
  //   try {
  //     let data = await buildingService.searchSimpleFloorByBuilding(
  //       parseInt(this.props.match.params.buildingid)
  //     );
  //     if (data.stat == "ok") {
  //       this.setState({
  //         rows: data.items
  //       });
  //     }
  //   } catch {
  //     Modal.error({
  //       title: "提示",
  //       content: "网络错误"
  //     });
  //   }
  // }
  async save() {
    if (!this.state.occ) {
      return Modal.warn({
        title: "提示",
        content: "请输入组织机构代码"
      });
    }
    if (!this.state.name) {
      return Modal.warn({
        title: "提示",
        content: "请输入企业名称"
      });
    }
    if (this.state.registered_capital == null) {
      return Modal.warn({
        title: "提示",
        content: "请输入注册资本"
      });
    }
    if (!this.state.register_address) {
      return Modal.warn({
        title: "提示",
        content: "请输入注册地址"
      });
    }
    if (!this.state.business_scope) {
      return Modal.warn({
        title: "提示",
        content: "请选择经营范围"
      });
    }
    if (this.state.employee_number == null) {
      return Modal.warn({
        title: "提示",
        content: "请输入从业人员数"
      });
    }
    if (!this.state.business_holdings) {
      return Modal.warn({
        title: "提示",
        content: "请选择企业控股情况"
      });
    }
    if (!this.state.business_status) {
      return Modal.warn({
        title: "提示",
        content: "请选择企业营业状态"
      });
    }

    if (!this.state.register_time) {
      return Modal.warn({
        title: "提示",
        content: "请选择注册变更时间"
      });
    }

    if (!this.state.business_scope) {
      return Modal.warn({
        title: "提示",
        content: "请选择经营范围"
      });
    }
    if (!this.state.contract) {
      return Modal.warn({
        title: "提示",
        content: "请输入企业联系人"
      });
    }
    if (!this.state.contact_method) {
      return Modal.warn({
        title: "提示",
        content: "请输入企业联系方式"
      });
    }
    if (!this.state.industry_type) {
      return Modal.warn({
        title: "提示",
        content: "请选择行业划分"
      });
    }
    if (!this.state.organization_type) {
      return Modal.warn({
        title: "提示",
        content: "请选择机构类型"
      });
    }
    if (this.state.isStorehouse == null) {
      return Modal.warn({
        title: "提示",
        content: "请选择是否在名录库"
      });
    }
    if (this.state.isTaxes == null) {
      return Modal.warn({
        title: "提示",
        content: "请选择是否纳税"
      });
    }
    if (this.state.isNetwork == null) {
      return Modal.warn({
        title: "提示",
        content: "请选择是否为统计联网直报单位"
      });
    }
    if (this.state.isRegister == null) {
      return Modal.warn({
        title: "提示",
        content: "请选择是否区内注册"
      });
    }
    if (!this.state.taxable) {
      return Modal.warn({
        title: "提示",
        content: "请选择纳税地"
      });
    }
    if (!this.state.property_type) {
      return Modal.warn({
        title: "提示",
        content: "请选择产业划分"
      });
    }
    if (this.state.operating_income === null) {
      return Modal.warn({
        title: "提示",
        content: "请填写营业收入"
      });
    }
    if ((this.state.tax_amount as number) === null) {
      return Modal.warn({
        title: "提示",
        content: "请填写年纳税额"
      });
    }
    if (!this.state.floor_number) {
      return Modal.warn({
        title: "提示",
        content: "请输入房号"
      });
    }
    if (this.state.entry_method.toString()) {
      if (this.state.entry_method.toString() === "0") {
        if (!this.state.rent_expires) {
          return Modal.warn({
            title: "提示",
            content: "请选择租约时间"
          });
        }
      }
    } else {
      return Modal.warn({
        title: "提示",
        content: "请选择租售方式"
      });
    }

    if (!this.state.area) {
      return Modal.warn({
        title: "提示",
        content: "请输入面积"
      });
    }

    if (!this.state.business_entry_time) {
      return Modal.warn({
        title: "提示",
        content: "请输入企业入驻时间"
      });
    }
    if (!this.state.isQuit) {
      return Modal.warn({
        title: "提示",
        content: "请选择是否有意向迁出"
      });
    }
    if (this.state.isQuit == "是") {
      if (!this.state.quit_time) {
        return Modal.warn({
          title: "提示",
          content: "请输入企业意向迁出时间"
        });
      }
      if (!this.state.quit_status) {
        return Modal.warn({
          title: "提示",
          content: "请选择企业迁出状态"
        });
      }
    }
    if (this.state.isQuit == "否") {
      this.state.quit_time = moment(0);
      this.state.quit_status = "";
    }
    try {
      let opt = {
        companyId: parseInt(this.props.match.params.id),
        name: this.state.name,
        occ: this.state.occ,
        registered_capital: parseInt(this.state.registered_capital * 100 + ""),
        register_address: this.state.register_address,
        business_scope: this.state.business_scope,
        employee_number: this.state.employee_number,
        business_holdings: this.state.business_holdings,
        business_status: this.state.business_status,
        register_time: parseInt(this.state.register_time.format("X")),
        isRegister: this.state.isRegister,
        isTaxes: this.state.isTaxes,
        quit_status: this.state.quit_status,
        operating_income: parseInt(this.state.operating_income * 100 + ""),
        tax_amount: parseInt((this.state.tax_amount as number) * 100 + ""),
        organization_type: this.state.organization_type,
        isStorehouse: this.state.isStorehouse,
        isNetwork: this.state.isNetwork,
        rent_expires:
          this.state.entry_method.toString() === "1"
            ? 0
            : parseInt(this.state.rent_expires.format("X")),
        contract: this.state.contract,
        contact_method: this.state.contact_method,
        taxable: this.state.taxable,
        property_type: this.state.property_type,
        industry_type: this.state.industry_type,
        floor_number: this.state.floor_number,
        data_source: this.state.datafrom,
        area: parseInt(this.state.area * 100 + ""),
        business_entry_time: parseInt(
          this.state.business_entry_time.format("X")
        ),
        isQuit: this.state.isQuit,
        quit_time: parseInt(this.state.quit_time.format("X")),
        method: this.state.entry_method.toString() == "1" ? "Sold" : "Rented",
        isSetTaxUser: false
      };
      let data = null;
      if (this.props.match.path === "/home/company/creat/:id") {
        Modal.confirm({
          title: "提示",
          content: `确定要更改企业信息吗？`,
          onOk: async () => {
            data = await companyService.updateCompanyInfo(opt);
            if (data.stat == "ok") {
              setTimeout(() => {
                message.success("企业更正成功");
              }, 500);
              this.props.history.push(`/home/company`);
            } else {
              checkcode.checkerrcode(data.stat);
            }
          }
        });
      } else {
        data = await companyService.setCompanyInfo(opt);
        if (data.stat == "ok") {
          setTimeout(() => {
            message.success("企业更新成功");
          }, 500);
          this.props.history.push(`/home/company`);
        } else {
          checkcode.checkerrcode(data.stat);
        }
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  goback() {
    this.props.history.goBack();
  }
  unsub: Unsubscribe;
  componentWillMount() {
    this.unsub = store.subscribe(() => {
      let roles = store.getState().user.src_roles;
      if (roles !== undefined) {
        this.setState(
          {
            roles: store.getState().user.src_roles || [],
            user: store.getState().user
          },
          () => {
            this.checkTax(this.state.roles, this.state.user);
          }
        );
      }
    });
  }
  checkTax(type: Role[], user: UserInfo) {
    if (checkRole.check(["streetCheckTaxAmountRole"], type)) {
      if (this.state.set_tax_user === null) {
        this.setState({
          disabled: false
        });
      } else if (this.state.set_tax_user.name === user.name) {
        this.setState({
          disabled: true
        });
      }
    } else {
      this.setState({
        disabled: false
      });
    }
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "company"
    });
    // this.getFloor();
    this.listData(this.props.match.params.id);
  }
}
