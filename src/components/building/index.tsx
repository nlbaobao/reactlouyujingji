import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  Table,
  Button,
  Menu,
  Form,
  Dropdown,
  Select,
  Icon,
  Modal,
  message,
  Pagination
} from "antd";
import store from "../../store";
import checkRole from "../../services/check-role";
import { BuilldingItem, Role, UserInfo } from "../../interfaces/model";
import { ColumnProps } from "antd/lib/table";
import AddBuilding from "./add";
import AddHeader from "./addHead";
import Addproperty from "./addproperty";
import loaderService from "../../services/loader";
import buildingService from "../../services/building";
import { Unsubscribe } from "redux";
import "./style.less";
interface Props {
  opt: string;
}
interface State {
  rows: BuilldingItem[];
  buildingname: string;
  street: string;
  company: string;
  pagination: {};
  loading: boolean;
  roles: Role[];
  user: UserInfo;
  selectedRowKeys: number[];
  total: number;
}
export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    const Option = Select.Option;
    // const rowSelection = {
    //   onChange: this.onSelectChange.bind(this),
    //   onSelect: this.onSelect,
    //   hideDefaultSelections: true
    // };
    return (
      <div className="company-top">
        <Form layout="inline">
          <Form.Item>
            <Button
              type="primary"
              className="add-btn"
              onClick={this.search.bind(this)}
            >
              搜索楼宇
            </Button>
          </Form.Item>
          <Table
            className="building-table"
            columns={this.columnsMany}
            dataSource={this.state.rows}
            rowKey="id"
            pagination={false}
          />
          <Pagination
            style={{ marginTop: 30 }}
            showTotal={total => `共 ${total} 栋 `}
            onChange={(pageNumber: number) => {
              this.handleTableChange(pageNumber);
            }}
            total={this.state.total}
          />
        </Form>
      </div>
    );
  }

  state: State = {
    rows: [],
    buildingname: "M",
    street: "H",
    company: "",
    pagination: {},
    loading: false,
    roles: [],
    user: {},
    selectedRowKeys: [],
    total: 0
  };

  columnsMany: ColumnProps<BuilldingItem>[] = [
    {
      title: "楼宇名称",
      dataIndex: "name"
    },
    {
      title: "街道楼长",
      dataIndex: "",
      render: (text, record) => {
        return record.manager
          ? record.manager.nickName + `(${record.manager.name})`
          : "";
      }
    },
    {
      title: "街道楼长联系方式",
      dataIndex: "manager_contact"
    },
    {
      title: "物业方联系人",
      dataIndex: "property_management"
    },
    // {
    //   title: "物业联方系电话",
    //   dataIndex: ""
    // },
    {
      title: "意向项目",
      dataIndex: "project_number"
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
        let menu: any = null;
        const cont: any = "街道管理员";

        const menuMerchants: any = (
          <Menu>
            <Menu.Item>
              <a
                onClick={() => {
                  this.go(record);
                }}
              >
                查看楼宇详细信息
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={() => {
                  this.gocompanyList(record);
                }}
              >
                查看企业列表
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={() => {
                  this.goprojectList(record);
                }}
              >
                查看意向项目
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={() => {
                  this.historycompany(record);
                }}
              >
                查看历史企业
              </a>
            </Menu.Item>
          </Menu>
        );
        menu = menuMerchants;

        if (checkRole.check(["streetSetRoleUser"], this.state.roles)) {
          const menuAdmin: any = (
            <Menu>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.go(record);
                  }}
                >
                  查看楼宇详细信息
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.gocompanyList(record);
                  }}
                >
                  查看企业列表
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.historycompany(record);
                  }}
                >
                  查看历史企业
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.addBuildingHead(record);
                  }}
                >
                  添加楼长
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.editBuildingHead(record);
                  }}
                >
                  编辑楼长
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.editpropertyHead(record);
                  }}
                >
                  添加物业方楼长
                </a>
              </Menu.Item>
            </Menu>
          );
          menu = menuAdmin;
        }
        if (checkRole.check(["streetBuildingManager"], this.state.roles)) {
          const menuBuildingHead: any = (
            <Menu>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.entryBuilding(record);
                  }}
                >
                  录入楼宇信息
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.editBuilding(record);
                  }}
                >
                  编辑楼宇信息
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.addcompany(record);
                  }}
                >
                  录入企业信息
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.historycompany(record);
                  }}
                >
                  查看历史企业
                </a>
              </Menu.Item>
            </Menu>
          );
          menu = menuBuildingHead;
        }
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

  addBuildingHead(record: BuilldingItem) {
    const ids: any = [];
    ids.push(record.id);
    this.setState(
      {
        selectedRowKeys: ids
      },
      () => {
        if (record.status == 0) {
          let unmount = loaderService.mount(
            <AddHeader
              ids={
                this.state.selectedRowKeys !== []
                  ? this.state.selectedRowKeys
                  : []
              }
              afterClose={() => unmount()}
              onSuccess={() => {
                // 保存成功，刷新列表
                this.listData(1);
              }}
            />
          );
        } else {
          return Modal.warn({
            title: "提示",
            content: "已经添加楼长"
          });
        }
      }
    );
  }
  onSelectChange(selectedRowKeys: any) {
    const ids: any = [];
    selectedRowKeys.map((item: any) => {
      ids.push(this.state.rows[item].id);
    });
    this.setState({
      selectedRowKeys: ids
    });
  }
  editpropertyHead(record: BuilldingItem) {
    const ids: any = [];
    ids.push(record.id);
    this.state.selectedRowKeys = ids;
    let unmount = loaderService.mount(
      <Addproperty
        data={record}
        ids={this.state.selectedRowKeys}
        afterClose={() => unmount()}
        onSuccess={() => {
          this.listData(1);
        }}
      />
    );
  }

  editBuildingHead(record: BuilldingItem) {
    const ids: any = [];
    ids.push(record.id);
    this.state.selectedRowKeys = ids;
    if (record.status == 0) {
      return Modal.warn({
        title: "提示",
        content: "请先添加楼长"
      });
    }
    // else if (record.status == 2) {
    //   return Modal.warn({
    //     title: "提示",
    //     content: "该楼宇已经录入信息无法更改楼长"
    //   });
    // }
    else {
      let unmount = loaderService.mount(
        <AddHeader
          data={record}
          ids={this.state.selectedRowKeys}
          afterClose={() => unmount()}
          onSuccess={() => {
            // 保存成功，刷新列表
            this.listData(1);
          }}
        />
      );
    }
  }
  go(record: BuilldingItem) {
    this.props.history.push(`/home/map/building/${record.id}`);
  }

  goMap(record: BuilldingItem) {
    this.props.history.push(
      `/home/building/map/${record.id}/${record.longitude}/${record.latitude}`
    );
  }
  goprojectList(record: BuilldingItem) {
    this.props.history.push(`/home/project/activeproject/${record.id}`);
  }
  gocompanyList(record: BuilldingItem) {
    this.props.history.push(
      `/home/company/buildingList/companylist/${record.id}`
    );
  }
  historycompany(record: BuilldingItem) {
    this.props.history.push(
      `/home/company/buildingList/historycompany/${record.id}`
    );
  }
  addcompany(record: BuilldingItem) {
    if (record.floor_count < 1 || record.floor_count == null) {
      return Modal.warn({
        title: "提示",
        content: "完善楼层信息后才能添加企业"
      });
    } else {
      this.props.history.push(
        `/home/company/creat/${record.id}/${record.name}/${
          record.src_streetDept.name
        }`
      );
    }
  }
  entryBuilding(record: BuilldingItem) {
    if (record.status == 1) {
      this.props.history.push(
        `/home/buildingList/entry/${record.id}/${record.name}`
      );
    } else {
      return Modal.warn({
        title: "提示",
        content: "该楼宇已经录入，若需修改请选择编辑楼宇信息"
      });
    }
  }
  // filter() {
  //   // 根据筛选的表单条件重新请求服务端数据列表
  //   this.listData();
  // }

  addBuilding() {
    this.props.history.push(`/home/building/map/${null}/${null}/${null}`);
  }
  edit(record: BuilldingItem) {
    // 编辑和添加复用的是同一个组件，区别在于是否传递了需要编辑的对象
    let unmount = loaderService.mount(
      <AddBuilding
        data={record}
        afterClose={() => unmount()}
        onSuccess={() => {
          // 保存成功，刷新列表
          this.listData(1);
        }}
      />
    );
  }

  remove(record: BuilldingItem) {
    Modal.confirm({
      title: "提示",
      content: `确定要删除用户 ${record.name} 吗？`,
      onOk: () => {
        // 执行删除操作
        message.success("删除成功");
      }
    });
  }

  async listData(pageNumber?: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let opt = {
        type: "All",
        pageIndex: pageNumber,
        pageSize: 10
      };
      let data = await buildingService.searchBuilding(
        this.props.match.params.opt
          ? JSON.parse(this.props.match.params.opt)
          : opt
      );
      if (data.stat == "ok") {
        setTimeout(() => {
          closeLoading();
          message.success("数据加载成功");
        }, 200);
        this.setState({
          total: data.total,
          rows: data.items
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
  search() {
    this.props.history.push(`/home/building/search`);
  }

  editBuilding(record: BuilldingItem) {
    if (record.status == 2) {
      this.props.history.push(
        `/home/buildingList/edit/${record.id}/${"edit"}/${record.name}`
      );
    } else {
      return Modal.warn({
        title: "提示",
        content: "请先录入楼宇信息"
      });
    }
  }
  unsub: Unsubscribe;
  componentWillMount() {
    this.unsub = store.subscribe(() => {
      let roles = store.getState().user.src_roles;
      if (roles !== undefined) {
        this.setState({
          roles: store.getState().user.src_roles
        });
      }
    });
  }
  handleTableChange(pageNumber: number) {
    this.listData(pageNumber);
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "buildingList"
    });
    this.listData(1);
  }
}
