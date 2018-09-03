import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { CompanyInfo, UserInfo, Role } from "../../interfaces/model";
import checkRole from "../../services/check-role";
import { Table, message, Menu, Dropdown, Icon, Modal, Pagination } from "antd";
import { ColumnProps } from "antd/lib/table";
import checkcode from "../../services/check-role";
import companyService from "../../services/company";
import store from "../../store";
import "./style.less";
import moment from "moment";
interface Props {
  id: string;
}
interface State {
  rows?: CompanyInfo[];
  name: string;
  street: string;
  buildingname: string;
  roles: Role[];
  user: UserInfo;
  total: number;
  currentPage: number;
}

export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    return (
      <div className="company-top">
        <div className="add-company" />
        <div className="cpmpany-table">
          <Table
            pagination={false}
            dataSource={this.state.rows}
            columns={this.columns}
            rowKey="id"
          />
          <Pagination
            showTotal={total => `共 ${total} 家`}
            onChange={(page: number) => {
              this.setState({
                currentPage: page
              });
              this.listcompany(page, 10);
            }}
            current={this.state.currentPage}
            pageSize={10}
            total={this.state.total}
            style={{ marginTop: 30 }}
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
    total: 0,
    currentPage: 1
  };
  columns: ColumnProps<CompanyInfo>[] = [
    {
      title: "企业名称",
      dataIndex: "name"
    },
    {
      title: "企业类型",
      dataIndex: "organization_type",
      render: (text, record) => {
        return checkRole.checkorganizationtype(record.organization_type);
      }
    },
    {
      title: "房号",
      dataIndex: "srcStreet.name"
    },
    {
      title: "创建时间",
      dataIndex: "",
      render: (text, record) => {
        return moment(record.business_entry_time * 1000).format("YYYY-MM-DD");
      }
    },
    {
      title: "移除时间",
      dataIndex: "",
      render: (text, record) => {
        return moment(record.del_time).format("YYYY-MM-DD");
      }
    },
    {
      title: "操作",
      render: (text, record) => {
        let menu: any = null;
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
  async listcompany(pageIndex: number, pageSize: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await companyService.ListHistoryCompany(
        parseInt(this.props.match.params.id),
        pageIndex,
        pageSize
      );

      if (data.stat == "ok") {
        setTimeout(() => {
          closeLoading();
          message.success("数据加载成功");
        }, 500);
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

  go(record: CompanyInfo) {
    this.props.history.push(`/home/company/historycompanyInfo/${record.id}`);
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "company"
    });
    this.listcompany(1, 10);
  }
}
