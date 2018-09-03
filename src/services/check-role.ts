import { Role } from "../interfaces/model";
import { Modal } from "antd";
export default new class {
  check(checked: string[], roles: Role[]) {
    let roleNames = roles.map(item => item.name);
    let hasRight = true;
    checked.forEach(item => {
      if (roleNames.indexOf(item) < 0) {
        hasRight = false;
      }
    });
    return hasRight && roleNames.length > 0;
  }
  checkpart(checked: string[], roles: Role[]) {
    let roleNames = roles.map(item => item.name);
    let hasRight = false;
    checked.forEach(item => {
      if (roleNames.indexOf(item) > -1) {
        hasRight = true;
      }
    });
    return hasRight && roleNames.length > 0;
  }
  checkerrcode(code: string) {
    let opt = {
      AccessForbidden: "没有权限访问",
      AccountAndPasswordError: "账号或者密码错误",
      BadRoleId: "参数错误",
      BuildingAndFloorNotMatch: "状态不匹配",
      BuildingNeedSetManager: "需要先设置楼长",
      DeleteStatusNotMatch: "已经被删除",
      DeptReferRoleNotFound: "角色没有关联部门",
      DeptUserNotFound: "部门用户没有找到",
      FloorAreaNotEnough: "楼层面积不够",
      ICheckRightObjectNotFound: "自义定权限模板类没有继承ICheckRight",
      ProjectCreateNotMatch: "项目的创建者不匹配",
      RightNotFound: "权限没有找到",
      SetBuildingStatusNotMatch: "设置楼宇状态不匹配",
      SetRoleUserAlreadyExisted: "角色用户已经存在",
      SetUserRootRoleNotMatch: "设置用户管理员角色与用户部门角色不匹配",
      TokenNotFound: "用户没有登录",
      UserAlreadyHasDept: "用户已经存在部门了",
      UserDpetNotFound: "用户部门没有找到",
      UserNotFound: "用户没有找到",
      BadParamsFloorList: "楼层信息的参数错误",
      ProjectNotFound: "项目没有找到",
      DeptTypeNotMatch: "部门类型不匹配",
      AddCompanyAlreadyExisted: "添加的企业已经存在",
      BadParamsLevel: "错误的楼层层数信息",
      LevelFloorAlreadyExisted: "此楼层层数已经存在",
      DeptNotFound: "部门没有找到"
    };
    if (code == "AccessForbidden") {
      Modal.error({
        title: "提示",
        content: opt.AccessForbidden
      });
    }
    if (code == "AccountAndPasswordError") {
      Modal.error({
        title: "提示",
        content: opt.AccountAndPasswordError
      });
    }
    if (code == "BadRoleId") {
      Modal.error({
        title: "提示",
        content: opt.BadRoleId
      });
    }
    if (code == "BuildingNeedSetManager") {
      Modal.error({
        title: "提示",
        content: opt.BuildingNeedSetManager
      });
    }
    if (code == "DeleteStatusNotMatch") {
      Modal.error({
        title: "提示",
        content: opt.DeleteStatusNotMatch
      });
    }
    if (code == "DeptReferRoleNotFound") {
      Modal.error({
        title: "提示",
        content: opt.DeptReferRoleNotFound
      });
    }
    if (code == "DeptUserNotFound") {
      Modal.error({
        title: "提示",
        content: opt.DeptUserNotFound
      });
    }
    if (code == "FloorAreaNotEnough") {
      Modal.error({
        title: "提示",
        content: opt.FloorAreaNotEnough
      });
    }
    if (code == "ICheckRightObjectNotFound") {
      Modal.error({
        title: "提示",
        content: opt.AccessForbidden
      });
    }
    if (code == "ProjectCreateNotMatch") {
      Modal.error({
        title: "提示",
        content: opt.ProjectCreateNotMatch
      });
    }
    if (code == "RightNotFound") {
      Modal.error({
        title: "提示",
        content: opt.RightNotFound
      });
    }
    if (code == "SetBuildingStatusNotMatch") {
      Modal.error({
        title: "提示",
        content: opt.SetBuildingStatusNotMatch
      });
    }
    if (code == "SetRoleUserAlreadyExisted") {
      Modal.error({
        title: "提示",
        content: opt.SetRoleUserAlreadyExisted
      });
    }
    if (code == "SetUserRootRoleNotMatch") {
      Modal.error({
        title: "提示",
        content: opt.SetUserRootRoleNotMatch
      });
    }
    if (code == "TokenNotFound") {
      Modal.error({
        title: "提示",
        content: opt.TokenNotFound
      });
    }
    if (code == "UserAlreadyHasDept") {
      Modal.error({
        title: "提示",
        content: opt.UserAlreadyHasDept
      });
    }
    if (code == "UserDpetNotFound") {
      Modal.error({
        title: "提示",
        content: opt.UserDpetNotFound
      });
    }
    if (code == "UserNotFound") {
      Modal.error({
        title: "提示",
        content: opt.UserNotFound
      });
    }
    if (code == "BadParamsFloorList") {
      Modal.error({
        title: "提示",
        content: opt.BadParamsFloorList
      });
    }
    if (code == "ProjectNotFound") {
      Modal.error({
        title: "提示",
        content: opt.ProjectNotFound
      });
    }
    if (code == "DeptTypeNotMatch") {
      Modal.error({
        title: "提示",
        content: opt.DeptTypeNotMatch
      });
    }
    if (code == "AddCompanyAlreadyExisted") {
      Modal.error({
        title: "提示",
        content: opt.AddCompanyAlreadyExisted
      });
    }
    if (code == "BadParamsLevel") {
      Modal.error({
        title: "提示",
        content: opt.BadParamsLevel
      });
    }
    if (code == "LevelFloorAlreadyExisted") {
      Modal.error({
        title: "提示",
        content: opt.LevelFloorAlreadyExisted
      });
    }
    if (code == "DeptNotFound") {
      Modal.error({
        title: "提示",
        content: opt.DeptNotFound
      });
    }
  }
  checkorganizationtype(type: string) {
    if (type == "10") {
      return "企业";
    }
    if (type == "20") {
      return "事业单位";
    }
    if (type == "30") {
      return "机关";
    }
    if (type == "40") {
      return "事业团体";
    }
    if (type == "52") {
      return "基金会";
    }
    if (type == "53") {
      return "居委会";
    }
    if (type == "54") {
      return "村委会";
    }
    if (type == "55") {
      return "分支机构";
    }
    if (type == "56") {
      return "办事处";
    }
    if (type == "90") {
      return "其他组织机构";
    }
  }
  checkindustrytype(type: string) {
    if (type == "A") {
      return "农业";
    }
    if (type == "B") {
      return "工业";
    }
    if (type == "C") {
      return "建筑业";
    }
    if (type == "D") {
      return "运输邮电业";
    }
    if (type == "E") {
      return "批发和零售业";
    }
    if (type == "F") {
      return "其他零售业";
    }
    if (type == "S") {
      return "住宿和餐饮业";
    }
    if (type == "X") {
      return "房地产业";
    }
    if (type == "U") {
      return "其他";
    }
  }
  businessstatus(type: string) {
    if (type == "1") {
      return "营业";
    }
    if (type == "2") {
      return "停业(歇业)";
    }
    if (type == "3") {
      return "筹建";
    }
    if (type == "4") {
      return "当年关闭";
    }
    if (type == "5") {
      return "当年破产";
    }
    if (type == "9") {
      return "其他";
    }
  }
  checkpropertytype(type: string) {
    if (type == "0") {
      return "商贸业";
    }
    if (type == "1") {
      return "服务业";
    }
    if (type == "2") {
      return "工业";
    }
    if (type == "3") {
      return "建筑业";
    }
    if (type == "4") {
      return "房地产业";
    }
  }
  projcectStatus(type: string) {
    if (type == "1") {
      return "再谈";
    }
    if (type == "2") {
      return "已落户";
    }
    if (type == "3") {
      return "未落户";
    }
  }
  quitestatus(type: string) {
    if (type == "") {
      return "";
    }
    if (type == "A") {
      return "未签约";
    }
    if (type == "B") {
      return "已签约";
    }
  }
  deliverystandard(type: string) {
    if (type == "") {
      return "";
    }
    if (type == "2") {
      return "毛坯";
    }
    if (type == "3") {
      return "精装";
    }
  }
  ischeck(type: boolean) {
    if (type === null) {
      return "";
    }
    if (type == true) {
      return "是";
    }
    if (type == false) {
      return "否";
    }
  }
  modelofoperation(type: string) {
    if (type == "") {
      return "";
    }
    if (type == "2") {
      return "租";
    }
    if (type == "3") {
      return "售";
    }
    if (type == "4") {
      return "租售结合";
    }
  }
  businesScale(type: string) {
    if (type == "1") {
      return "1-19人";
    }
    if (type == "2") {
      return "20-99人";
    }
    if (type == "3") {
      return "100-299人";
    }
    if (type == "4") {
      return "300-499人";
    }
    if (type == "5") {
      return " 500-999人";
    }
    if (type == "6") {
      return "1000人";
    }
  }
  buildingbusiness(type: string) {
    if (type == "1") {
      return "其他";
    }
    if (type == "2") {
      return "工业服务业";
    }
    if (type == "3") {
      return "商贸业";
    }
    if (type == "4") {
      return "健康医疗产业";
    }
    if (type == "5") {
      return " 互联网产业";
    }
    if (type == "0") {
      return "金融业";
    }
  }
  businessholdings(type: string) {
    if (type == "1") {
      return "国有控股";
    }
    if (type == "2") {
      return "集体控股";
    }
    if (type == "3") {
      return "私人控股";
    }
    if (type == "4") {
      return "港澳台商控股";
    }
    if (type == "5") {
      return "外商控股";
    }
    if (type == "9") {
      return "其他";
    }
  }
  projectType(type: string) {
    if (type == "1") {
      return "市内新注册";
    }
    if (type == "2") {
      return "市内迁转";
    }
    if (type == "3") {
      return "市内仅办公";
    }
    if (type == "4") {
      return "市外新注册";
    }
    if (type == "5") {
      return "市外迁转";
    }
    if (type == "6") {
      return "市外仅办公";
    }
    if (type == "7") {
      return "境外新注册";
    }
    if (type == "8") {
      return "境外迁转";
    }
    if (type == "9") {
      return "境外仅办公";
    }
  }
  checktaxable(type: string) {
    if (type == "1") {
      return "江岸区";
    }
    if (type == "2") {
      return "江汉区";
    }
    if (type == "3") {
      return "硚口区";
    }
    if (type == "4") {
      return "汉阳区";
    }
    if (type == "5") {
      return "武昌区";
    }
    if (type == "6") {
      return "洪山区";
    }
    if (type == "7") {
      return "青山区";
    }
    if (type == "8") {
      return "东西湖区";
    }
    if (type == "9") {
      return "蔡甸区";
    }
    if (type == "10") {
      return "江夏区";
    }
    if (type == "11") {
      return "黄陂区";
    }
    if (type == "12") {
      return "新洲区";
    }
    if (type == "13") {
      return "汉南区";
    }
    if (type == "14") {
      return "其它";
    }
  }
  optionindustrytype(type: string) {
    if (type == "A") {
      return "A";
    }
    if (type == "B") {
      return "B";
    }
    if (type == "C") {
      return "C";
    }
    if (type == "D") {
      return "D";
    }
    if (type == "E") {
      return "E";
    }
    if (type == "F") {
      return "F";
    }
    if (type == "S") {
      return "S";
    }
    if (type == "X") {
      return "X";
    } else {
      return "U";
    }
  }
}();
