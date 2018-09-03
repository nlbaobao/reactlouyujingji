import httpService from "./http";
import {
  BuildingInfoRequest,
  CreatCompanyRequest,
  CreatProjectRequest
} from "../interfaces/request";
import { CompanyInfo } from "../interfaces/model";
import {
  CompanListResponse,
  OccresultResponse,
  BaseResponse,
  GetCompanyResponse,
  SearchProjectResponse,
  SetProjectResponse,
  StatisticToalResponse,
  StatisticStreet
} from "../interfaces/response";
export default new class {
  getStreetStatisticsData() {
    return httpService.post<StatisticStreet>(
      "/api/report/GetStreetStatisticsData",
      {}
    );
  }
  getTotalStatisticsData() {
    return httpService.post<StatisticToalResponse>(
      "/api/report/GetTotalStatisticsData",
      {}
    );
  }
  getOneBuildingStatisticsData(buildingId: number) {
    return httpService.post<StatisticToalResponse>(
      "/api/report/GetOneBuildingStatisticsData",
      { buildingId }
    );
  }
}();
