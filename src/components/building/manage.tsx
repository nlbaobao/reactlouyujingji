import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Table,
  Button,
  Menu,
  Form,
  Pagination,
  Dropdown,
  Icon,
  Input,
  Modal,
  message
} from "antd";
import store from "../../store";
import checkRole from "../../services/check-role";
import { BuilldingItem, Role, UserInfo } from "../../interfaces/model";
import { ColumnProps } from "antd/lib/table";
import AddBuilding from "./add";
import loaderService from "../../services/loader";
import buildingService from "../../services/building";
import { Unsubscribe } from "redux";
import "./style.less";
interface State {
  rows: BuilldingItem[];
  buildingname: string;
  street: string;
  company: string;
  pagination: {};
  loading: boolean;
  roles: Role[];
  user: UserInfo;
  currentPage: number;
  total: number;
}
export default class extends React.Component<RouteComponentProps<any>, State> {
  render() {
    return (
      <div className="company-top">
        <Form layout="inline">
          <Form.Item>
            <Button
              type="primary"
              className="add-btn"
              onClick={this.addBuilding.bind(this)}
            >
              添加楼宇
            </Button>
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="请输入楼宇名称"
              value={this.state.buildingname}
              onChange={event =>
                this.setState({
                  buildingname: event.target.value.trim()
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="search-form-button"
              onClick={this.search.bind(this)}
            >
              搜索
            </Button>
          </Form.Item>

          <Table
            className="building-table"
            columns={this.columns}
            dataSource={this.state.rows}
            pagination={false}
            rowKey="id"
          />
          <Pagination
            style={{ marginTop: 30 }}
            showTotal={total => `共 ${total} 栋 `}
            onChange={(page: number) => {
              this.setState({
                currentPage: page
              });
              this.listData(page, 10);
            }}
            current={this.state.currentPage}
            pageSize={10}
            total={this.state.total}
          />
        </Form>
      </div>
    );
  }
  
  state: State = {
    rows: [],
    buildingname: "",
    street: "H",
    company: "",
    pagination: {},
    loading: false,
    roles: [],
    user: {},
    currentPage: 1,
    total: 0
  };

  columns: ColumnProps<BuilldingItem>[] = [
    {
      title: "楼宇名称",
      dataIndex: "name"
    },
    {
      title: "所属街道",
      dataIndex: "src_streetDept.name"
    },
    {
      title: "楼宇状态",
      dataIndex: "building_status",
      render: (text, record) => {
        if (record.building_status == 0) {
          return <div>已建成</div>;
        }
        if (record.building_status == 1) {
          return <div>未建成</div>;
        }
      }
    },
    {
      title: "信息录入状态",
      dataIndex: "status",
      render: (text, record) => {
        if (record.status == 0) {
          return <div>需设置楼长</div>;
        }
        if (record.status == 1) {
          return <div>未完善信息</div>;
        }
        if (record.status == 2) {
          return <div>已完善信息</div>;
        }
      }
    },
    {
      title: "操作",
      render: (text, record) => {
        const menu = (
          <Menu>
            <Menu.Item>
              <a
                onClick={() => {
                  this.go(record);
                }}
              >
                查看详细信息
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={() => {
                  this.goMap(record);
                }}
              >
                查看地图位置
              </a>
            </Menu.Item>
            <Menu.Item>
              <a onClick={() => this.edit(record)}>编辑楼宇信息</a>
            </Menu.Item>
            <Menu.Item>
              <a onClick={() => this.remove(record)}>删除楼宇信息</a>
            </Menu.Item>
          </Menu>
        );
        return (
          <div className="buliding-dropdown">
            <Dropdown overlay={menu}>
              <Icon style={{ fontSize: 20 }} type="setting" />
            </Dropdown>
          </div>
        );
      }
    }
  ];

  go(record: BuilldingItem) {
    this.props.history.push(`/home/map/building/${record.id}`);
  }

  goMap(record: BuilldingItem) {
    this.props.history.push(
      `/home/building/map/${record.id}/${record.longitude}/${record.latitude}/${
        record.name
      }`
    );
  }
  edit(record: BuilldingItem) {
    // 编辑和添加复用的是同一个组件，区别在于是否传递了需要编辑的对象
    if (record.status === 0) {
      let unmount = loaderService.mount(
        <AddBuilding
          data={record}
          afterClose={() => unmount()}
          onSuccess={() => {
            // 保存成功，刷新列表
            this.listData(1, 10);
          }}
        />
      );
    } else {
      return Modal.warn({
        title: "提示",
        content: "该楼宇已经设置楼长不能编辑"
      });
    }
  }

  async remove(record: BuilldingItem) {
    const ids: any = [];
    ids.push(record.id);
    let opt = {
      buildingIds: ids
    };
    Modal.confirm({
      title: "提示",
      content: `确定要删除用户 ${record.name} 吗？`,
      onOk: async () => {
        try {
          let closeLoading = message.loading("正在删除");
          let data = await buildingService.deleteSimpleBuilding(opt);
          if (data.stat === "ok") {
            setTimeout(() => {
              closeLoading();
              message.success("删除成功");
            }, 200);
            this.listData(1, 10);
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
    });
  }

  async listData(page: number, pageSize: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let opt = {
        type: "All",
        nameKeyword: this.state.buildingname,
        pageIndex: page,
        pageSize: pageSize
      };
      let data = await buildingService.searchBuilding(opt);
      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 200);
      if (data.stat == "ok") {
        this.setState({
          rows: data.items,
          total: data.total
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
  addBuilding() {
    this.props.history.push(`/home/building/map/addBuilding`);
  }
  search() {
    this.listData(1, 10);
  }
  unsub: Unsubscribe;
  componentWillMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        user: store.getState().user,
        roles: store.getState().user.src_roles || []
      });
    });
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "building"
    });
    this.listData(1, 10);
  }
}
