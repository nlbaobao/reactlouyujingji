import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { CompanyInfo } from "../../interfaces/model";
import { Table, message, Modal, Pagination } from "antd";
import { ColumnProps } from "antd/lib/table";
import store from "../../store";
import "./style.less";
import companService from "../../services/company";
import checkcode from "../../services/check-role";

interface State {
  rows?: CompanyInfo[];
  currentPage: number;
  total: number;
}

export default class extends React.Component<RouteComponentProps<any>, State> {
  render() {
    return (
      <div className="company-top">
        <div className="cpmpany-table">
          <Table
            pagination={false}
            dataSource={this.state.rows}
            columns={this.columns}
            rowKey="id"
          />
          <Pagination
            showTotal={total => `共 ${total} 家`}
            style={{ marginTop: 30 }}
            onChange={(page: number) => {
              this.setState({
                currentPage: page
              });
              this.listcompany(page, 10);
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
      title: "企业类型",
      dataIndex: "organization_type"
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
    }
  ];
  async listcompany(pageIndex: number, pageSize: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let opt = {
        isQuit: "是",
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      let data = await companService.searchCompany(opt);
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
        checkcode.checkerrcode(data.stat);
      }
    } catch {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "activeenterprise"
    });
    this.listcompany(1, 10);
  }
}
