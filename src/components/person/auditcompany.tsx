import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  UserInfo,
  BuilldingItem,
  UpdatehistoryInfo
} from "../../interfaces/model";
import { Button, Form, Select, Table, message, Modal, Pagination } from "antd";
import { ColumnProps } from "antd/lib/table";
import adminService from "../../services/admin";
import store from "../../store";
import "./style.less";
import checkRole from "../../services/check-role";
import buildingService from "../../services/building";
import moment from 'moment'

interface State {
  rowsbuilding: BuilldingItem[];
  rows: UpdatehistoryInfo[];
  total: number;
  type: string;
  currentPage: number;
}

export default class extends React.Component<RouteComponentProps<any>, State> {
  render() {
    const Option = Select.Option;
    return (
      <div className="company-top">
        <div className="add-company">
          <Form layout="inline">
            <Form.Item label="所属楼宇">
              <Select
                style={{ width: 200 }}
                placeholder="请选择所属楼宇"
                onChange={(value: string) => {
                  this.setState({
                    type: value
                  });
                }}
              >
                {this.state.rowsbuilding.map(item => {
                  return (
                    <Option key={item.id} value={item.id.toString()}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
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
            rowKey="audit_id"
            pagination={false}
          />
          <Pagination
            showTotal={total => `共 ${total} 条`}
            style={{ marginTop: 30 }}
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
        </div>
      </div>
    );
  }

  state: State = {
    rowsbuilding: [],
    rows: [],
    total: 0,
    type: "",
    currentPage: 1
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
      title: "企业名称",
      dataIndex: "company.name"
    },
    {
      title: "操作人员",
      dataIndex: "",
      render(text, record) {
        return record.oper ? `${record.oper.nickName}(${record.oper.name}) `: null
      }
    }
  ];
  async listBuilding() {
    try {
      let data = await buildingService.adminSearchAllBuilding();
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
  async listData(pageIndex?: number, pageSize?: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await adminService.adminSearchAuditBuildingCompnay(
        parseInt(this.state.type),
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
            message.info("暂无企业审计信息");
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

  search() {
    if (!this.state.type) {
      return Modal.warn({
        title: "提示",
        content: "请选择楼宇"
      });
    }
    this.listData(1, 10);
  }
  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "auditcompany"
    });
    this.listBuilding();
  }
}
