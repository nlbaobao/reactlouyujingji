import httpService from "./http";
import store from '../store'
import { UserInfoResponse } from "../interfaces/response";
export default new class {
  getUserInfo() {
    httpService.post<UserInfoResponse>('/api/user/Login',{})
  }
}()
