import * as React from "react";
import { RouteComponentProps, Route } from "react-router";
import { Menu, Button, message, Modal, Badge } from "antd";
import { ClickParam } from "antd/lib/menu";
import { Unsubscribe } from "redux";
import companService from "../../services/company";
import { UserInfo, Role, Dept } from "../../interfaces/model";
import "./style.less";
import checkRole from "../../services/check-role";
import roleService from "../../services/role";
import store from "../../store";
import authService from "../../services/auth";
import projectService from "../../services/project";
import MapComponent from "../map";
import MapbuildingComponet from "../map/building";
import MapfloorComponet from "../map/floor";
import MapfloorDetailComponet from "../map/floor-detail";
import CompanyComponent from "../company";
import BuildingMap from "../building/map";
import ProjectComponent from "../project";
import BuildingComponent from "../building";
import BuildingManageComponent from "../building/manage";
import MerchantsComponent from "../merchants";
import StatisticComponent from "../statistic";
import CdetailComponent from "../company/detail";
import HistoryComponent from "../company/updatehistory";
import CreatComponent from "../company/creat";
import SearchBuilingComponent from "../search/search";
import SearchCompanyComponent from "../search/company";
import HistoryCompanyComponent from "../company/history";
import ProjectDeatilComponent from "../project/detail";
import ProjectAddComponent from "../project/add";
import ActiveCompanyComponent from "../company/active";
import EntryBuildingComponent from "../building/entry";
import EntryFloorComponent from "../building/floorentry";
import EditFloorComponent from "../building/floor-edit";
import CreatEditComponent from "../company/creat-edit";
import PersonmanageComponent from "../person/index";
import AuditbuildingComponent from "../person/auditbuilding";
import AuditcompanyComponent from "../person/auditcompany";
interface State {
  menu: string[];
  user: UserInfo;
  roles: Role[];
  depts: Dept;
  totalquite: number;
  totalmovein: number;
}
export default class extends React.Component<RouteComponentProps<any>> {
  render() {
    const SubMenu = Menu.SubMenu;
    let MenuList: JSX.Element = null;
    if (checkRole.check(["adminRole"], this.state.roles)) {
      MenuList = (
        <Menu
          mode="inline"
          selectedKeys={this.state.menu}
          className="home-menu"
          onClick={this.menuClick.bind(this)}
        >
          <Menu.Item key="personmanage">人员管理</Menu.Item>
          <Menu.Item key="auditbuilding">楼宇审计</Menu.Item>
          <Menu.Item key="auditcompany">企业审计</Menu.Item>
        </Menu>
      );
    }
    if (this.state.depts.type == 1) {
      MenuList = (
        <Menu
          mode="inline"
          selectedKeys={this.state.menu}
          className="home-menu"
          onClick={this.menuClick.bind(this)}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="map">楼宇地图</Menu.Item>
            <Menu.Item key="company">企业列表</Menu.Item>
            <Menu.Item key="statistic">统计数据</Menu.Item>
            {checkRole.check(["investmentBuildingRole"], this.state.roles) ? (
              <Menu.Item key="building">楼宇管理</Menu.Item>
            ) : null}
            <Menu.Item key="buildingList">楼宇列表</Menu.Item>
            <Menu.Item key="project">
              <Badge count={this.state.totalmovein}>意向项目&nbsp;&nbsp;</Badge>
            </Menu.Item>
            <Menu.Item key="activeenterprise">
              <Badge count={this.state.totalquite}>
                意向迁出企业&nbsp;&nbsp;
              </Badge>
            </Menu.Item>
            <Menu.Item key="personmanage">用户管理</Menu.Item>
          </SubMenu>
        </Menu>
      );
    }
    // 街道与园区
    if (this.state.depts.type == 2) {
      MenuList = (
        <Menu
          mode="inline"
          selectedKeys={this.state.menu}
          className="home-menu"
          onClick={this.menuClick.bind(this)}
        >
          <Menu.Item key="buildingList">楼宇列表</Menu.Item>
          <Menu.Item key="company">企业列表</Menu.Item>
          <Menu.Item key="statistic">统计数据</Menu.Item>
          <Menu.Item key="project">
            <Badge count={this.state.totalmovein}>意向项目&nbsp;&nbsp;</Badge>
          </Menu.Item>
          <Menu.Item key="activeenterprise">
            <Badge count={this.state.totalquite}>
              意向迁出企业&nbsp;&nbsp;
            </Badge>
          </Menu.Item>
          {checkRole.check(["streetSetRoleUser"], this.state.roles) ? (
            <Menu.Item key="personmanage">用户管理</Menu.Item>
          ) : null}
        </Menu>
      );
    }
    // 经信局
    if (this.state.depts.type == 3) {
      MenuList = (
        <Menu
          mode="inline"
          selectedKeys={this.state.menu}
          className="home-menu"
          onClick={this.menuClick.bind(this)}
        >
          <Menu.Item key="map">楼宇地图</Menu.Item>
          <Menu.Item key="company">企业列表</Menu.Item>
          <Menu.Item key="statistic">统计数据</Menu.Item>
          <Menu.Item key="buildingList">楼宇列表</Menu.Item>
          <Menu.Item key="activeenterprise">
            <Badge count={this.state.totalquite}>
              意向迁出企业&nbsp;&nbsp;
            </Badge>
          </Menu.Item>
          {checkRole.check(["EconomicProjectMangaer"], this.state.roles) ? (
            <Menu.Item key="project">
              <Badge count={this.state.totalmovein}>意向项目&nbsp;&nbsp;</Badge>
            </Menu.Item>
          ) : null}
          {checkRole.check(["EconomicSetRoleUser"], this.state.roles) ? (
            <Menu.Item key="personmanage">用户管理</Menu.Item>
          ) : null}
        </Menu>
      );
    }
    // 财政局
    if (this.state.depts.type == 4) {
      MenuList = (
        <Menu
          mode="inline"
          selectedKeys={this.state.menu}
          className="home-menu"
          onClick={this.menuClick.bind(this)}
        >
          <Menu.Item key="map">楼宇地图</Menu.Item>
          <Menu.Item key="company">企业列表</Menu.Item>
          <Menu.Item key="buildingList">楼宇列表</Menu.Item>
          <Menu.Item key="activeenterprise">
            <Badge count={this.state.totalquite}>
              意向迁出企业&nbsp;&nbsp;
            </Badge>
          </Menu.Item>
          <Menu.Item key="statistic">统计数据</Menu.Item>
          {checkRole.check(["FinanceSetRoleUser"], this.state.roles) ? (
            <Menu.Item key="personmanage">
              用户管理 EconomicProjectMangaer
            </Menu.Item>
          ) : null}
        </Menu>
      );
    }

    if (this.state.depts.type == 5) {
      MenuList = (
        <Menu
          mode="inline"
          selectedKeys={this.state.menu}
          className="home-menu"
          onClick={this.menuClick.bind(this)}
        >
          <Menu.Item key="map">楼宇地图</Menu.Item>
          <Menu.Item key="company">企业列表</Menu.Item>
          <Menu.Item key="buildingList">楼宇列表</Menu.Item>
          <Menu.Item key="activeenterprise">
            <Badge count={this.state.totalquite}>
              意向迁出企业&nbsp;&nbsp;
            </Badge>
          </Menu.Item>
          <Menu.Item key="statistic">统计数据</Menu.Item>
          {checkRole.check(["StatisticsSetRoleUser"], this.state.roles) ? (
            <Menu.Item key="personmanage">用户管理</Menu.Item>
          ) : null}
        </Menu>
      );
    }

    return (
      <div className="home-layout">
        <div className="home-header">
          <div className="home-logo">
            硚口区楼宇经济大数据管理平台
            <Button className="logout-btn" onClick={() => this.logout()}>
              注销登录
            </Button>
          </div>
        </div>
        <div>
          <div className="home-sider">{MenuList}</div>
          <div className="home-content">
            <Route
              path={`${this.props.match.url}/map`}
              exact
              component={MapComponent}
            />
            <Route
              path={`${this.props.match.url}/map/building/:id`}
              exact
              component={MapbuildingComponet}
            />
            <Route
              path={`${this.props.match.url}/map/building/floor/:id`}
              component={MapfloorComponet}
            />
            <Route
              path={`${this.props.match.url}/map/floor/floordetail/:id`}
              component={MapfloorDetailComponet}
            />
            <Route
              path={`${this.props.match.url}/company`}
              exact
              component={CompanyComponent}
            />
            <Route
              path={`${
                this.props.match.url
              }/company/buildingList/companylist/:bulidingid`}
              exact
              component={CompanyComponent}
            />
            <Route
              path={`${this.props.match.url}/activeenterprise`}
              exact
              component={ActiveCompanyComponent}
            />
            <Route
              path={`${this.props.match.url}/company/detail/:id`}
              component={CdetailComponent}
            />
            <Route
              path={`${this.props.match.url}/company/historycompanyInfo/:id`}
              component={CdetailComponent}
            />
            <Route
              path={`${this.props.match.url}/company/creat/:id/:name/:street`}
              exact
              component={CreatComponent}
            />
            <Route
              path={`${this.props.match.url}/company/creat/:id`}
              exact
              component={CreatEditComponent}
            />
            <Route
              path={`${this.props.match.url}/company/update/:id`}
              exact
              component={CreatEditComponent}
            />
            <Route
              path={`${
                this.props.match.url
              }/company/buildingList/historycompany/:id`}
              component={HistoryCompanyComponent}
            />
            <Route
              path={`${this.props.match.url}/company/edit/:id`}
              component={CreatComponent}
            />
            <Route
              path={`${this.props.match.url}/company/history/:id`}
              component={HistoryComponent}
            />
            <Route
              path={`${this.props.match.url}/company/search`}
              component={SearchCompanyComponent}
            />
            <Route
              path={`${this.props.match.url}/company/searchresult/:opt`}
              component={CompanyComponent}
            />
            <Route
              path={`${this.props.match.url}/project/detail/:id`}
              component={ProjectDeatilComponent}
            />
            <Route
              path={`${this.props.match.url}/project`}
              exact
              component={ProjectComponent}
            />
            <Route
              path={`${this.props.match.url}/project/:buildingId`}
              exact
              component={ProjectComponent}
            />
            <Route
              path={`${this.props.match.url}/project/activeproject/:buildingid`}
              exact
              component={ProjectComponent}
            />
            <Route
              path={`${this.props.match.url}/project/edit/:id`}
              component={ProjectAddComponent}
            />
            <Route
              path={`${this.props.match.url}/entryproject`}
              component={ProjectAddComponent}
            />
            <Route
              path={`${this.props.match.url}/building`}
              exact
              component={BuildingManageComponent}
            />
            <Route
              path={`${this.props.match.url}/buildingList`}
              exact
              component={BuildingComponent}
            />
            <Route
              path={`${this.props.match.url}/buildinglist/search/:opt`}
              exact
              component={BuildingComponent}
            />
            <Route
              path={`${
                this.props.match.url
              }/buildingList/entryfloor/:floornumber/:id`}
              component={EntryFloorComponent}
            />
            <Route
              path={`${
                this.props.match.url
              }/buildingList/editfloor/:id/:floornumber`}
              component={EditFloorComponent}
            />
            <Route
              path={`${this.props.match.url}/buildingList/entry/:id/:name`}
              exact
              component={EntryBuildingComponent}
            />
            <Route
              path={`${this.props.match.url}/buildingList/edit/:id/:edit/:name`}
              component={EntryBuildingComponent}
            />
            <Route
              path={`${this.props.match.url}/building/search/`}
              component={SearchBuilingComponent}
            />
            <Route
              path={`${this.props.match.url}/building/map/:id/:lng/:lat/:title`}
              component={BuildingMap}
            />
            <Route
              path={`${this.props.match.url}/building/map/addBuilding`}
              exact
              component={BuildingMap}
            />
            <Route
              path={`${this.props.match.url}/merchants`}
              component={MerchantsComponent}
            />
            <Route
              path={`${this.props.match.url}/statistic`}
              component={StatisticComponent}
            />
            <Route
              path={`${this.props.match.url}/personmanage`}
              component={PersonmanageComponent}
            />
            <Route
              path={`${this.props.match.url}/auditbuilding`}
              component={AuditbuildingComponent}
            />
            <Route
              path={`${this.props.match.url}/auditcompany`}
              component={AuditcompanyComponent}
            />
          </div>
        </div>
      </div>
    );
  }

  unsub: Unsubscribe;

  state: State = {
    menu: [],
    user: {},
    roles: [],
    depts: {},
    totalquite: null,
    totalmovein: null
  };

  menuClick(args: ClickParam) {
    store.dispatch({
      type: "SET_MENU",
      menu: args.key
    });
    this.props.history.push("/home/" + args.key);
  }

  async logout() {
    try {
      let result = await authService.logout();
      if (result.stat === "ok") {
        this.props.history.push("/login");
        message.success("注销成功");
        window.location.reload();
      } else {
        checkRole.checkerrcode(result.stat);
      }
    } catch (error) {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  componentDidMount() {
    console.log("woshihome" + "didmoment");
  }
  componentWillMount() {
    this.role();
    this.unsub = store.subscribe(() => {
      if (store.getState().user.src_roles !== undefined) {
        this.setState(
          {
            menu: [store.getState().menu],
            user: store.getState().user,
            roles: store.getState().user.src_roles || [],
            depts: store.getState().user.src_dept || {}
          },
          () => {
            if (checkRole.check(["adminRole"], this.state.roles)) {
            } else {
              this.listcompany();
              this.listproject();
            }
          }
        );
      }
    });
  }

  async role() {
    try {
      let role = await roleService.role();
      if (role.stat === "ok") {
        if (this.props.location.pathname == "/home") {
          if (role.user.src_dept !== null) {
            if (role.user.src_dept.type == 1) {
              this.props.history.push(`/home/map`);
            }
            if (role.user.src_dept.type == 2) {
              this.props.history.push(`/home/buildingList`);
            }
            if (role.user.src_dept.type == 3) {
              this.props.history.push(`/home/map`);
            }
            if (role.user.src_dept.type == 4) {
              this.props.history.push(`/home/map`);
            }
            if (role.user.src_dept.type == 5) {
              this.props.history.push(`/home/map`);
            }
          } else {
            this.props.history.push(`/home/personmanage`);
          }
        }
        store.dispatch({
          type: "SET_USER",
          user: role.user
        });
      } else {
        checkRole.checkerrcode(role.stat);
      }
    } catch (error) {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  async listcompany() {
    try {
      let opt = {
        isQuit: "是"
      };
      let data = await companService.searchCompany(opt);
      if (data.stat == "ok") {
        this.setState({
          totalquite: data.total
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
  async listproject() {
    try {
      let ids = ["1", "3"];
      let data = await projectService.countEntryCompany(ids);
      if (data.stat == "ok") {
        this.setState({
          totalmovein: data.count
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
  componentWillUnmount() {
    this.unsub();
  }
}
