import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Unsubscribe } from "redux";
import {
  Button,
  Table,
  message,
  Menu,
  Dropdown,
  Icon,
  Tabs,
  Modal,
  Pagination
} from "antd";
import { ColumnProps } from "antd/lib/table";
import store from "../../store";
import { ProjectInfo, Role, UserInfo } from "../../interfaces/model";
import "./style.less";
import checktype from "../../services/check-role";
import checkRole from "../../services/check-role";
import projectService from "../../services/project";
interface Props {
  id: string;
  buildingId: string;
  buildingid: string;
}
interface State {
  rows: ProjectInfo[];
  allrows: ProjectInfo[];
  roles: Role[];
  user: UserInfo;
  key: string;
  total: number;
  currentPage: number;
  paheNumber: number;
}
export default class extends React.Component<RouteComponentProps<Props>> {
  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div>
        <Tabs
          type="card"
          onChange={key => {
            this.changeTab(key);
          }}
          tabBarGutter={10}
          defaultActiveKey={"2"}
        >
          {this.filter() === 1 ? null : (
            <TabPane tab="我的项目" key="1">
              {checkRole.checkpart(
                [
                  "investmentProjectMangaer",
                  "EconomicProjectMangaer",
                  "streetProjectMangaer"
                ],
                this.state.roles
              ) ? (
                <Button type="primary" onClick={this.addProject.bind(this)}>
                  新增项目
                </Button>
              ) : null}

              <div className="project-table">
                <Table
                  pagination={false}
                  dataSource={this.state.rows}
                  columns={this.columns}
                  rowKey="id"
                />
              </div>
            </TabPane>
          )}
          <TabPane tab={this.filter() === 1 ? "意向项目" : "全部项目"} key="2">
            {this.filter() === 1 ? (
              <Button onClick={this.goback.bind(this)}>返回上一层</Button>
            ) : null}
            <div className="project-table">
              <Table
                pagination={false}
                dataSource={this.state.rows}
                columns={this.columns}
                rowKey="id"
              />
            </div>
          </TabPane>
        </Tabs>
        <Pagination
          showTotal={total => `共 ${total}个 `}
          style={{ marginTop: 30 }}
          onChange={(page: number) => {
            this.setState({
              currentPage: page
            });
            this.listData(page, 10);
            this.allpeoject(page, 10);
          }}
          current={this.state.currentPage}
          pageSize={10}
          total={this.state.total}
        />
      </div>
    );
  }
  state: State = {
    rows: [],
    roles: [],
    user: {},
    allrows: [],
    key: "2",
    total: 0,
    currentPage: 1,
    paheNumber: 1
  };
  columns: ColumnProps<ProjectInfo>[] = [
    {
      title: "项目名称",
      dataIndex: "name"
    },
    {
      title: "意向楼宇",
      dataIndex: "building.name"
    },
    {
      title: "意向面积",
      dataIndex: "area"
    },
    {
      title: "租售意向",
      dataIndex: "method",
      render: (text, record) => {
        if (record.method == "1") {
          return <div>租赁</div>;
        }
        if (record.method == "2") {
          return <div>购买</div>;
        }
      }
    },
    {
      title: "产业类型",
      dataIndex: "property_type",
      render: (text, record) => {
        return checktype.checkpropertytype(record.property_type);
      }
    },
    {
      title: "状态",
      dataIndex: "project_status",
      render: (text, record) => {
        if (record.project_status == "1") {
          return <div>再谈</div>;
        }
        if (record.project_status == "2") {
          return <div>已落户</div>;
        }
        if (record.project_status == "3") {
          return <div>未落户</div>;
        }
      }
    },
    {
      title: "操作",
      render: (text, record) => {
        let menu: any = null;
        if (this.state.key === "2") {
          const menuBuildingHead: any = (
            <Menu>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.goDetail(record);
                  }}
                >
                  查看项目信息
                </a>
              </Menu.Item>
            </Menu>
          );
          menu = menuBuildingHead;
        } else {
          const menuBuildingHead: any = (
            <Menu>
              <Menu.Item>
                <a
                  onClick={() => {
                    this.goDetail(record);
                  }}
                >
                  查看项目信息
                </a>
              </Menu.Item>
              {checkRole.checkpart(
                [
                  "investmentProjectMangaer",
                  "EconomicProjectMangaer",
                  "streetProjectMangaer"
                ],
                this.state.roles
              ) ? (
                <Menu.Item>
                  <a
                    onClick={() => {
                      this.editProject(record);
                    }}
                  >
                    编辑项目信息
                  </a>
                </Menu.Item>
              ) : null}
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
  filter() {
    if (this.props.match.path === `/home/project/activeproject/:buildingid`) {
      
      return 1;
    }
  }
  check() {
    if (this.props.match.path === `/home/project/:buildingId`) {
      return 1;
    }
  }
  async changeTab(key: string) {
    if (this.check() == 1) {
      if (key == "2") {
        this.setState({
          key: "2"
        });
        this.allpeoject(1, 10, parseInt(this.props.match.params.buildingId));
      }
      if (key == "1") {
        this.setState({
          key: "2"
        });
        this.listData(this.state.currentPage, 10);
      }
    } else if (this.filter() == 1) {
      if (key == "2") {
        this.setState({
          key: "2"
        });
        this.allpeoject(1, 10, parseInt(this.props.match.params.buildingid));
      }
      if (key == "1") {
        this.setState({
          key: "2"
        });
        this.listData(this.state.currentPage, 10);
      }
    } else {
      if (key == "2") {
        this.state.key = "2";
        this.allpeoject(1, 10);
      }
      if (key == "1") {
        this.state.key = "1";
        this.listData(this.state.currentPage, 10);
      }
    }
  }
  goback() {
    this.props.history.goBack();
  }
  async allpeoject(pageIndex: number, pageSize: number, id?: number) {
    try {
      let data = await projectService.SearchAllProject(pageIndex, pageSize, id);
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
  async listData(pageIndex: number, pageSize: number) {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = await projectService.SearchMyProject(pageIndex, pageSize);
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
  deleteProject(record: ProjectInfo) {
    const ids = [];
    ids.push(record.id);
    let opt = {
      projectIds: ids
    };
    Modal.confirm({
      title: "提示",
      content: `确定要删除用户 ${record.name} 吗？`,
      onOk: async () => {
        try {
          let data = await projectService.DeleteProject(opt);
          this.listData(1, 10);
          if (data.stat == "ok") {
            setTimeout(() => {
              message.success("删除成功");
            }, 200);
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
  goDetail(record: ProjectInfo) {
    this.props.history.push(`/home/project/detail/${record.id}`);
  }
  addProject() {
    this.props.history.push(`/home/entryproject`);
  }
  editProject(record: ProjectInfo) {
    this.props.history.push(`/home/project/edit/${record.id}`);
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
      menu: this.filter() === 1 ? "buildingList" : "project"
    });

    if (this.check() === 1) {
      this.allpeoject(1, 10, parseInt(this.props.match.params.buildingId));
    } else if (this.filter() === 1) {
      this.allpeoject(1, 10, parseInt(this.props.match.params.buildingid));
    } else {
      this.allpeoject(1, 10);
    }
  }
}
