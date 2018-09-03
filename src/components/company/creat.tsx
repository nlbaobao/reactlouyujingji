import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FloorInfo } from "../../interfaces/model";
import { Result } from "../../interfaces/response";
import buildingService from "../../services/building";
import companyService from "../../services/company";
import checkcode from "../../services/check-role";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  DatePicker,
  Radio,
  Modal
} from "antd";
import store from "../../store";
import moment from "moment";
import "./style.less";
import checkRole from "../../services/check-role";
interface Props {
  id: string;
  name: string;
  street: string;
}
interface State {
  datafrom: string;
  rows: FloorInfo[];
  changevalue: string;
  rowscompany: Result;
  floorId: number;
  name: string;
  occ: string;
  registered_capital: string;
  register_address: string;
  business_scope: string;
  employee_number: string;
  business_holdings: string;
  business_status: string;
  register_time: number;
  isRegister: string;
  isTaxes: string;
  operating_income: string;
  tax_amount: string;
  organization_type: string;
  isStorehouse: string;
  isNetwork: string;
  contract: string;
  contract_method: string;
  taxable: string;
  property_tyoe: string;
  industry_type: string;
  quit_status: string;
  floor_number: string;
  area: string;
  business_entry_time: number;
  isQuit: string;
  quit_time: number;
  method: string;
  isSetTaxUser: boolean;
  isname: string;
  isocc: string;
  isregistered_capital: string;
  isregister_address: string;
  isbusiness_scope: string;
  isemployee_number: string;
  isbusiness_holdings: string;
  isbusiness_status: string;
  isregister_time: moment.Moment;
  isisRegister: string;
  isisTaxes: string;
  isoperating_income: string;
  istax_amount: string;
  isorganization_type: string;
  isisStorehouse: string;
  isisNetwork: string;
  iscontract: string;
  iscontract_method: string;
  istaxable: string;
  isproperty_tyoe: string;
  isindustry_type: string;
  isfloor_number: string;
  isarea: string;
  isbusiness_entry_time: moment.Moment;
  isrent_expires: moment.Moment;
  isisQuit: string;
  isquit_time: moment.Moment;
  ismethod: string;
  entrytype: string;
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
          <Form.Item label="录入方式：">
            <Select
              value={this.state.entrytype}
              style={{ width: 180 }}
              onChange={(value: string) => {
                this.setState({
                  entrytype: value
                });
              }}
            >
              <Option value="0">统一信用代码录入</Option>
              <Option value="1">企业名称录入</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              mode="combobox"
              value={this.state.changevalue}
              style={{ width: 400 }}
              onChange={(value: string) => {
                this.handlechange(value);
              }}
              // onSelect={(value: string) => {
              //   this.select(value);
              // }}
            >
              {this.state.rowscompany.result
                ? this.state.rowscompany.result.map(item => {
                    return (
                      <Option value={item.name} key={item.occ}>
                        {item.name}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              disabled={this.state.changevalue == "" ? true : false}
              onClick={() => {
                this.select(this.state.changevalue);
              }}
            >
              搜索
            </Button>
          </Form.Item>
        </Form>
        <div className="creat-table">
          <ul className="table-left">
            <li className="creat-li">
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
                    <Option key={item.id} value={item.id.toString()}>
                      第{item.level}层
                    </Option>
                  );
                })}
              </Select>
            </li>
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
              <span className="creat-span">注册地址</span>{" "}
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
              <Input
                type="number"
                placeholder="请输入注册资本"
                style={{ width: 200 }}
                value={this.state.registered_capital}
                onChange={event => {
                  this.setState({
                    registered_capital: event.target.value.trim()
                  });
                }}
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
              <span className="creat-span">从业人员数（人）</span>
              <Input
                type="number"
                placeholder="请输入从业人员数"
                style={{ width: 200 }}
                value={this.state.employee_number}
                onChange={event => {
                  this.setState({
                    employee_number: event.target.value.trim()
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
                value={this.state.isregister_time}
                onChange={value => {
                  this.setState({
                    isregister_time: value
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
                placeholder="请输入联系方式"
                style={{ width: 200 }}
                value={this.state.contract_method}
                onChange={event => {
                  this.setState({
                    contract_method: event.target.value.trim()
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">产业划分</span>
              <Select
                value={this.state.property_tyoe}
                onChange={(value: string) => {
                  this.setState({
                    property_tyoe: value
                  });
                }}
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
                <Option value="U">其他</Option>
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
                value={this.props.match.params.street}
                disabled={true}
                onChange={event => {}}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">所在楼宇</span>
              <Input
                placeholder="请输入所在楼宇"
                value={this.props.match.params.name}
                style={{ width: 200 }}
                disabled={true}
                onChange={event => {}}
              />
            </li>
          </ul>
          <ul className="table-right">
            <li className="right-li">
              <span className="span-checkbox">是否在名录库</span>

              <RadioGroup
                value={this.state.isStorehouse}
                onChange={e => {
                  this.setState({
                    isStorehouse: e.target.value
                  });
                }}
              >
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </RadioGroup>
            </li>
            <li className="right-li">
              <span className="span-checkbox">是否为统计联网直报单位</span>
              <RadioGroup
                value={this.state.isNetwork}
                onChange={e => {
                  this.setState({
                    isNetwork: e.target.value
                  });
                }}
              >
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </RadioGroup>
            </li>
            <li className="right-li">
              <span className="span-checkbox">是否区内注册</span>
              <RadioGroup
                value={this.state.isRegister}
                onChange={e => {
                  this.setState({
                    isRegister: e.target.value
                  });
                }}
              >
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </RadioGroup>
            </li>
            <li className="right-li">
              <span className="span-checkbox">是否区内纳税</span>
              <RadioGroup
                value={this.state.isTaxes}
                onChange={e => {
                  this.setState({
                    isTaxes: e.target.value
                  });
                }}
              >
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
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
              <span className="span-checkbox">营业收入(万元)</span>
              <Input
                type="number"
                placeholder="请输入营业收入"
                value={this.state.operating_income}
                onChange={event => {
                  this.setState({
                    operating_income: event.target.value.trim()
                  });
                }}
                style={{ width: 200 }}
              />
            </li>

            <li className="right-li">
              <span className="span-checkbox">年纳税额(万元)</span>
              {this.state.tax_amount === null ? (
                <Input
                  type="number"
                  placeholder="请输入年纳税额"
                  style={{ width: 200 }}
                  value={this.state.tax_amount}
                  onChange={event => {
                    this.setState({
                      tax_amount: event.target.value.trim()
                    });
                  }}
                />
              ) : (
                <Input
                  placeholder="**********"
                  disabled
                  style={{ width: 200 }}
                  onChange={() => {}}
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
                value={this.state.method}
                onChange={(value: string) => {
                  this.setState({
                    method: value
                  });
                }}
                style={{ width: 150 }}
              >
                <Option value="Rented">租赁</Option>
                <Option value="Sold">购买</Option>
              </Select>
            </li>
            {this.state.method === "Rented" ? (
              <li className="right-li">
                <span className="span-checkbox">租约期限</span>
                <DatePicker
                  style={{ width: 200 }}
                  value={this.state.isrent_expires}
                  onChange={value => {
                    this.setState({
                      isrent_expires: value
                    });
                  }}
                />
              </li>
            ) : null}
            <li className="right-li">
              <span className="span-checkbox">数据来源</span>
              <Input
                style={{ width: 200 }}
                disabled={true}
                value={this.state.datafrom}
                onChange={() => {}}
              />
            </li>
            <li className="right-li">
              <span className="span-checkbox">面积（平方米）</span>
              <Input
                type="number"
                placeholder="请输入面积"
                style={{ width: 200 }}
                value={this.state.area}
                onChange={event => {
                  this.setState({
                    area: event.target.value.trim()
                  });
                }}
              />
            </li>
            <li className="right-li">
              <span className="span-checkbox">企业入驻时间</span>
              <DatePicker
                style={{ width: 200 }}
                value={this.state.isbusiness_entry_time}
                onChange={value => {
                  this.setState({
                    isbusiness_entry_time: value
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
                  value={this.state.isquit_time}
                  onChange={value => {
                    this.setState({
                      isquit_time: value
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
    entrytype: "1",
    changevalue: "",
    rowscompany: {},
    datafrom: "",
    rows: [],
    floorId: null,
    name: "",
    occ: "",
    registered_capital: "",
    register_address: "",
    business_scope: "",
    employee_number: "",
    business_holdings: "",
    quit_status: "",
    business_status: "",
    register_time: null,
    isRegister: "",
    isTaxes: "",
    operating_income: "",
    tax_amount: null,
    organization_type: "",
    isStorehouse: "",
    isNetwork: "",
    contract: "",
    contract_method: "",
    taxable: "",
    property_tyoe: "",
    industry_type: "",
    floor_number: "",
    area: null,
    business_entry_time: null,
    isQuit: "否",
    quit_time: null,
    method: "",
    isSetTaxUser: false,
    isname: "",
    isocc: "",
    isregistered_capital: "",
    isregister_address: "",
    isbusiness_scope: "",
    isemployee_number: "",
    isbusiness_holdings: "",
    isbusiness_status: "",
    isregister_time: null,
    isisRegister: "",
    isisTaxes: "",
    isoperating_income: "",
    istax_amount: "",
    isorganization_type: "",
    isisStorehouse: "",
    isisNetwork: "",
    iscontract: "",
    iscontract_method: "",
    istaxable: "",
    isproperty_tyoe: "",
    isindustry_type: "",
    isfloor_number: "",
    isarea: "",
    isbusiness_entry_time: null,
    isrent_expires: null,
    isisQuit: "",
    isquit_time: null,
    ismethod: ""
  };

  handlechange(value: string) {
    this.setState(
      {
        changevalue: value
      },
      () => {
        if (this.state.entrytype == "1" && this.state.changevalue !== "") {
          this.search();
        }
      }
    );
  }

  async select(value: string) {
    this.setState({
      rowscompany: {},
      datafrom: "",
      name: "",
      occ: "",
      registered_capital: "",
      register_address: "",
      business_scope: "",
      employee_number: "",
      business_holdings: "",
      business_status: "",
      register_time: null,
      isRegister: "",
      isTaxes: "",
      operating_income: "",
      tax_amount: null,
      organization_type: "",
      isStorehouse: "",
      isNetwork: "",
      contract: "",
      contract_method: "",
      taxable: "",
      property_tyoe: "",
      industry_type: "",
      floor_number: "",
      area: null,
      business_entry_time: null,
      isQuit: "否",
      quit_time: null,
      method: "",
      isSetTaxUser: false,
      isname: "",
      isocc: "",
      isregistered_capital: "",
      isregister_address: "",
      isbusiness_scope: "",
      isemployee_number: "",
      isbusiness_holdings: "",
      isbusiness_status: "",
      isregister_time: null,
      isisRegister: "",
      isisTaxes: "",
      isoperating_income: "",
      istax_amount: "",
      isorganization_type: "",
      isisStorehouse: "",
      isisNetwork: "",
      iscontract: "",
      iscontract_method: "",
      istaxable: "",
      isproperty_tyoe: "",
      isindustry_type: "",
      isfloor_number: "",
      isarea: "",
      isbusiness_entry_time: null,
      isisQuit: "",
      isquit_time: null,
      ismethod: ""
    });
    try {
      let closeLoading = message.loading("正在查询企业数据");
      let data = await companyService.occCompany(value, this.state.entrytype);
      if (data.stat == "ok") {
        setTimeout(() => {
          closeLoading();
          message.success("企业数据查询成功");
        }, 300);
        let cols: Result = JSON.parse(data.item);
        if (cols.result.length > 0) {
          console.log(cols.result[0]);
          this.setState({
            datafrom: data.data_source,
            name: cols.result[0].name,
            occ: cols.result[0].occ,
            registered_capital: cols.result[0].registered_capital,
            register_address: cols.result[0].register_address,
            business_scope: cols.result[0].business_scope,
            employee_number: cols.result[0].employee_number,
            business_holdings: cols.result[0].business_holdings,
            business_status: cols.result[0].business_status,
            isregister_time:
              cols.result[0].register_time == null
                ? null
                : moment(cols.result[0].register_time),
            isRegister: cols.result[0].isRegister,
            isTaxes: cols.result[0].isTaxes,
            operating_income: cols.result[0].operating_income,
            tax_amount: cols.result[0].tax_amount,
            // organization_type: cols.result[0].organization_type,
            isStorehouse: cols.result[0].isStorehouse,
            isNetwork: cols.result[0].isNetwork,
            contract: cols.result[0].contract,
            contract_method: cols.result[0].contract_method,
            // taxable: cols.result[0].taxable,
            // property_tyoe: cols.result[0].property_tyoe,
            industry_type: checkRole.optionindustrytype(
              cols.result[0].industry_type
            ),
            floor_number: cols.result[0].floor_number,
            area: cols.result[0].area,
            isbusiness_entry_time:
              cols.result[0].business_entry_time == null
                ? null
                : moment(cols.result[0].register_time),
            isQuit: cols.result[0].isQuit,
            isquit_time:
              cols.result[0].quit_time == null
                ? null
                : moment(cols.result[0].quit_time),
            method: cols.result[0].method,
            isSetTaxUser: cols.result[0].tax_amount === null ? true : false
          });
        } else {
          return Modal.warn({
            title: "提示",
            content: "没有任何企业信息"
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
  timeout: any = null;
  search() {
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(async () => {
      try {
        let data = await companyService.occCompany(
          this.state.changevalue,
          this.state.entrytype
        );
        if (data.stat == "ok") {
          let cols: Result = JSON.parse(data.item);

          this.setState({
            rowscompany: cols || {}
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
    }, 300);
  }

  async getFloor() {
    try {
      let data = await buildingService.searchSimpleFloorByBuilding(
        parseInt(this.props.match.params.id),
        "asc",
        "level"
      );
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
  async save() {
    if (!this.state.floorId) {
      return Modal.warn({
        title: "提示",
        content: "请选择楼层"
      });
    }
    if (!this.state.name) {
      return Modal.warn({
        title: "提示",
        content: "请输入企业名称"
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
    if (!this.state.employee_number) {
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

    if (!this.state.isregister_time) {
      return Modal.warn({
        title: "提示",
        content: "请选择注册变更时间"
      });
    }

    if (!this.state.contract) {
      return Modal.warn({
        title: "提示",
        content: "请输入企业联系人"
      });
    }
    if (!this.state.contract_method) {
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
    if (this.state.isStorehouse == "是" || this.state.isStorehouse == "否") {
    } else {
      return Modal.warn({
        title: "提示",
        content: "请选择是否在名录库"
      });
    }
    if (!this.state.isTaxes) {
      return Modal.warn({
        title: "提示",
        content: "请选择是否纳税"
      });
    }
    if (!this.state.isNetwork) {
      return Modal.warn({
        title: "提示",
        content: "请选择是否为统计联网直报单位"
      });
    }
    if (!this.state.isRegister) {
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
    if (!this.state.property_tyoe) {
      return Modal.warn({
        title: "提示",
        content: "请选择产业划分"
      });
    }
    if (!this.state.operating_income) {
      return Modal.warn({
        title: "提示",
        content: "请填写营业收入"
      });
    }
    if (!this.state.tax_amount) {
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
    if (this.state.method) {
      if (this.state.method === "Rented") {
        if (!this.state.isrent_expires) {
          return Modal.warn({
            title: "提示",
            content: "请选择租约期限"
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

    if (!this.state.isbusiness_entry_time) {
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
      if (!this.state.isquit_time) {
        return Modal.warn({
          title: "提示",
          content: "请输入企业意向迁出时间"
        });
      }
    }
    if (this.state.isQuit == "否") {
      this.state.isquit_time = moment(0);
    }
    try {
      let closeLoading = message.loading("企业创建中");
      let opt = {
        floorId: this.state.floorId,
        name: this.state.name,
        occ: this.state.occ,
        data_source: this.state.datafrom,
        registered_capital: parseInt(
          Number(this.state.registered_capital) * 100 + ""
        ),
        register_address: this.state.register_address,
        business_scope: this.state.business_scope,
        employee_number: parseInt(this.state.employee_number),
        business_holdings: this.state.business_holdings,
        quit_status: this.state.quit_status,
        business_status: this.state.business_status,
        register_time: parseInt(this.state.isregister_time.format("X")),
        isRegister: this.state.isRegister == "是" ? true : false,
        isTaxes: this.state.isTaxes == "是" ? true : false,
        operating_income: parseInt(
          Number(this.state.operating_income) * 100 + ""
        ),
        tax_amount: parseInt(Number(this.state.tax_amount) * 100 + ""),
        organization_type: this.state.organization_type,
        isStorehouse: this.state.isStorehouse == "是" ? true : false,
        isNetwork: this.state.isNetwork == "是" ? true : false,
        contract: this.state.contract,
        contact_method: this.state.contract_method,
        taxable: this.state.taxable,
        property_type: this.state.property_tyoe,
        industry_type: this.state.industry_type,
        floor_number: this.state.floor_number,
        area: parseInt(Number(this.state.area) * 100 + ""),
        business_entry_time: parseInt(
          this.state.isbusiness_entry_time.format("X")
        ),
        rent_expires:
          this.state.method === "Rented"
            ? parseInt(this.state.isrent_expires.format("X"))
            : 0,
        isQuit: this.state.isQuit,
        quit_time: parseInt(this.state.isquit_time.format("X")),
        method: this.state.method,
        isSetTaxUser: this.state.tax_amount == null ? true : false
      };
      let data = await companyService.creatCompany(opt);
      if (data.stat == "ok") {
        setTimeout(() => {
          closeLoading();
          message.success("企业创建成功");
        }, 200);
        this.props.history.push(`/home/company`);
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
  goback() {
    this.props.history.goBack();
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "company"
    });
    this.getFloor();
  }
}
