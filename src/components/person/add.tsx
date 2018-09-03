import * as React from "react";
import { Modal, Button, message, Checkbox, Row, Col } from "antd";
import checkRole from "../../services/check-role";
import { Role, UserInfo } from "../../interfaces/model";
import adminService from "../../services/admin";
interface Props {
  data?: UserInfo;
  roles?: Role[];
  afterClose?: () => void;
  onSuccess?: () => void;
  did?: number;
}
interface State {
  valueroot: string;
  defaultValue: string[];
  defaultValuefalse: string[];
  visible: boolean;
  rows: Role[];
  user: UserInfo;
  delRoleIds: number[];
  isroot: boolean;
}

export default class extends React.Component<Props, State> {
  render() {
    const CheckboxGroup = Checkbox.Group;

    return (
      <Modal
        title={"权限管理"}
        maskClosable={false}
        visible={this.state.visible}
        onCancel={this.close.bind(this)}
        afterClose={this.destroy.bind(this)}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={this.close.bind(this)}>
            取消
          </Button>,
          <Button
            type="primary"
            key="ok"
            onClick={() => {
              this.setAdmin();
            }}
          >
            确定
          </Button>
        ]}
      >
        <div className="radio-middle">
          <Checkbox
            value={this.listrole() ? this.listrole().id : -1}
            onChange={e => {
              this.setState({
                isroot: e.target.checked ? true : false,
                defaultValue: e.target.checked
                  ? this.listoptions(true).map(item => item.value)
                  : [],
                valueroot: e.target.checked ? e.target.value.toString() : ""
              });
            }}
          >
            {this.listrole() ? this.listrole().desc : -1}
          </Checkbox>
          <CheckboxGroup
            options={this.listoptions(true)}
            disabled={this.state.isroot}
            value={this.state.defaultValue}
            onChange={e => {
              this.setState({
                defaultValue: e.map(item => item.toString())
              });
            }}
          />
          <CheckboxGroup
            onChange={e => {
              this.setState({
                defaultValuefalse: e.map(item => item.toString())
              });
            }}
            options={this.listoptions(false)}
          />
        </div>
      </Modal>
    );
  }
  get rolesids() {
    let first = this.props.data.src_roles.map(item => item.id);
    return first;
  }
  state: State = {
    valueroot: "",
    defaultValue: [],
    defaultValuefalse: [],
    isroot: null,
    visible: true,
    rows: [],
    user: {},
    // checkedValues: this.props.data.src_roles
    //   ? this.props.data.src_roles.map(item => item.id)
    //   : [],
    delRoleIds: []
  };

  destroy() {
    if (this.props.afterClose) {
      this.props.afterClose();
    }
  }
  get disabled(): boolean {
    if (this.state.isroot) {
      return true;
    } else {
      return false;
    }
  }
  listrole() {
    let isroot = this.state.rows.filter(item => {
      if (item.isRoot) {
        return true;
      }
    });
    return isroot[0];
  }
  listoptions(flag: boolean) {
    if (flag) {
      let options = this.state.rows
        .filter(item => {
          if (item.isRoot) {
            return false;
          } else {
            return true;
          }
        })
        .filter(item => {
          if (item.setRootRoleIsAdd) {
            return true;
          }
        });

      let IsAddtrue = options.map(item => {
        return {
          value: item.id.toString(),
          label: item.desc
        };
      });
      return IsAddtrue;
    } else {
      let options = this.state.rows
        .filter(item => {
          if (item.isRoot) {
            return false;
          } else {
            return true;
          }
        })
        .filter(item => {
          if (!item.setRootRoleIsAdd) {
            return true;
          }
        });

      let IsAddfalse = options.map(item => {
        return {
          value: item.id.toString(),
          label: item.desc
        };
      });
      return IsAddfalse;
    }
  }
  close() {
    this.setState({
      visible: false
    });
  }
  async listData() {
    try {
      let closeLoading = message.loading("数据加载中");
      let data = null;

      if (checkRole.check(["adminRole"], this.props.roles)) {
        data = await adminService.adminSearchManagerRoleByUser(
          this.props.data.src_dept.id
        );
      } else {
        data = await adminService.SearchManagerRoleByUser();
      }

      setTimeout(() => {
        closeLoading();
        message.success("数据加载成功");
      }, 500);
      if (data.stat == "ok") {
        this.setState(
          {
            rows: data.items
          },
          () => {
            this.listrole();
            this.listoptions(true);
          }
        );
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
  async setAdmin() {
    let checkedValues: number[] = [];
    this.state.valueroot === ""
      ? null
      : this.state.defaultValue.push(this.state.valueroot);
    this.state.defaultValue.push(...this.state.defaultValuefalse);
    let a = this.props.data
      ? this.props.data.src_roles.map(item => item.id)
      : [];
    let del = a.filter(item => {
      if (checkedValues.indexOf(item) < 0) {
        return true;
      }
    });
    try {
      let data = await adminService.setUserRole(
        this.props.data.id,
        this.state.defaultValue.map(item => parseInt(item)),
        del
      );
      if (data.stat == "ok") {
        setTimeout(() => {
          message.success("职能修改成功");
        }, 500);
        this.setState({
          visible: false
        });
        if (this.props.onSuccess) {
          this.props.onSuccess();
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
    this.listData();
  }
}
