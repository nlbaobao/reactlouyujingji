import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Unsubscribe } from "redux";
import { CompanyInfo, UserInfo, Role } from "../../interfaces/model";
import { SearchCompanyRequest } from "../../interfaces/request";
import checkRole from "../../services/check-role";
import {
  Button,
  Form,
  Table,
  message,
  Menu,
  Dropdown,
  Icon,
  Modal,
  Pagination
} from "antd";
import { ColumnProps } from "antd/lib/table";
import checkcode from "../../services/check-role";
import companyService from "../../services/company";
import store from "../../store";
import "./style.less";
interface Props {
  id: string;
  opt: string;
  bulidingid: string;
}
interface State {
  rows?: CompanyInfo[];
  name: string;
  street: string;
  buildingname: string;
  roles: Role[];
  user: UserInfo;
  currentPage: number;
  total: number;
}

export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    return (
      <div className="company-top">
        <div className="add-company">
          <Form layout="inline">
            <Form.Item>
              <Button type="primary" onClick={this.search.bind(this)}>
                搜索企业
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="cpmpany-table">
          <Table
            pagination={false}
            dataSource={this.state.rows}
            columns={this.columns}
            rowKey="id"
          />
          <Pagination
            style={{ marginTop: 30 }}
            showTotal={total => `共 ${total} 家`}
            onChange={(page: number) => {
              this.setState({
                currentPage: page
              });
              this.listcompany({ pageIndex: page, pageSize: 10 });
            }}
            current={this.state.currentPage}
            pageSize={10}
            total={this.state.total}
          />
        </div>
      </div>
    );
  }
  state: State = {
    rows: [],
    name: "",
    street: "",
    buildingname: "",
    roles: [],
    user: {},
    currentPage: 1,
    total: 0
  };
  columns: ColumnProps<CompanyInfo>[] = [
    {
      title: "企业名称",
      dataIndex: "name"
    },
    {
      title: "所属楼宇",
      dataIndex: "srcBuilding.name"
    },
    {
      title: "所属街道",
      dataIndex: "srcStreet.name"
    },
    {
      title: "机构类型",
      dataIndex: "organization_type",
      render: (text, record) => {
        return checkRole.checkorganizationtype(record.organization_type);
      }
    },
    {
      title: "企业人数",
      dataIndex: "employee_number"
    },
    {
      title: "是否统计联网直报单位",
      dataIndex: "isNetwork",
      render: (text, record) => {
        if (record.isNetwork) {
          return <div>是</div>;
        } else {
          return <div>否</div>;
        }
      }
    },
    {
      title: "操作",
      render: (text, record) => {
        let menu: any = null;
        if (checkRole.check(["streetBuildingManager"], this.state.roles)) {
          const menuBuidingHead = (
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
                    this.editcompany(record);
                  }}
                >
                  更正企业信息
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.updatecompany(record);
                  }}
                >
                  更新企业信息
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.detailhistory(record);
                  }}
                >
                  企业更新历史
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.deletecompany(record);
                  }}
                >
                  删除企业信息
                </a>
              </Menu.Item>
            </Menu>
          );
          menu = menuBuidingHead;
        } else {
          const menuMerchants = (
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
                    this.detailhistory(record);
                  }}
                >
                  企业更新历史
                </a>
              </Menu.Item>
            </Menu>
          );
          menu = menuMerchants;
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
  deletecompany(record: CompanyInfo) {
    const ids: number[] = [];
    ids.push(record.id);
    let opt = {
      companyIds: ids
    };
    Modal.confirm({
      title: "提示",
      content: `确定要删除用户 ${record.name} 吗？`,
      onOk: async () => {
        try {
          let data = await companyService.deleteCompanies(opt);
          if (data.stat == "ok") {
            setTimeout(() => {
              message.success("删除成功");
            }, 200);
            this.listcompany({ pageIndex: 1, pageSize: 10 });
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
    });
  }
  async listcompany(opt?: SearchCompanyRequest) {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await companyService.searchCompany(
        this.props.match.params.opt
          ? JSON.parse(this.props.match.params.opt)
          : opt
      );
      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 500);
      if (data.stat == "ok") {
        this.setState({
          rows: data.items,
          total: data.total
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
  detailhistory(record: CompanyInfo) {
    this.props.history.push(`/home/company/history/${record.id}`);
  }
  go(record: CompanyInfo) {
    this.props.history.push(`/home/company/detail/${record.id}`);
  }
  editcompany(record: CompanyInfo) {
    this.props.history.push(`/home/company/creat/${record.id}`);
  }
  updatecompany(record: CompanyInfo) {
    this.props.history.push(`/home/company/update/${record.id}`);
  }
  search() {
    this.props.history.push(`/home/company/search`);
  }
  unsub: Unsubscribe;
  componentWillMount() {
    this.unsub = store.subscribe(() => {
      let roles = store.getState().user.src_roles;
      if (roles !== undefined) {
        this.setState({
          roles: store.getState().user.src_roles || []
        });
      }
    });
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "company"
    });
    if (
      this.props.match.path ==
      "/home/company/buildingList/companylist/:bulidingid"
    ) {
      this.listcompany({
        src_buildingId: parseInt(this.props.match.params.bulidingid),
        pageIndex: 1,
        pageSize: 10
      });
    } else {
      this.listcompany({ pageIndex: 1, pageSize: 10 });
    }
  }
}
