import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { UpdatehistoryInfo } from "../../interfaces/model";
import { Pagination, Button, Table, message, Modal } from "antd";
import { ColumnProps } from "antd/lib/table";
import moment from "moment";
import checkcode from "../../services/check-role";
import companyService from "../../services/company";
import store from "../../store";
import "./style.less";
interface Props {
  id: string;
}
interface State {
  rows?: UpdatehistoryInfo[];
  total: number;
  current: number;
}

export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    return (
      <div className="hidden-table">
        <Button
          type="primary"
          onClick={this.back.bind(this)}
          style={{ marginBottom: 30 }}
        >
          返回上一层
        </Button>
        <Table
          pagination={false}
          dataSource={this.state.rows}
          columns={this.columns}
          rowKey="audit_id"
          scroll={this.scroll}
          bordered
          style={{ width: 4000 }}
        />
        <Pagination
          showTotal={total => `共 ${total} 条`}
          onChange={(page: number) => {
            this.setState({
              current: page
            });
            this.listupdatecompany(page, 10);
          }}
          current={this.state.current}
          pageSize={10}
          onShowSizeChange={(current, size) => {}}
          total={this.state.total}
          style={{ marginTop: 30 }}
        />
      </div>
    );
  }
  state: State = {
    rows: [],
    total: 0,
    current: 1
  };
  scroll: { x: 1000 };
  back() {
    this.props.history.goBack();
  }
  columns: ColumnProps<UpdatehistoryInfo>[] = [
    {
      title: "更新时间",
      dataIndex: "",
      render(text, record) {
        return record.ctime === 0
          ? "最新数据"
          : moment(record.ctime).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    {
      title: "企业名称",
      dataIndex: "company.name"
    },
    {
      title: "注册地址",
      dataIndex: "company.register_address"
    },
    {
      title: "注册资本（万元）",
      dataIndex: "",
      render(text, record) {
        return record.company.registered_capital / 100;
      }
    },
    {
      title: "经营范围",
      dataIndex: "company.business_scope"
    },
    {
      title: "从业人员数（人）",
      dataIndex: "company.employee_number"
    },
    {
      title: "企业控股情况",
      dataIndex: "",
      render(text, record) {
        return checkcode.businessholdings(record.company.business_holdings);
      }
    },
    {
      title: "企业营业状态",
      dataIndex: "",
      render(text, record) {
        return checkcode.businessstatus(record.company.business_status);
      }
    },
    {
      title: "注册时间",
      dataIndex: "",
      render(text, record) {
        return moment(record.company.register_time * 1000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    },
    {
      title: "企业联系人",
      dataIndex: "company.contract"
    },
    {
      title: "联系方式",
      dataIndex: "company.contract_method"
    },
    {
      title: "产业划分",
      dataIndex: "",
      render(text, record) {
        return checkcode.buildingbusiness(record.company.property_type);
      }
    },
    {
      title: "行业划分",
      dataIndex: "",
      render(text, record) {
        return checkcode.checkindustrytype(
          checkcode.optionindustrytype(record.company.industry_type)
        );
      }
    },
    {
      title: "机构类型",
      dataIndex: "",
      render(text, record) {
        return checkcode.checkorganizationtype(
          record.company.organization_type
        );
      }
    },
    {
      title: "是否在名录库",
      dataIndex: "",
      render(text, record) {
        return checkcode.ischeck(record.company.isStorehouse);
      }
    },
    {
      title: "是否为统计联网直报单位",
      dataIndex: "",
      render(text, record) {
        return checkcode.ischeck(record.company.isNetwork);
      }
    },
    {
      title: "是否区内注册",
      dataIndex: "",
      render(text, record) {
        return checkcode.ischeck(record.company.isRegister);
      }
    },
    {
      title: "是否区内纳税",
      dataIndex: "",
      render(text, record) {
        return checkcode.ischeck(record.company.isTaxes);
      }
    },
    {
      title: "纳税地",
      dataIndex: "",
      render(text, record) {
        return checkcode.checktaxable(record.company.taxable);
      }
    },
    {
      title: "营业收入（万元）",
      dataIndex: "company.operating_income"
    },
    {
      title: "年纳税额(万元)",
      dataIndex: "company.tax_amount"
    },
    {
      title: "房号",
      dataIndex: "company.floor_number"
    },
    {
      title: "租售方式",
      dataIndex: "",
      render(text, record) {
        return record.company.entry_method === 0 ? "租赁" : "购买";
      }
    },
    {
      title: "租约期限",
      dataIndex: "",
      render(text, record) {
        return record.company.rent_expires === 0
          ? null
          : moment(record.company.rent_expires * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            );
      }
    },
    {
      title: "面积（m²）",
      dataIndex: "company.area"
    },
    {
      title: "企业入驻时间",
      dataIndex: "",
      render(text, record) {
        return moment(record.company.business_entry_time * 1000).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    },
    {
      title: "是否有意向迁出",
      dataIndex: "company.isQuit"
    },
    {
      title: "企业意向迁出时间",
      dataIndex: "",
      render(text, record) {
        return record.company.quit_time === 0
          ? null
          : moment(record.company.quit_time * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            );
      }
    },
    {
      title: "企业迁出状态",
      dataIndex: "",
      render(text, record) {
        return checkcode.quitestatus(record.company.quit_status);
      }
    }
  ];
  randomNum(n: number) {
    let t = "";
    for (var i = 0; i < n; i++) {
      t += Math.floor(Math.random() * 10);
    }
    return parseInt(t);
  }
  async listupdatecompany(pageIndex: number, pageSize: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await companyService.listUpdatedCompany(
        parseInt(this.props.match.params.id),
        pageIndex,
        pageSize
      );

      if (data.stat == "ok") {
        if (data.items.length > 0) {
          let companyInfo = await companyService.getCompanyInfo(
            data.items[0].company.id
          );
          let opt: UpdatehistoryInfo = {
            audit_id: this.randomNum(5),
            company: companyInfo.item,
            ctime: 0,
            op_method: null,
            oper: null
          };
          data.items.splice(0, 0, opt);
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
            message.info("无更新历史数据");
          }, 500);
        }
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
      menu: "company"
    });
    this.listupdatecompany(1, 10);
  }
}
