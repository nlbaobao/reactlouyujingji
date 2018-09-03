import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Button,
  Form,
  Select,
  Input,
  Modal,
  DatePicker,
  InputNumber,
  Row,
  Col
} from "antd";
import { BuilldingItem, Dept } from "../../interfaces/model";
import buildingService from "../../services/building";
import moment from "moment";
import "./style.less";
import checkRole from "../../services/check-role";
interface State {
  keyword: string;
  start_registered_capital: number;
  end_registered_capital: number;
  start_employee_number: number;
  end_employee_number: number;
  business_status: string;
  isRegister: string;
  isTaxes: string;
  start_operating_income: number;
  end_operating_income: number;
  start_tax_amount: number;
  end_tax_amount: number;
  src_streetId: number;
  isStorehouse: string;
  isNetwork: string;
  taxable: string;
  property_type: string;
  industry_type: string;
  src_buildingId: number;
  start_area: number;
  end_area: number;
  start_business_entry_time: number;
  end_business_entry_time: number;
  isQuit: string;
  status: number;
  estime: moment.Moment;
  entime: moment.Moment;
  rowsbuilding: BuilldingItem[];
  rowsstreet: Dept[];
}
export default class extends React.Component<RouteComponentProps<State>> {
  render() {
    const Option = Select.Option;
    return (
      <div>
        <Form.Item>
          <Button type="primary" onClick={this.goback.bind(this)}>
            返回上一层
          </Button>
        </Form.Item>
        <Form layout="inline">
          <Row>
            <Col offset={2} style={{ marginBottom: 30 }} span={22}>
              <Row>
                <Col span={8}>
                  <Form.Item label="企业名称：">
                    <Input
                      placeholder="请输入企业名称"
                      value={this.state.keyword}
                      style={{ width: 200 }}
                      onChange={event => {
                        this.setState({
                          keyword: event.target.value.trim()
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="注册资本（万元）：">
                    <InputNumber
                      placeholder="请输入起始注册资本"
                      min={0}
                      value={this.state.start_registered_capital}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_registered_capital: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                     placeholder="请输入注册资本"
                      min={this.state.start_registered_capital}
                      value={this.state.end_registered_capital}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          end_registered_capital: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="从业人员数（人）：">
                    <InputNumber
                     placeholder="请输入起始从业人员数"
                      min={0}
                      value={this.state.start_employee_number}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_employee_number: value
                        });
                      }}
                      precision={0}
                    />
                  </Form.Item>
                  <Form.Item>-</Form.Item>
                  <Form.Item>
                    <InputNumber
                       placeholder="请输入从业人员数："
                      min={this.state.start_employee_number}
                      value={this.state.end_employee_number}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          end_employee_number: value
                        });
                      }}
                      precision={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={2} style={{ marginBottom: 30 }} span={22}>
              <Row>
                <Col span={8}>
                  <Form.Item label="营业收入（万元）:">
                    <InputNumber
                      placeholder="请输入起始营业收入"
                      min={0}
                      value={this.state.start_operating_income}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_operating_income: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入营业收入"
                      min={this.state.start_operating_income}
                      value={this.state.end_operating_income}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          end_operating_income: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="年纳税额（万元）">
                    <InputNumber
                      placeholder="请输入起始年纳税额"
                      min={0}
                      value={this.state.start_tax_amount}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_tax_amount: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入年纳税额"
                      min={this.state.start_tax_amount}
                      value={this.state.end_tax_amount}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          end_tax_amount: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="面积（m²）">
                    <InputNumber
                      placeholder="请输入起始面积"
                      min={0}
                      value={this.state.start_area}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_area: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入面积"
                      min={this.state.start_area}
                      value={this.state.end_area}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          end_area: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={2} style={{ marginBottom: 30 }} span={22}>
              <Row>
                <Col span={8}>
                  <Form.Item label="企业入驻时间">
                    <DatePicker
                      style={{ width: 130 }}
                      onChange={value => {
                        this.setState({
                          estime: value
                        });
                      }}
                      value={this.state.estime}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <DatePicker
                      style={{ width: 130 }}
                      onChange={value => {
                        this.setState({
                          entime: value
                        });
                      }}
                      value={this.state.entime}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="企业经营状态：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.business_status}
                      onChange={(value: string) => {
                        this.setState({
                          business_status: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="1">营业</Option>
                      <Option value="2">停业(歇业)</Option>
                      <Option value="3">筹建</Option>
                      <Option value="4">当年关闭</Option>
                      <Option value="5">当年破产</Option>
                      <Option value="9">其他</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="是否区内注册：">
                    <Select
                      style={{ width: 150 }}
                      value={this.state.isRegister}
                      onChange={(value: string) => {
                        this.setState({
                          isRegister: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="true">是</Option>
                      <Option value="false">否</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={2} style={{ marginBottom: 30 }} span={22}>
              <Row>
                <Col span={8}>
                  <Form.Item label="是否区内纳税：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.isTaxes}
                      onChange={(value: string) => {
                        this.setState({
                          isTaxes: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="true">是</Option>
                      <Option value="false">否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="是否为统计联网直报单位：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.isNetwork}
                      onChange={(value: string) => {
                        this.setState({
                          isNetwork: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="true">是</Option>
                      <Option value="false">否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="是否在名录库：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.isStorehouse}
                      onChange={(value: string) => {
                        this.setState({
                          isStorehouse: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="true">是</Option>
                      <Option value="false">否</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={2} style={{ marginBottom: 30 }} span={22}>
              <Row>
                <Col span={6}>
                  <Form.Item label="所属街道：">
                    <Select
                      value={
                        this.state.src_streetId == null
                          ? "-1"
                          : this.state.src_streetId.toString()
                      }
                      style={{ width: 200 }}
                      onChange={(value: string) => {
                        this.setState({
                          src_streetId: parseInt(value)
                        });
                      }}
                    >
                      <Option value="-1">请选择...</Option>
                      {this.state.rowsstreet.map(item => {
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
                </Col>
                <Col span={6}>
                  <Form.Item label="所属楼宇：">
                    <Select
                      value={
                        this.state.src_buildingId == null
                          ? "-1"
                          : this.state.src_buildingId.toString()
                      }
                      onChange={(value: string) => {
                        this.setState({
                          src_buildingId: parseInt(value)
                        });
                      }}
                      style={{ width: 200 }}
                    >
                      <Option value="-1">请选择...</Option>
                      {this.state.rowsbuilding.map(item => {
                        return (
                          <Option key={item.id} value={item.id.toString()}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="纳税地：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.taxable}
                      onChange={(value: string) => {
                        this.setState({
                          taxable: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="1">江岸区</Option>
                      <Option value="jianghandistrict">江汉区</Option>
                      <Option value="qiaokoudistrict">硚口区</Option>
                      <Option value="hanyangdistrict">汉阳区</Option>
                      <Option value="wuchangdistrict">武昌区</Option>
                      <Option value="hongshandistrict">洪山区</Option>
                      <Option value="qingshandistrict">青山区</Option>
                      <Option value="dxdistrict">东西湖区</Option>
                      <Option value="caidiandistrict">蔡甸区</Option>
                      <Option value="jiagdistrict">江夏区</Option>
                      <Option value="huangpidistrict">黄陂区</Option>
                      <Option value="xinzhoudistrict">新洲区</Option>
                      <Option value="hannandistrict">汉南区</Option>
                      <Option value="qitadistrict">其它</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="产业划分：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.property_type}
                      onChange={(value: string) => {
                        this.setState({
                          property_type: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="2">工业</Option>
                      <Option value="3">建筑业</Option>
                      <Option value="4">房地产业</Option>
                      <Option value="0">商贸业</Option>
                      <Option value="1">服务业</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={2} style={{ marginBottom: 30 }} span={22}>
              <Row>
                <Col span={6}>
                  <Form.Item label="行业划分：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.industry_type}
                      onChange={(value: string) => {
                        this.setState({
                          industry_type: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="A">农业</Option>
                      <Option value="B">工业</Option>
                      <Option value="C">建筑业</Option>
                      <Option value="D">运输邮电业</Option>
                      <Option value="E">批发和零售业</Option>
                      <Option value="F">其他零售业</Option>
                      <Option value="S">住宿和餐饮业</Option>
                      <Option value="X">房地产业</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="是否有意向迁出：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.isQuit}
                      onChange={(value: string) => {
                        this.setState({
                          isQuit: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="是">是</Option>
                      <Option value="否">否</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item label="租售方式：">
                    <Select
                      style={{ width: 200 }}
                      value={
                        this.state.status == null
                          ? "-1"
                          : this.state.status.toString()
                      }
                      onChange={(value: string) => {
                        this.setState({
                          status: parseInt(value)
                        });
                      }}
                    >
                      <Option value="-1">请选择...</Option>
                      <Option value="0">租赁</Option>
                      <Option value="1">购买</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={20} span={4}>
              <Row>
                <Col span={24}>
                  <Form.Item>
                    <Button onClick={this.search.bind(this)} type="primary">
                      搜索
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={this.reset.bind(this)}>重置</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
  goback() {
    this.props.history.goBack();
  }
  state: State = {
    keyword: "",
    start_registered_capital: null,
    end_registered_capital: null,
    start_employee_number: null,
    end_employee_number: null,
    business_status: "",
    isRegister: "",
    isTaxes: "",
    start_operating_income: null,
    end_operating_income: null,
    start_tax_amount: null,
    end_tax_amount: null,
    src_streetId: null,
    isStorehouse: "",
    isNetwork: "",
    taxable: "",
    property_type: "",
    industry_type: "",
    src_buildingId: null,
    start_area: null,
    end_area: null,
    start_business_entry_time: null,
    end_business_entry_time: null,
    isQuit: "",
    status: null,
    rowsbuilding: [],
    rowsstreet: [],
    estime: null,
    entime: null
  };
  async search() {
    (this.state.start_business_entry_time = this.state.estime
      ? parseInt(this.state.estime.format("X"))
      : -1),
      (this.state.end_business_entry_time = this.state.entime
        ? parseInt(this.state.entime.format("X"))
        : -1);
    let opt = {
      keyword: this.state.keyword,
      start_registered_capital: this.state.start_registered_capital
        ? parseInt(this.state.start_registered_capital * 100 + "")
        : -1,
      end_registered_capital: this.state.end_registered_capital
        ? parseInt(this.state.end_registered_capital * 100 + "")
        : -1,
      start_employee_number: this.state.start_employee_number
        ? parseInt(this.state.start_employee_number * 100 + "")
        : -1,
      end_employee_number: this.state.end_employee_number
        ? this.state.end_employee_number
        : -1,
      business_status: this.state.business_status,
      isRegister: this.state.isRegister,
      isTaxes: this.state.isTaxes,
      start_operating_income: this.state.start_operating_income
        ? parseInt(this.state.start_operating_income * 100 + "")
        : -1,
      end_operating_income: this.state.end_operating_income
        ? parseInt(this.state.end_operating_income * 100 + "")
        : -1,
      start_tax_amount: this.state.start_tax_amount
        ? parseInt(this.state.start_tax_amount * 100 + "")
        : -1,
      end_tax_amount: this.state.end_tax_amount
        ? parseInt(this.state.end_tax_amount * 100 + "")
        : -1,
      src_streetId:
        this.state.src_streetId == null ? -1 : this.state.src_streetId,
      isStorehouse: this.state.isStorehouse,
      isNetwork: this.state.isNetwork,
      taxable: this.state.taxable,
      property_type: this.state.property_type,
      industry_type: this.state.industry_type,
      src_buildingId:
        this.state.src_buildingId == null ? -1 : this.state.src_buildingId,
      start_area: this.state.start_area
        ? parseInt(this.state.start_area * 100 + "")
        : -1,
      end_area: this.state.end_area
        ? parseInt(this.state.end_area * 100 + "")
        : -1,
      start_business_entry_time: this.state.start_business_entry_time,
      end_business_entry_time: this.state.end_business_entry_time,
      isQuit: this.state.isQuit,
      status: this.state.status == null ? -1 : this.state.status,
      pageIndex: 1,
      pageSize: 10
    };
    this.props.history.push(
      `/home/company/searchresult/${JSON.stringify(opt)}`
    );
  }
  async listBuilding() {
    try {
      let opt = {
        type: "All"
      };
      let data = await buildingService.searchBuilding(opt);
      if (data.stat == "ok") {
        this.setState({
          rowsbuilding: data.items
        });
      } else {
        checkRole.checkerrcode(data.stat);
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  reset() {
    this.setState({
      keyword: "",
      start_registered_capital: null,
      end_registered_capital: null,
      start_employee_number: null,
      end_employee_number: null,
      business_status: "",
      isRegister: "",
      isTaxes: "",
      start_operating_income: null,
      end_operating_income: null,
      start_tax_amount: null,
      end_tax_amount: null,
      src_streetId: null,
      isStorehouse: "",
      isNetwork: "",
      taxable: "",
      property_type: "",
      industry_type: "",
      src_buildingId: null,
      start_area: null,
      end_area: null,
      start_business_entry_time: null,
      end_business_entry_time: null,
      isQuit: "",
      status: null,
      rowsbuilding: [],
      rowsstreet: [],
      estime: null,
      entime: null
    });
  }
  async listStreet() {
    try {
      let data = await buildingService.ListAllStreet();
      if (data.stat == "ok") {
        this.setState({
          rowsstreet: data.items
        });
      } else {
        checkRole.checkerrcode(data.stat);
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  componentDidMount() {
    this.listBuilding();
    this.listStreet();
  }
}
