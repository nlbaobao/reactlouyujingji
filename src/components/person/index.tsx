import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Role, UserInfo, Dept } from "../../interfaces/model";
import { Unsubscribe } from "redux";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  message,
  Menu,
  Dropdown,
  Icon,
  Modal,
  Pagination
} from "antd";
import { ColumnProps } from "antd/lib/table";
import loaderService from "../../services/loader";
import adminService from "../../services/admin";
import store from "../../store";
import "./style.less";
import Addfunction from "./add";
import checkRole from "../../services/check-role";
interface Props {
  id: string;
}
interface Page {
  total: number;
  current: number;
}
// interface Pagination {
//   pageSize: number;
//   current: number;
// }
interface State {
  rows: UserInfo[];
  rowsdept: UserInfo[];
  type: number;
  name: string;
  roles: Role[];
  user: UserInfo;
  pagination?: Page;
  total: number;
  flag: boolean;
  pageNumber: number;
  dept: Dept;
}

export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    const Option = Select.Option;
    return (
      <div className="company-top">
        <div className="add-company">
          <Form layout="inline">
            {checkRole.check(["adminRole"], this.state.roles) ? (
              <Form.Item label="所属单位">
                <Select
                  style={{ width: 200 }}
                  value={this.state.type ? this.state.type.toString() : null}
                  disabled={
                    checkRole.check(["adminRole"], this.state.roles)
                      ? false
                      : true
                  }
                  onChange={(value: string) => {
                    this.setState({
                      type: parseInt(value)
                    });
                  }}
                >
                  {this.state.rowsdept.map(item => {
                    return (
                      <Option key={item.id} value={item.id.toString()}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item label="所属单位">{this.state.dept.name}</Form.Item>
            )}

            <Form.Item label="用户名：">
              <Input
                placeholder="请输入用户名"
                onChange={event => {
                  this.setState({
                    name: event.target.value.trim()
                  });
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={this.search.bind(this)}
                className="search-form-button"
              >
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="cpmpany-table">
          <Table
            dataSource={this.state.rows}
            columns={this.columns}
            rowKey="id"
            pagination={false}
          />
          <Pagination
            style={{ marginTop: 30 }}
            showTotal={total => `共 ${total} 人`}
            onChange={(pageNumber: number) => {
              this.handleTableChange(pageNumber);
              this.setState({
                pageNumber: pageNumber
              });
            }}
            total={this.state.total}
          />
        </div>
      </div>
    );
  }
  handleTableChange(pageNumber: number) {
    this.listData(pageNumber, 10, this.state.type, this.state.name);
  }
  state: State = {
    rows: [],
    type: null,
    name: "",
    roles: [],
    user: {},
    total: 0,
    rowsdept: [],
    flag: false,
    pageNumber: 1,
    dept: {}
  };
  columns: ColumnProps<UserInfo>[] = [
    {
      key: "nickName",
      title: "用户名",
      dataIndex: "nickName"
    },
    {
      key: "src_dept.name",
      title: "所属局(街道)",
      dataIndex: "src_dept.name"
    },
    {
      key: "2",
      title: "职能",
      dataIndex: "",
      render: (text, record) => {
        let rows = record.src_roles
          ? record.src_roles.filter(item => {
              if (item.isShow == true) {
                return true;
              }
            })
          : null;
        return rows ? rows.map(item => item.desc).join(", ") || [] : null;
      }
    },

    {
      key: "3",
      title: "操作",
      render: (text, record) => {
        let menu: any = null;
        const menuMerchants = (
          <Menu>
            <Menu.Item>
              <a
                onClick={() => {
                  this.addAdmin(record);
                }}
              >
                管理权限
              </a>
            </Menu.Item>
          </Menu>
        );
        menu = menuMerchants;

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
  addAdmin(record: UserInfo) {
    let unmount = loaderService.mount(
      <Addfunction
        data={record}
        roles={this.state.roles || []}
        afterClose={() => {
          unmount();
        }}
        onSuccess={() => {
          unmount();
          this.listData(1, 10, this.state.type, this.state.name);
        }}
      />
    );
  }
  async listDept() {
    try {
      let data = await adminService.getdept(0);
      if (data.stat == "ok") {
        if (data.items.length > 0) {
          this.setState({
            rowsdept: data.items || []
          });
        }
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
  async listData(
    pageIndex?: number,
    pageSize?: number,
    type?: number,
    keyword?: string
  ) {
    let data = null;
    try {
      let closeLoading = message.loading("数据加载中");
      if (checkRole.check(["adminRole"], this.state.roles)) {
        data = await adminService.adminSearchDeptUsers(
          pageIndex,
          pageSize,
          type,
          keyword
        );
      } else {
        data = await adminService.searchManagerRoleByUser(
          pageIndex,
          pageSize,
          this.state.name
        );
      }

      if (data.stat == "ok") {
        if (data.items.length > 0) {
          setTimeout(() => {
            closeLoading();
            message.success("数据加载成功");
          }, 500);
          this.setState(
            {
              total: data.total,
              rows: data.items,
              type: checkRole.check(["adminRole"], this.state.roles)
                ? this.state.type
                : data.items.length == 0
                  ? null
                  : data.items[0].src_dept.type
            },
            () => {
              this.state.flag = true;
            }
          );
        } else {
          setTimeout(() => {
            closeLoading();
            message.info("无人员需要管理");
          }, 500);
          this.setState(
            {
              total: data.total,
              rows: data.items,
              type: checkRole.check(["adminRole"], this.state.roles)
                ? this.state.type
                : data.items.length == 0
                  ? null
                  : data.items[0].src_dept.type
            },
            () => {
              this.state.flag = true;
            }
          );
        }
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
    if (checkRole.check(["adminRole"], this.state.roles)) {
      if (!this.state.type) {
        return Modal.warn({
          title: "提示",
          content: "请选择所属单位"
        });
      }
    }

    this.listData(1, 10, this.state.type, this.state.name);
  }
  unsub: Unsubscribe;
  componentWillMount() {
    this.unsub = store.subscribe(() => {
      if (store.getState().user.src_roles !== undefined) {
        this.setState(
          {
            user: store.getState().user,
            roles: store.getState().user.src_roles,
            dept: store.getState().user.src_dept
          },
          () => {
            if (checkRole.check(["adminRole"], this.state.roles)) {
              this.listDept();
            } else {
              this.listData(1, 10, this.state.dept.id, "");
            }
          }
        );
      }
    });
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "personmanage"
    });
  }
}
