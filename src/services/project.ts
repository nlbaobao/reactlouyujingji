import httpService from "./http";
import {
  CreatProjectRequest,
  BuilidingMnagerRequest
} from "../interfaces/request";
import {
  BaseResponse,
  SearchProjectResponse,
  SetProjectResponse,
  CountprojectResponse
} from "../interfaces/response";
export default new class {
  SearchProject() {
    return httpService.post<any>("/api/project/SearchProject", {});
  }
  CreateProject(opt: CreatProjectRequest) {
    return httpService.post<BaseResponse, CreatProjectRequest>(
      "/api/project/CreateProject",
      opt
    );
  }
  SetProject(opt: CreatProjectRequest) {
    return httpService.post<BaseResponse, CreatProjectRequest>(
      "/api/project/SetProject",
      opt
    );
  }
  DeleteProject(opt: BuilidingMnagerRequest) {
    return httpService.post<BaseResponse>("/api/project/DeleteProject", opt);
  }
  GetProject(projectId: number) {
    return httpService.post<SetProjectResponse>("/api/project/GetProject", {
      projectId
    });
  }
  SearchMyProject(pageIndex?: number, pageSize?: number) {
    return httpService.post<SearchProjectResponse>(
      "/api/project/SearchMyProject",
      {
        pageIndex,
        pageSize
      }
    );
  }
  SearchAllProject(pageIndex?: number, pageSize?: number, buildingId?: number) {
    return httpService.post<SearchProjectResponse>(
      "/api/project/SearchProject",
      {
        pageIndex,
        pageSize,
        buildingId
      }
    );
  }
  // 项目管理标记
  countEntryCompany(project_status?: string[]) {
    return httpService.post<CountprojectResponse>(
      "/api/project/CountEntryCompany",
      {
        project_status
      }
    );
  }
}();
