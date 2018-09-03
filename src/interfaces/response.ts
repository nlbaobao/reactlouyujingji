import {
  BuilldingItem,
  FloorInfo,
  UserInfo,
  CompanyInfo,
  Role,
  Dept,
  ProjectInfo,
  StatisticToalInfo,
  StatisticStreetInfo,
  UpdatehistoryInfo
} from "./model";
export interface BaseResponse {
  stat?: string;
  ErrMsg?: string;
}
export interface PageResponse {
  total: number;
  count?: number;
}
export interface CountprojectResponse extends BaseResponse, PageResponse {}
export interface LoginResponse extends BaseResponse {
  token: string;
}
export interface RoleResponse extends BaseResponse {
  user: UserInfo;
}
export interface StatisticStreet extends BaseResponse {
  street: StatisticStreetInfo[];
}
export interface AdviceResponse extends BaseResponse {
  item: D;
}
interface D {
  d: string;
}
export interface CheckLoginResponse extends BaseResponse {}
/**
 * 用户信息返回定义
 */
export interface UserInfoResponse {
  token: string;
  roleId: number;
  name: string;
  status: string;
  ctime: string;
  type: string;
}
/**
 * 楼宇信息返回定义
 */
export interface BuildingInfoResponse extends BaseResponse {
  total: number;
  items: BuilldingItem[];
}
export interface GetbuildingResponse extends BaseResponse {
  building: BuilldingItem;
}
export interface SearchSimpleFloorByBuildingResponse extends BaseResponse {
  floor: FloorInfo;
}
export interface SearchSimpleFloorResponse extends BaseResponse {
  items: FloorInfo[];
}
export interface CompanListResponse extends BaseResponse, PageResponse {
  items: CompanyInfo[];
}

export interface GetCompanyResponse extends BaseResponse {
  item: CompanyInfo;
}
export interface StreetListResponse extends BaseResponse {
  items: Dept[];
}
export interface OccresultResponse extends BaseResponse {
  item?: string;
  data_source?: string;
}
export interface UpdatehistoryResponse extends BaseResponse, PageResponse {
  items: UpdatehistoryInfo[];
}
export interface Result {
  result?: OccCompanyInfoResponse[];
  code?: string;
  reason?: string;
}
export interface OccCompanyInfoResponse {
  label?: string;
  name?: string;
  occ?: string;
  registered_capital: string;
  register_address: string;
  business_scope: string;
  employee_number: string;
  business_holdings: string;
  business_status: string;
  register_time: string;
  isRegister: string;
  isTaxes: string;
  operating_income: string;
  tax_amount: string;
  organization_type: string;
  isStorehouse: string;
  isNetwork: string;
  contract: string;
  contract_method: string;
  taxable: string;
  property_tyoe: string;
  industry_type: string;
  floor_number: string;
  area: string;
  business_entry_time: string;
  isQuit: string;
  quit_time: string;
  method: string;
}
export interface UserRoleResponse extends BaseResponse, PageResponse {
  items: UserInfo[];
}
export interface DeptResponse extends BaseResponse {
  items: Role[];
}
export interface SearchProjectResponse extends BaseResponse, PageResponse {
  items: ProjectInfo[];
}
export interface SetProjectResponse extends BaseResponse {
  item: ProjectInfo;
}
export interface StatisticToalResponse
  extends BaseResponse,
    StatisticToalInfo {}

// export interface  extends BaseResponse {
//   company: company;
//   industryType: industryType[];
//   organizationType: organizationType[];
//   total: total;
//   vacant: vacant;
// }
