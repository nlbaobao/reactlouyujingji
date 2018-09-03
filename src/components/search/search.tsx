import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Button,
  Form,
  Select,
  Input,
  DatePicker,
  InputNumber,
  Row,
  Col
} from "antd";
import { BuilldingItem } from "../../interfaces/model";
import "./style.less";
import moment from "moment";
interface State {
  rows: BuilldingItem[];
  type: string;
  nameKeyword: string;
  start_ctime: number;
  end_ctime: number;
  start_building_height: number;
  end_building_height: number;
  start_floor_count: number;
  end_floor_count: number;
  start_single_storey: number;
  end_single_storey: number;
  start_single_layer_net_height: number;
  end_single_layer_net_height: number;
  start_construction_area: number;
  end_construction_area: number;
  start_stock_area: number;
  end_stock_area: number;
  delivery_standard: string;
  model_of_operation: string;
  start_rent: number;
  end_rent: number;
  level: string;
  building_busines: string;
  build_time: moment.Moment;
  build_endtime: moment.Moment;
}
export default class extends React.Component<RouteComponentProps<any>> {
  render() {
    const Option = Select.Option;
    return (
      <div id="contentwrap">
        <Form.Item>
          <Button type="primary" onClick={this.goback.bind(this)}>
            返回上一层
          </Button>
        </Form.Item>
        <Form layout="inline">
          <Row>
            <Col offset={2} style = {{marginBottom : 30}} span={22}>
              <Row>
                <Col span={8}>
                  <Form.Item label="楼宇名称：">
                    <Input
                      placeholder="请输入企业名称"
                      value={this.state.nameKeyword}
                      style={{ width: 200 }}
                      onChange={event => {
                        this.setState({
                          nameKeyword: event.target.value.trim()
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="楼宇建成时间：">
                    <DatePicker
                      style={{ width: 130 }}
                      onChange={value => {
                        this.setState({
                          build_time: value
                        });
                      }}
                      value={this.state.build_time}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <DatePicker
                      style={{ width: 130 }}
                      onChange={value => {
                        this.setState({
                          build_endtime: value
                        });
                      }}
                      value={this.state.build_endtime}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="楼层总数（层）：">
                    <InputNumber
                      placeholder="请输入楼层起始层数"
                      min={0}
                      value={this.state.start_floor_count}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_floor_count: value
                        });
                      }}
                      precision={0}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入楼层层数"
                      min={this.state.start_floor_count}
                      value={this.state.end_floor_count}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          end_floor_count: value
                        });
                      }}
                      precision={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={2}  style = {{marginBottom : 30}} span={22}>
              <Row>
                <Col span={8}>
                  <Form.Item label="楼宇总高度（米）：">
                    <InputNumber
                      placeholder="请输入楼宇起始高度"
                      min={0}
                      value={this.state.start_building_height}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_building_height: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入楼宇高度"
                      min={this.state.start_building_height}
                      value={this.state.end_building_height}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          end_building_height: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="单层层高（米）">
                    <InputNumber
                      placeholder="请输入起始单层层高"
                      min={0}
                      style={{ width: 130 }}
                      value={this.state.start_single_storey}
                      onChange={(value: number) => {
                        this.setState({
                          start_single_storey: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入单层层高"
                      min={this.state.start_single_storey}
                      style={{ width: 130 }}
                      value={this.state.end_single_storey}
                      onChange={(value: number) => {
                        this.setState({
                          end_single_storey: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="单层净高（米）">
                    <InputNumber
                      placeholder="请输入起始单层净高"
                      min={0}
                      style={{ width: 130 }}
                      value={this.state.start_single_layer_net_height}
                      onChange={(value: number) => {
                        this.setState({
                          start_single_layer_net_height: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入单层净高"
                      min={this.state.start_single_layer_net_height}
                      style={{ width: 130 }}
                      value={this.state.end_single_layer_net_height}
                      onChange={(value: number) => {
                        this.setState({
                          end_single_layer_net_height: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={2}  style = {{marginBottom : 30}} span={22}>
              <Row>
                <Col span={8}>
                  <Form.Item label="总面积（平方米）">
                    <InputNumber
                      placeholder="请输入起始总面积"
                      min={0}
                      style={{ width: 130 }}
                      value={this.state.start_construction_area}
                      onChange={(value: number) => {
                        this.setState({
                          start_construction_area: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入总面积"
                      min={this.state.start_construction_area}
                      style={{ width: 130 }}
                      value={this.state.end_construction_area}
                      onChange={(value: number) => {
                        this.setState({
                          end_construction_area: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="存量面积（平方米）">
                    <InputNumber
                      placeholder="请输入起始存量面积"
                      min={0}
                      value={this.state.start_stock_area}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_stock_area: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入存量面积"
                      min={this.state.start_stock_area}
                      value={this.state.end_stock_area}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          end_stock_area: value
                        });
                      }}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="租金（元/平方米）">
                    <InputNumber
                      placeholder="请输入起始租金"
                      min={0}
                      value={this.state.start_rent}
                      style={{ width: 130 }}
                      onChange={(value: number) => {
                        this.setState({
                          start_rent: value
                        });
                      }}
                      precision={0}
                    />
                  </Form.Item>
                  <Form.Item>—</Form.Item>
                  <Form.Item>
                    <InputNumber
                      placeholder="请输入租金"
                      min={this.state.start_rent}
                      style={{ width: 130 }}
                      value={this.state.end_rent}
                      onChange={(value: number) => {
                        this.setState({
                          end_rent: value
                        });
                      }}
                      precision={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={2}  style = {{marginBottom : 30}} span={22}>
              <Row>
                <Col span={6}>
                  <Form.Item label="交付标准：">
                    <Select
                    style={{ width: 200 }}
                      value={this.state.delivery_standard}
                      onChange={(value: string) => {
                        this.setState({
                          delivery_standard: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="2">毛坯</Option>
                      <Option value="3">精装</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="经营方式：">
                    <Select
                    style={{ width: 200 }}
                      value={this.state.model_of_operation}
                      onChange={(value: string) => {
                        this.setState({
                          model_of_operation: value
                        });
                      }}
                    >
                     <Option value="">请选择...</Option>
                      <Option value="2">租</Option>
                      <Option value="3">售</Option>
                      <Option value="4">租售结合</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="楼宇等级：">
                    <Select
                      style={{ width: 200 }}
                      value={this.state.level}
                      onChange={(value: string) => {
                        this.setState({
                          level: value
                        });
                      }}
                    >
                     <Option value="">请选择...</Option>
                      <Option value="2">甲级</Option>
                      <Option value="3">乙级</Option>
                      <Option value="4">其他及以下</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="楼宇主导业态：">
                    <Select
                      style={{ width: 150 }}
                      value={this.state.building_busines}
                      onChange={(value: string) => {
                        this.setState({
                          building_busines: value
                        });
                      }}
                    >
                      <Option value="">请选择...</Option>
                      <Option value="2">工业服务业</Option>
                      <Option value="3">商贸业</Option>
                      <Option value="4">健康医疗产业</Option>
                      <Option value="0">金融业</Option>
                      <Option value="5">互联网产业</Option>
                      <Option value="1">其他</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col offset={20} span={4}>
              <Row>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={this.search.bind(this)}
                      className="search-form-button"
                    >
                      搜索
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="search-form-button"
                      onClick={this.reset.bind(this)}
                    >
                      重置
                    </Button>
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
    rows: [],
    nameKeyword: "",
    start_ctime: 0,
    end_ctime: 0,
    start_building_height: null,
    end_building_height: null,
    start_floor_count: null,
    end_floor_count: null,
    start_single_storey: null,
    end_single_storey: null,
    start_single_layer_net_height: null,
    end_single_layer_net_height: null,
    start_construction_area: null,
    end_construction_area: null,
    start_stock_area: null,
    end_stock_area: null,
    delivery_standard: "",
    model_of_operation: "",
    start_rent: null,
    end_rent: null,
    level: "",
    building_busines: "",
    type: "All",
    build_time: null,
    build_endtime: null
  };
  search() {
    (this.state.start_ctime = this.state.build_time
      ? parseInt(this.state.build_time.format("X"))
      : -1),
      (this.state.end_ctime = this.state.build_endtime
        ? parseInt(this.state.build_endtime.format("X"))
        : -1);

    let opt = {
      nameKeyword: this.state.nameKeyword,
      start_ctime: this.state.start_ctime,
      end_ctime: this.state.end_ctime,
      start_building_height: this.state.start_building_height
        ? parseInt(this.state.start_building_height * 100 + "")
        : -1,
      end_building_height: this.state.end_building_height
        ? parseInt(this.state.end_building_height * 100 + "")
        : -1,
      start_floor_count:
        this.state.start_floor_count == null
          ? -1
          : this.state.start_floor_count,
      end_floor_count:
        this.state.end_floor_count == null ? -1 : this.state.end_floor_count,
      start_single_storey: this.state.start_single_storey
        ? parseInt(this.state.start_single_storey * 100 + "")
        : -1,
      end_single_storey: this.state.end_single_storey
        ? parseInt(this.state.end_single_storey * 100 + "")
        : -1,
      start_single_layer_net_height: this.state.start_single_layer_net_height
        ? parseInt(this.state.start_single_layer_net_height * 100 + "")
        : -1,
      end_single_layer_net_height: this.state.end_single_layer_net_height
        ? parseInt(this.state.end_single_layer_net_height * 100 + "")
        : -1,
      start_construction_area: this.state.start_construction_area
        ? parseInt(this.state.start_construction_area * 100 + "")
        : -1,
      end_construction_area: this.state.end_construction_area
        ? parseInt(this.state.end_construction_area * 100 + "")
        : -1,
      start_stock_area: this.state.start_stock_area
        ? parseInt(this.state.start_stock_area * 100 + "")
        : -1,
      end_stock_area: this.state.end_stock_area
        ? parseInt(this.state.end_stock_area * 100 + "")
        : -1,
      delivery_standard: this.state.delivery_standard,
      model_of_operation: this.state.model_of_operation,
      start_rent: this.state.start_rent == null ? -1 : this.state.start_rent,
      end_rent: this.state.end_rent == null ? -1 : this.state.start_rent,
      level: this.state.level,
      building_busines: this.state.building_busines,
      pageIndex:1,
      pageSize: 10,
      type: "All"
    };
    this.props.history.push(`/home/buildinglist/search/${JSON.stringify(opt)}`);
  }

  filter() {}
  reset() {
    this.setState({
      nameKeyword: "",
      start_building_height: null,
      end_building_height: null,
      start_floor_count: null,
      end_floor_count: null,
      start_single_storey: null,
      end_single_storey: null,
      start_single_layer_net_height: null,
      end_single_layer_net_height: null,
      start_construction_area: null,
      end_construction_area: null,
      start_stock_area: null,
      end_stock_area: null,
      delivery_standard: "",
      model_of_operation: "",
      start_rent: null,
      end_rent: null,
      level: "",
      building_busines: "",
      type: "All",
      build_time: null,
      build_endtime: null
    });
  }
  componentDidMount() {}
}
