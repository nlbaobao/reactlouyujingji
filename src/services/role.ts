import { LoginRequest, RoleRequest } from "../interfaces/request";
import {
  BaseResponse,
  LoginResponse,
  RoleResponse
} from "../interfaces/response";
import httpService from "./http";

export default new class {
  /**
   * 获取权限
   * @param name
   * @param pwd
   */
  role() {
    return httpService.post<RoleResponse, RoleRequest>("/api/user/GetUserInfo", {
    });
  }
  adminCreateUser(){
    return httpService.post("/api/admin/AdminCreateUser", {
    });
  }
  adminDeleteUser(){
    return httpService.post("/api/admin/AdminDeleteUser", {
    });
  }
  adminSearchUsers(){
    return httpService.post("/api/admin/AdminSearchUsers", {
    });
  }
}();
