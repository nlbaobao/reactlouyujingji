import httpService from "./http";
import {
  CreatCompanyRequest,
  SearchCompanyRequest,
  BuilidingMnagerRequest
} from "../interfaces/request";
import {
  CompanListResponse,
  OccresultResponse,
  BaseResponse,
  GetCompanyResponse,
  AdviceResponse,
  UpdatehistoryResponse
} from "../interfaces/response";
export default new class {
  searchCompany(opt: SearchCompanyRequest) {
    return httpService.post<CompanListResponse, SearchCompanyRequest>(
      "/api/floor/SearchCompany",
      opt
    );
  }
  getHistoryCompanyInfo(companyId: number) {
    return httpService.post<GetCompanyResponse>(
      "/api/floor/GetHistoryCompanyInfo",
      { companyId }
    );
  }
  listUpdatedCompany(companyId: number, pageIndex?: number, pageSize?: number) {
    return httpService.post<UpdatehistoryResponse>(
      "/api/audit/ListUpdatedCompany",
      { companyId, pageIndex, pageSize }
    );
  }
  getAdvice(occ: string) {
    return httpService.post<AdviceResponse>("/api/sync/GetQuestionByOcc", {
      occ
    });
  }
  occCompany(occ: string, type: string) {
    return httpService.post<OccresultResponse>(
      "/api/sync/SyncGetCompanyInfoByOcc",
      {
        occ,
        type
      }
    );
  }
  creatCompany(opt: CreatCompanyRequest) {
    return httpService.post<BaseResponse, CreatCompanyRequest>(
      "/api/floor/CreateCompany",
      opt
    );
  }
  getCompanyInfo(companyId: number) {
    return httpService.post<GetCompanyResponse>("/api/floor/GetCompanyInfo", {
      companyId
    });
  }
  getCompanylist(floorId: number, type: string) {
    return httpService.post<CompanListResponse>("/api/floor/ListCompany", {
      floorId,
      type
    });
  }
  setCompanyInfo(opt: CreatCompanyRequest) {
    return httpService.post<BaseResponse, CreatCompanyRequest>(
      "/api/floor/SetCompany",
      opt
    );
  }
  updateCompanyInfo(opt: CreatCompanyRequest) {
    return httpService.post<BaseResponse, CreatCompanyRequest>(
      "/api/floor/UpdateCompany",
      opt
    );
  }
  ListHistoryCompany(buildingId: number, pageIndex: number, pageSize: number) {
    return httpService.post<CompanListResponse, SearchCompanyRequest>(
      "/api/floor/ListHistoryCompany",
      {
        buildingId,
        pageIndex,
        pageSize
      }
    );
  }
  deleteCompanies(opt: BuilidingMnagerRequest) {
    return httpService.post<BaseResponse, BuilidingMnagerRequest>(
      "/api/floor/DeleteCompanies",
      opt
    );
  }
}();
