import * as React from "react";
import { UpdatehistoryInfo } from "../../interfaces/model";
import { RouteComponentProps } from "react-router-dom";
import { Table, message, Modal, Pagination } from "antd";
import { ColumnProps } from "antd/lib/table";
import adminService from "../../services/admin";
import store from "../../store";
import checkRole from "../../services/check-role";
import moment from "moment";

interface State {
  rows: UpdatehistoryInfo[];
  total: number;
  currentPage: number
}

export default class extends React.Component<RouteComponentProps<any>, State> {
  render() {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.state.rows}
          pagination={false}
          rowKey="audit_id"
        />
        <Pagination
          showTotal={total => `共 ${total} 条`}
          style={{ marginTop: 30 }}
          onChange={(page: number) => {
            this.setState({
              currentPage:page
            })
            this.listData(page, 10);
          }}
          current = {this.state.currentPage}
          pageSize={10}
          total={this.state.total}
        />
      </div>
    );
  }
  state: State = {
    rows: [],
    total: 0,
    currentPage:1
  };
  columns: ColumnProps<UpdatehistoryInfo>[] = [
    {
      title: "操作时间",
      dataIndex: "",
      render(text, record) {
        return moment(record.ctime).format("YYYY-MM-DD hh:mm:ss");
      }
    },
    {
      title: "操作内容",
      dataIndex: "op_method"
    },
    {
      title: "楼宇名称",
      dataIndex: "buidling.name"
    },
    {
      title: "操作人员",
      dataIndex: "",
      render(text, record) {
        return record.oper ? `${record.oper.nickName}(${record.oper.name}) `: null
      }
    }
  ];

  async listData(pageIndex?: number, pageSize?: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await adminService.adminSearchAuditAllBuilding(
        pageIndex,
        pageSize
      );
      if (data.stat == "ok") {
        if (data.items.length > 0) {
          setTimeout(() => {
            closeLoading();
            message.success("数据加载成功");
          }, 500);
          this.setState({
            rows: data.items,
            total: data.total
          });
        } else {
          setTimeout(() => {
            closeLoading();
            message.info("暂无审计信息");
          }, 500);
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

  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "auditbuilding"
    });
    this.listData(1, 10);
  }
}
