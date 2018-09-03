import httpService from "./http";
import {
  BuildingInfoRequest,
  SearchBuildingRequest,
  GetBuildingRequest,
  SetBuildingRequest,
  BuilidingMnagerRequest
} from "../interfaces/request";
import {
  BuildingInfoResponse,
  GetbuildingResponse,
  BaseResponse,
  SearchSimpleFloorByBuildingResponse,
  StreetListResponse,
  SearchSimpleFloorResponse
} from "../interfaces/response";
import { FloorItem } from "../interfaces/model";
export default new class {
  buildinginfo() {
    return httpService.post<BuildingInfoResponse, BuildingInfoRequest>(
      "/api/building/ListBuildingByLocation",
      {}
    );
  }
  searchBuilding(opt: SearchBuildingRequest) {
    return httpService.post<BuildingInfoResponse, SearchBuildingRequest>(
      "/api/building/SearchBuilding",
      opt
    );
  }
  adminSearchAllBuilding() {
    return httpService.post<BuildingInfoResponse, SearchBuildingRequest>(
      "api/building/AdminSearchAllBuilding",
      {}
    );
  }
  getBuilding(buildingId: number) {
    return httpService.post<GetbuildingResponse, GetBuildingRequest>(
      "/api/building/GetBuilding",
      {
        buildingId
      }
    );
  }
  getSimpleBuilding(buildingId: number) {
    return httpService.post<GetbuildingResponse, GetBuildingRequest>(
      "/api/building/GetSimpleBuildingInfo",
      {
        buildingId
      }
    );
  }
  searchSimpleFloorByBuilding(buildingId: number, order: string, sort: string) {
    return httpService.post<SearchSimpleFloorResponse>(
      "/api/floor/SearchSimpleFloorByBuilding",
      {
        buildingId,
        order,
        sort
      }
    );
  }
  getFloorInfo(floorId: number) {
    return httpService.post<SearchSimpleFloorByBuildingResponse>(
      "/api/floor/GetFloorInfo",
      {
        floorId
      }
    );
  }
  setFloorInfo(floorList: FloorItem[]) {
    return httpService.post<BaseResponse>("/api/floor/SetFloorListInfo", {
      floorList
    });
  }
  createBuildingFloor(buildingId: number, floorList: FloorItem[]) {
    return httpService.post<BaseResponse>("/api/floor/CreateBuildingFloor", {
      buildingId,
      floorList
    });
  }
  createBuilding(option: SetBuildingRequest) {
    return httpService.post<BaseResponse, SetBuildingRequest>(
      "/api/building/CreateBuilding",
      option
    );
  }
  setBuilding(option: SetBuildingRequest) {
    return httpService.post<BaseResponse, SetBuildingRequest>(
      "/api/building/SetBuilding",
      option
    );
  }
  createSimpleBuilding(option: SetBuildingRequest) {
    return httpService.post<BaseResponse, SetBuildingRequest>(
      "/api/building/CreateSimpleBuilding",
      option
    );
  }
  setSimpleBuilding(option: SetBuildingRequest) {
    return httpService.post<BaseResponse, SetBuildingRequest>(
      "/api/building/SetSimpleBuilding",
      option
    );
  }
  deleteSimpleBuilding(opt: BuilidingMnagerRequest) {
    return httpService.post<BaseResponse, BuilidingMnagerRequest>(
      "/api/building/DeleteBuilding",
      opt
    );
  }
  ListAllStreet() {
    return httpService.post<StreetListResponse>("/api/dept/ListAllStreet", {});
  }
  //设置楼长
  setBuildingManager(opt: BuilidingMnagerRequest) {
    return httpService.post<BaseResponse, BuilidingMnagerRequest>(
      "/api/building/SetBuildingManager",
      opt
    );
  }
  //设置物业方楼长
  setPropertyStaff(opt: BuilidingMnagerRequest) {
    return httpService.post<BaseResponse, BuilidingMnagerRequest>(
      "/api/building/SetPropertyStaff",
      opt
    );
  }
}();
