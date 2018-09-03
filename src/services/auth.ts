import { LoginRequest } from "../interfaces/request";
import {
  BaseResponse,
  LoginResponse,
  CheckLoginResponse
} from "../interfaces/response";
import httpService from "./http";

export default new class {
  /**
   * 用户登录
   * @param name
   * @param pwd
   */
  login(name: string, pwd: string) {
    return httpService.post<LoginResponse, LoginRequest>("/api/user/Login", {
      name,
      pwd
    });
  }
  CheckLogin() {
    return httpService.post<CheckLoginResponse>("/api/user/CheckLogin", {});
  }
  checkLoginByThird(ssoid: string) {
    return httpService.post<CheckLoginResponse>("/api/user/CheckLogin", {
      ssoid
    });
  }

  /**
   * 注销登录
   */
  logout() {
    return httpService.post<BaseResponse>("/api/user/logout", {});
  }
}();
