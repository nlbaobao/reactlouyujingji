import httpService from "./http";
import { SetRoleRequest } from "../interfaces/request";
import {
  BaseResponse,
  UserRoleResponse,
  DeptResponse,
  UpdatehistoryResponse
} from "../interfaces/response";
export default new class {
  // 获取部门列表
  searchManagerRoleByUser(
    pageIndex?: number,
    pageSize?: number,
    keyword?: string
  ) {
    return httpService.post<UserRoleResponse>(
      "/api/dept/SearchManageDeptUser",
      {
        pageIndex,
        pageSize,
        keyword
      }
    );
  }
  // Admin部门列表
  adminSearchDeptUsers(
    pageIndex?: number,
    pageSize?: number,
    did?: number,
    keyword?: string
  ) {
    return httpService.post<UserRoleResponse>(
      "/api/dept/AdminSearchDeptUsers",
      {
        pageIndex,
        pageSize,
        did,
        keyword
      }
    );
  }
  adminSearchManagerRoleByUser(did: number) {
    return httpService.post<UserRoleResponse>(
      "/api/role/AdminSearchManagerRoleByUser",
      { did }
    );
  }
  SearchManagerRoleByUser() {
    return httpService.post<DeptResponse>(
      "/api/role/SearchManagerRoleByUser",
      {}
    );
  }

  setUserRole(uid: number, roleIds: number[], delRoleIds: number[]) {
    return httpService.post<BaseResponse, SetRoleRequest>(
      "/api/role/SetUserRole",
      { uid, roleIds, delRoleIds }
    );
  }
  getdept(did: number) {
    return httpService.post<UserRoleResponse>(
      "/api/dept/AdminSearchChildrenDept",
      {
        did
      }
    );
  }
  //审计楼宇
  adminSearchAuditAllBuilding(pageIndex?: number, pageSize?: number) {
    return httpService.post<UpdatehistoryResponse>(
      "/api/audit/AdminSearchAuditAllBuilding",
      {
        pageIndex,
        pageSize
      }
    );
  }
  //审计楼宇
  adminSearchAuditBuildingCompnay(
    buildingId: number,
    pageIndex?: number,
    pageSize?: number
  ) {
    return httpService.post<UpdatehistoryResponse>(
      "/api/audit/AdminSearchAuditBuildingCompnay",
      {
        buildingId,
        pageIndex,
        pageSize
      }
    );
  }
}();
