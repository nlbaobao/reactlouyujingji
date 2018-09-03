import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Icon,
  DatePicker,
  Radio,
  Modal,
  InputNumber,
  Upload
} from "antd";
import moment from "moment";
import store from "../../store";
import "./style.less";
import "../company/style.less";
import buildingService from "../../services/building";
import checkcode from "../../services/check-role";
interface Props {
  id: string;
  edit: string;
  name: string;
}
interface State {
  manager_contact: string;
  buildingId: number;
  address: string;
  form_build_time: moment.Moment;
  build_time: number;
  zip_code: string;
  building_height: number;
  floor_count: number;
  single_storey: number;
  single_layer_net_height: number;
  construction_area: number;
  // stock_area: number;
  delivery_standard: string;
  model_of_operation: string;
  rent: number;
  property_costs: number;
  level: string;
  parking_space: number;
  number_of_elevators: number;
  building_business: string;
  property_management: string;
  images: string[];
  building_status: number;
  src: string;
}
export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    const Option = Select.Option;
    const RadioGroup = Radio.Group;
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    return (
      <div className="creat-wrap">
        <Form layout="inline" className="building-form">
          <Form.Item>
            <Button onClick={this.goback.bind(this)}>返回上一层</Button>
          </Form.Item>
        </Form>
        <div className="creat-table">
          <ul className="table-left">
            <li className="creat-li">
              <span className="creat-span">楼宇名称</span>
              <Input
                value={this.props.match.params.name}
                readOnly={true}
                style={{ width: 200 }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">楼宇地址</span>
              <Input
                placeholder="请输入楼宇地址"
                value={this.state.address}
                onChange={event => {
                  this.setState({
                    address: event.target.value.trim()
                  });
                }}
                style={{ width: 200 }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">楼宇建成时间</span>
              <DatePicker
                style={{ width: 200 }}
                onChange={value => {
                  this.setState({
                    form_build_time: value
                  });
                }}
                value={this.state.form_build_time}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">邮政编码</span>
              <Input
                placeholder="请输入邮政编码"
                value={this.state.zip_code}
                onChange={event => {
                  this.setState({
                    zip_code: event.target.value.trim()
                  });
                }}
                style={{ width: 200 }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">楼宇总高度(m)</span>

              <InputNumber
                min={0}
                style={{ width: 200 }}
                value={this.state.building_height}
                onChange={(value: number) => {
                  this.setState({
                    building_height: value
                  });
                }}
                precision={2}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">楼层总数(层)</span>
              <InputNumber
                min={1}
                style={{ width: 200 }}
                disabled={this.props.match.params.edit ? true : false}
                value={this.state.floor_count}
                onChange={(value: number) => {
                  this.setState({
                    floor_count: value
                  });
                }}
                precision={0}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">单层楼高(m)</span>
              <InputNumber
                min={1}
                style={{ width: 200 }}
                value={this.state.single_storey}
                onChange={(value: number) => {
                  this.setState({
                    single_storey: value
                  });
                }}
                precision={2}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">单层净高(m)</span>
              <InputNumber
                style={{ width: 200 }}
                min={1}
                value={this.state.single_layer_net_height}
                onChange={(value: number) => {
                  this.setState({
                    single_layer_net_height: value
                  });
                }}
                precision={2}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">总面积(平方米)</span>
              <InputNumber
                style={{ width: 200 }}
                min={1}
                precision={2}
                value={this.state.construction_area}
                onChange={(value: number) => {
                  this.setState({
                    construction_area: value
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">电梯数量(个)：</span>
              <InputNumber
                style={{ width: 200 }}
                min={1}
                precision={0}
                value={this.state.number_of_elevators}
                onChange={(value: number) => {
                  this.setState({
                    number_of_elevators: value
                  });
                }}
              />
            </li>
            <li className="creat-li">
              <span className="creat-span">交付方式：</span>
              <Select
                defaultValue="2"
                value={this.state.delivery_standard}
                onChange={(value: string) => {
                  this.setState({
                    delivery_standard: value
                  });
                }}
                style={{ width: 150 }}
              >
                <Option value="2">毛坯</Option>
                <Option value="3">精装</Option>
              </Select>
            </li>
            {/* <li className="creat-li">
              <span className="creat-span">存量面积(平米)</span>
              <InputNumber
                style={{ width: 200 }}
                min={1}
                disabled = {true}
                precision={2}
                // value={this.state.stock_area}
                onChange={(value: number) => {
                  // this.setState({
                  //   stock_area: value
                  // });
                }}
              />
            </li> */}
          </ul>
          <li className="right-li">
            <span className="creat-span">经营方式：</span>
            <Select
              defaultValue="2"
              value={this.state.model_of_operation}
              onChange={(value: string) => {
                this.setState({
                  model_of_operation: value
                });
              }}
              style={{ width: 200 }}
            >
              <Option value="2">租</Option>
              <Option value="3">售</Option>
              <Option value="4">租售结合</Option>
            </Select>
          </li>
          <li className="right-li">
            <span className="creat-span">租金(元/平方米)</span>
            <InputNumber
              style={{ width: 200 }}
              min={1}
              value={this.state.rent}
              onChange={(value: number) => {
                this.setState({
                  rent: value
                });
              }}
              precision={0}
            />
          </li>
          <ul className="table-right">
            <li className="right-li">
              <span className="creat-span">楼宇图片</span>
              {
                <img
                  style={{ width: 73, height: 40, marginRight: 10 }}
                  src={this.state.src}
                  alt=""
                />
              }
              <Upload
                action="/upload/form"
                onChange={info => {
                  if (info.file.status == "done") {
                    setTimeout(() => {
                      message.loading("上传成功");
                    }, 100);

                    this.setState({
                      src: info.file.response.url
                    });
                  }
                }}
              >
                <Button>
                  <Icon type="upload" /> 上传图片
                </Button>
              </Upload>
            </li>
            <li className="right-li">
              <span className="creat-span">楼宇等级</span>
              <Select
                value={this.state.level}
                onChange={(value: string) => {
                  this.setState({
                    level: value
                  });
                }}
                style={{ width: 200 }}
              >
                <Option value="2">甲级</Option>
                <Option value="3">乙级</Option>
                <Option value="4">其他及以下</Option>
              </Select>
            </li>
            <li className="right-li">
              <span className="creat-span">车位总数（个）</span>
              <InputNumber
                min={0}
                style={{ width: 200 }}
                value={this.state.parking_space}
                onChange={(value: number) => {
                  this.setState({
                    parking_space: value
                  });
                }}
              />
            </li>
            <li className="right-li">
              <span className="creat-span">楼宇状态</span>
              <Select
                value={
                  this.state.building_status == null
                    ? "0"
                    : this.state.building_status + ""
                }
                style={{ width: 100 }}
                onChange={(value: string) => {
                  this.setState({
                    building_status: parseInt(value)
                  });
                }}
              >
                <Option value="0">已建成</Option>
                <Option value="1">未建成</Option>
              </Select>
            </li>

            <li className="right-li">
              <span className="creat-span">楼长联系方式</span>
              <Input
                placeholder="请输入楼长联系方式"
                value={this.state.manager_contact}
                onChange={event => {
                  this.setState({
                    manager_contact: event.target.value.trim()
                  });
                }}
                style={{ width: 200 }}
              />
            </li>
            <li className="right-li">
              <span className="creat-span">楼宇主导业态</span>
              <Select
                value={this.state.building_business}
                onChange={(value: string) => {
                  this.setState({
                    building_business: value
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
            <li className="right-li">
              <span className="creat-span">物业管理方</span>
              <Input
                placeholder="请输入物业管理方"
                value={this.state.property_management}
                onChange={event => {
                  this.setState({
                    property_management: event.target.value.trim()
                  });
                }}
                style={{ width: 200 }}
              />
            </li>
            <li className="right-li">
              <span className="creat-span">物业费(元/m²)</span>
              <InputNumber
                min={1}
                style={{ width: 200 }}
                value={this.state.property_costs}
                onChange={(value: number) => {
                  this.setState({
                    property_costs: value
                  });
                }}
                precision={0}
              />
            </li>
          </ul>
        </div>
        <div className="bottom-button">
          <Form layout="inline">
            {/* <Form.Item>
              <Button type="primary" onClick={this.save.bind(this)}>
                保存
              </Button>
            </Form.Item> */}
            <Form.Item>
              <Button
                onClick={() => {
                  this.gofloor(this.state.floor_count);
                }}
              >
                {this.props.match.params.edit ? "编辑楼层信息" : "新增楼层信息"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  state: State = {
    manager_contact: "",
    buildingId: parseInt(this.props.match.params.id),
    address: "",
    form_build_time: null,
    build_time: null,
    zip_code: "",
    building_height: null,
    floor_count: null,
    single_storey: null,
    single_layer_net_height: null,
    construction_area: null,
    // stock_area: null,
    delivery_standard: "",
    model_of_operation: "",
    rent: null,
    property_costs: null,
    level: "",
    number_of_elevators: null,
    building_business: "",
    property_management: "",
    images: [""],
    parking_space: null,
    building_status: 0,
    src: ""
  };

  async save() {}
  goback() {
    this.props.history.goBack();
  }
  handleChange(value: string) {}
  async listData() {
    try {
      let data = await buildingService.getBuilding(
        parseInt(this.props.match.params.id)
      );
      if (data.stat == "ok") {
        this.setState({
          manager_contact: data.building.manager_contact,
          buildingId: parseInt(this.props.match.params.id),
          address: data.building.address,
          form_build_time: moment(data.building.build_time * 1000),
          zip_code: data.building.zip_code,
          building_height: data.building.building_height / 100,
          floor_count: data.building.floor_count,
          single_storey: data.building.single_storey / 100,
          single_layer_net_height: data.building.single_layer_net_height / 100,
          construction_area: data.building.construction_area / 100,
          // stock_area: data.building.stock_area / 100,
          delivery_standard: data.building.delivery_standard,
          model_of_operation: data.building.model_of_operation,
          rent: data.building.rent,
          property_costs: data.building.property_costs,
          level: data.building.level,
          number_of_elevators: data.building.number_of_elevators,
          building_business: data.building.building_business,
          property_management: data.building.property_management,
          src: data.building.images["0"],
          parking_space: data.building.parking_space,
          building_status: data.building.building_status
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

  async gofloor(floornumber: number) {
    try {
      if (!this.state.address) {
        return Modal.warn({
          title: "提示",
          content: "请输入楼宇地址"
        });
      }
      if (!this.state.form_build_time) {
        return Modal.warn({
          title: "提示",
          content: "请输入楼宇建成时间"
        });
      }
      if (!this.state.zip_code) {
        return Modal.warn({
          title: "提示",
          content: "请输入邮政编码"
        });
      }
      if (!this.state.building_height) {
        return Modal.warn({
          title: "提示",
          content: "请输入楼宇总高度"
        });
      }
      if (!this.state.floor_count) {
        return Modal.warn({
          title: "提示",
          content: "请输入楼宇总层数"
        });
      }
      if (!this.state.single_layer_net_height) {
        return Modal.warn({
          title: "提示",
          content: "请输入单层净高"
        });
      }
      if (!this.state.single_storey) {
        return Modal.warn({
          title: "提示",
          content: "请输入单层楼高"
        });
      }
      if (!this.state.construction_area) {
        return Modal.warn({
          title: "提示",
          content: "请输入总面积"
        });
      }
      // if (!this.state.stock_area) {
      //   return Modal.warn({
      //     title: "提示",
      //     content: "请输入存量面积"
      //   });
      // }
      if (!this.state.number_of_elevators) {
        return Modal.warn({
          title: "提示",
          content: "请输入电梯数量"
        });
      }
      if (!this.state.delivery_standard) {
        return Modal.warn({
          title: "提示",
          content: "请选择交付方式"
        });
      }
      if (!this.state.model_of_operation) {
        return Modal.warn({
          title: "提示",
          content: "请选择经营方式"
        });
      }
      if (!this.state.rent) {
        return Modal.warn({
          title: "提示",
          content: "请填写租金"
        });
      }
      if (!this.state.level) {
        return Modal.warn({
          title: "提示",
          content: "请选择楼宇等级"
        });
      }
      if (!this.state.manager_contact) {
        return Modal.warn({
          title: "提示",
          content: "请输入楼长联系方式"
        });
      }
      if (!this.state.parking_space) {
        return Modal.warn({
          title: "提示",
          content: "请填写车位个数"
        });
      }
      if (!this.state.property_management) {
        return Modal.warn({
          title: "提示",
          content: "请选择物业管理方"
        });
      }
      if (!this.state.property_costs) {
        return Modal.warn({
          title: "提示",
          content: "请输入管理费用"
        });
      }
      let opt = {
        build_time: parseInt(this.state.form_build_time.format("X")),
        images: [this.state.src],
        buildingId: parseInt(this.props.match.params.id),
        address: this.state.address,
        zip_code: this.state.zip_code,
        floor_count: this.state.floor_count,
        delivery_standard: this.state.delivery_standard,
        model_of_operation: this.state.model_of_operation,
        rent: this.state.rent,
        property_costs: this.state.property_costs,
        level: this.state.level,
        parking_space: this.state.parking_space,
        number_of_elevators: this.state.number_of_elevators,
        building_business: this.state.building_business,
        property_management: this.state.property_management,
        building_status: this.state.building_status,
        building_height: parseInt(this.state.building_height * 100 + ""),
        single_storey: parseInt(this.state.single_storey * 100 + ""),
        single_layer_net_height: parseInt(
          this.state.single_layer_net_height * 100 + ""
        ),
        construction_area: parseInt(this.state.construction_area * 100 + ""),
        // stock_area: parseInt(this.state.stock_area * 100 + ""),
        manager_contact: this.state.manager_contact
      };
      if (this.props.match.params.edit) {
        let data = await buildingService.setBuilding(opt);
        if (data.stat == "ok") {
          setTimeout(() => {
            message.success("数据编辑成功");
          }, 500);
        } else {
          checkcode.checkerrcode(data.stat);
        }
      } else {
        let data = await buildingService.createBuilding(opt);
        if (data.stat == "ok") {
          setTimeout(() => {
            message.success("数据保存成功");
          }, 500);
        } else {
          checkcode.checkerrcode(data.stat);
          return false;
        }
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
      return false;
    }

    if (this.props.match.params.edit) {
      this.props.history.push(
        `/home/buildingList/editfloor/${
          this.props.match.params.id
        }/${floornumber}`
      );
    } else {
      this.props.history.push(
        `/home/buildingList/entryfloor/${floornumber}/${
          this.props.match.params.id
        }`
      );
    }
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "buildingList"
    });
    if (this.props.match.params.edit) {
      this.listData();
    }
  }
}
