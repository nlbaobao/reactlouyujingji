export interface LoginRequest {
  name: string;
  pwd: string;
}
export interface RoleRequest {
  token: string;
}
export interface BuildingInfoRequest {
  token: string;
  pageIndex: number;
  pageSize: number;
  sort: string;
  order: string;
}
export interface SearchBuildingRequest {
  type?: string;
  key?: string;
  pageIndex?: number;
  pageSize?: number;
  nameKeyword?: string;
  start_ctime?: number;
  end_ctime?: number;
  start_building_height?: number;
  end_building_height?: number;
  start_floor_count?: number;
  end_floor_count?: number;
  start_single_storey?: number;
  end_single_storey?: number;
  start_single_layer_net_height?: number;
  end_single_layer_net_height?: number;
  start_construction_area?: number;
  end_construction_area?: number;
  start_stock_area?: number;
  end_stock_area?: number;
  delivery_standard?: string;
  model_of_operation?: string;
  start_rent?: number;
  end_rent?: number;
  level?: string;
  building_busines?: string;
}
export interface GetBuildingRequest {
  id: number;
}
export interface SetBuildingRequest {
  buildingId?: number;
  address?: string;
  build_time?: number;
  zip_code?: string;
  building_height?: number;
  floor_count?: number;
  single_storey?: number;
  single_layer_net_height?: number;
  construction_area?: number;
  stock_area?: number;
  delivery_standard?: string;
  model_of_operation?: string;
  rent?: number;
  property_costs?: number;
  level?: string;
  parking_space?: number;
  number_of_elevators?: number;
  building_business?: string;
  property_management?: string;
  images?: string[];
  building_status?: number;
  latitude?: number;
  longitude?: number;
  streetDId?: number;
}
export interface SearchCompanyRequest {
  /**
   * 公司名称模糊匹配
   */
  keyword?: string;
  /**
   *起始注册资本
   */
  start_registered_capital?: number;
  /**
   * 结束注册资本
   */
  end_registered_capital?: number;
  /**
   * 起始从业人数
   */
  start_employee_number?: number;
  /**
   *  结束从业人数
   */
  end_employee_number?: number;
  /**
   * 企业营业状态；营业中；已关闭
   */
  business_status?: string;
  /**
   *  是否在区内注册
   */
  isRegister?: string;
  /**
   * null, 是否在区内纳税
   */
  isTaxes?: string;
  /**
   * , 起始营业收入
   */
  start_operating_income?: number;
  /**
   *  = -1, 结束营业收入
   */
  end_operating_income?: number;
  /**
   *  -1, 起始年纳税额
   */
  start_tax_amount?: number;
  /**
   * = -1, 结束年纳税额
   */
  end_tax_amount?: number;
  /**
   * = -1, 所属街道id
   */
  src_streetId?: number;
  /**
   * = null, 是否在名录库
   */
  isStorehouse?: string;
  /**
   * = null, 是否为联网直报单位
   */
  isNetwork?: string;
  /**
   * = null, 纳税地
   */
  taxable?: string;
  /**
   * = null, 产业划分
   */
  property_tyoe?: string;
  /**
   *= null, 行业划分
   */
  industry_type?: string;
  /**
   * = -1, 所属楼宇id
   */
  src_buildingId?: number;
  /**
   * = -1, 起始面积
   */
  start_area?: number;
  /**
   *  = -1, 结束面积
   */
  end_area?: number;
  /**
   * = -1, 起始企业入驻时间
   */
  start_business_entry_time?: number;
  /**
   * = -1, 结束企业入驻时间
   */
  end_business_entry_time?: number;
  /**
   * ,是否有意向退出
   */
  isQuit?: string;
  /**
   * 公司状态1:租；2：出售
   */
  status?: number;
  /**
   * 页码
   */
  pageIndex?: number;
  /**
   *每页大小
   */
  pageSize?: number;
}
export interface CreatCompanyRequest {
  floorId?: number;
  companyId?: number;
  name?: string;
  occ?: string;
  registered_capital?: number;
  register_address?: string;
  business_scope?: string;
  employee_number?: number;
  business_holdings?: string;
  business_status?: string;
  register_time?: number;
  isRegister?: boolean;
  isTaxes?: boolean;
  operating_income?: number;
  tax_amount?: number;
  organization_type?: string;
  isStorehouse?: boolean;
  isNetwork?: boolean;
  contract?: string;
  contact_method?: string;
  taxable?: string;
  property_type?: string;
  industry_type?: string;
  floor_number?: string;
  area?: number;
  business_entry_time?: number;
  isQuit?: string;
  quit_time?: number;
  method?: string;
  isSetTaxUser?: boolean;
  data_source: string;
}
export interface SetRoleRequest {
  uid?: number;
  roleIds?: roleIds[];
  delRoleIds?: roleIds[];
}
export interface roleIds {
  id: number;
}
export interface CreatProjectRequest {
  /**
   * 项目id
   */
  projectId?: number;
  /**
   *
   */
  name: string;
  /**
   * 跟踪单位
   */
  tracking_unit: string;
  /**
   * 跟踪人员
   */
  tracking_staff: string;
  /**
   *  跟踪人员联系方式
   */
  tracking_contact: string;

  /**
   * 产业类型
   */
  property_type: string;
  /**
   * 租售意向
   */
  method: string;
  /**
   * 创建时间
   */
  ctime?: number;
  /**
   * 意向面积
   */
  area: number;
  /**
   * 项目类型
   */
  type: string;
  /**
   * 企业规模
   */
  business_scale: string;
  /**
   * 信息来源
   */
  informant_sources: string;
  /**
   * 意向楼宇
   */
  src_buildingId: number;
  /**
   * 项目状态
   */
  project_status: string
}
export interface BuilidingMnagerRequest {
  buildingIds?: number[];
  projectIds?: number[];
  companyIds?: number[];
  manager?: number;
  manager_contact?: string;
  property_staff_contact?: string;
  uid?: number;
}
