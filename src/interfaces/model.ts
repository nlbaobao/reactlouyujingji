import auditbuilding from "../components/person/auditbuilding";

export interface ProjectInfo {
  building: BuilldingItem;
  creator: UserInfo;
  /**
   * 项目id
   */
  projectId: number;
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
  ctime: number;
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
   * 返回id
   */
  id: number;
  /**
   * 意向楼宇
   */
  src_buildingId: number;
  /**
   * 状态
   */
  project_status: string;
}
export interface Dept {
  id?: number;
  name?: string;
  type?: number;
}
export interface UserInfo {
  ctime?: number;
  id?: number;
  name?: string;
  nickName?: string;
  status?: number;
  type?: number;
  src_dept?: Dept;
  src_roles?: Role[];
  roleName?: string;
}
/**
 * 楼宇信息返回定义
 */
export class BuilldingItem {
  /**
   * 楼宇ID
   */
  id?: number;
  /**
   * 楼宇名称
   */
  name?: string = "";
  /**
   * 楼宇经度
   */
  latitude?: number = 0;
  /**
   * 楼宇地址
   */
  address?: string = "";
  /**
   * 建成时间
   */
  build_time?: number = 20170506;
  /**
   * 楼长联系方式
   */
  manager_contact?: string;
  /**
   * 意向项目数量
   */
  project_number?: number;
  /**
   * 物业方楼长
   */
  property_staff?: BuilidingManager;
  /**
   * 物业方楼长联系方式
   */
  property_staff_contact?: string;
  /**
   * 邮编
   */
  zip_code?: string;
  /**
   * int # 楼宇总高
   */
  building_height?: number;
  /**
   *int # 楼层总数
   */
  floor_count?: number;
  /**
   * int # 单层层高
   */
  single_storey?: number;
  /**
   * int # 单层净高
   */
  single_layer_net_height?: number;
  /**
   * int # 建筑面积
   */
  construction_area?: number;
  /**
   *  int # 存量面积
   */
  stock_area?: number;
  /**
   * # 交付标准
   */
  delivery_standard?: string;
  /**
   * # 经营方式
   */
  model_of_operation?: string;
  /**
   * int # 租金
   */
  rent?: number;
  /**
   *# 物业费
   */
  property_costs?: number;
  /**
   * # 楼宇等级
   */
  level?: string;
  /**
   * # 停车位
   */
  parking_space?: number;
  /**
   * # 电梯数量
   */
  number_of_elevators?: number;
  /**
   * # 楼宇主导业态
   */
  building_business?: string;
  /**
   * # 物业管理方
   */
  property_management?: string;
  /**
   * 楼宇图片
   */
  images?: string[];
  /**
   *楼宇状态 0：已建成；1：未建成
   */
  building_status?: number;
  /**
   * 楼宇纬度
   */
  longitude?: number;
  /**
   * 楼宇创建时间
   */
  ctime?: number;
  /**
   * 楼宇状态
   */
  status?: number;
  /**
   * 楼宇控制面积
   */
  total_vacant_area?: number;
  /**
   * 楼宇的企业数
   */
  total_companies?: number;
  /**
   * 楼长
   */
  manager?: BuilidingManager;
  /**
   * 街道
   */
  src_streetDept?: Dept;
  /**
   * 空置率
   */
  vacant_rate?: number;
  /**
   * 纳税在地率
   */
  taxes_companies_rate?: number;
  /**
   * 注册在地率
   */
  register_companies_rate?: number;
}
/**
 * 楼长
 */
interface BuilidingManager {
  /**
   * 用户的账号（唯一属性）
   */
  name: string;
  /**
   *  int 0：正常；1：删除
   */
  status: number;
  /**
   * 创建时间
   */
  ctime: number;
  /**
   * int # 0:表示不同用户；1：admin用户
   */
  type: number;

  nickName?: string;
  id: number;
}
export interface FloorInfo {
  /**
   * 楼层id
   */
  id?: number;
  /**
   * 楼层层数
   */
  level?: number;
  /**
   *  总面积
   */
  total_area?: number;
  /**
   * 创建时间
   */
  ctime?: number;
  /**
   * 商用面积
   */
  commercial_area?: number;
  /**
   * 租用面积
   */
  rented_area?: number;
  /**
   *  出售面积
   */
  sell_area?: number;
  /**
   * long # 空置面积；=0 不允许添加新的公司
   */
  vacant_area?: number;
  /**
   * 楼层状态0:正常 1：删除
   */
  status?: number;
  /**
   * 楼层总公司数
   */
  total_companies?: number;
  companies?: CompanyInfo[];
  src_building?: BuilldingItem;
}
export interface FloorItem {
  level?: number;
  total_area?: number;
  commercial_area?: number;
}
export interface UpdatehistoryInfo {
  audit_id: number;
  company?: CompanyInfo;
  ctime: number;
  op_method: string;
  oper: UserInfo;
  buidling?: BuilldingItem;
}
export interface CompanyInfo {
  /**
   * 迁出状态
   */
  quit_status?: string;
  /**
   * 租约期限
   */
  rent_expires?: number;
  /**
   * 数据来源
   */
  data_source: string;

  /**
   * 公司名字
   */
  name: string;
  /**
   * 租售方式
   */
  entry_method: number;
  /**
   *
   */
  status: number;
  /**
   * 公司名字
   */
  id: number;
  /**
   * 组织机构代码
   */
  occ: string;
  /**
   * 注册资本
   */
  registered_capital: number;
  /**
   * # 注册地址
   */
  register_address: string;
  /**
   * 经营范围
   */
  business_scope: string;
  /**
   * 从业人数
   */
  employee_number: number;
  /**
   * 企业控股情况
   */
  business_holdings: string;
  /**
   * 企业营业状态；0：营业中；1:已关闭
   */
  business_status: string;
  /**
   * 注册更变时间
   */
  register_time: number;
  /**
   * 删除时间
   */
  del_time: number;
  /**
   * # 是否在区内注册
   */
  isRegister: boolean;
  /**
   * 是否在区内纳税
   */
  isTaxes: boolean;
  /**
   * 营业收入
   */
  operating_income: number;
  /**
   *年纳税额
   */
  tax_amount?: string | number;
  /**
   * 机构类型
   */
  organization_type: string;
  /**
   *是否在名录库
   */
  isStorehouse: boolean;
  /**
   *是否为联网直报单位
   */
  isNetwork: boolean;
  /**
   * # 企业联系人
   */
  contract: string;
  /**
   *联系方式
   */
  contact_method: string;
  /**
   *纳税地
   */
  taxable: string;
  /**
   *  产业划分
   */
  property_type: string;
  /**
   *行业划分
   */
  industry_type: string;
  /**
   * 房间号
   */
  floor_number: string;
  /**
   *面积
   */
  area: number;
  /**
   * 企业入驻时间
   */
  business_entry_time: number;
  /**
   *# 是否有意向退出
   */
  isQuit: string;
  /**
   * #意向退出时间
   */
  quit_time: number;
  /**
   * 1:租；2：出售；2：删除
   */
  method: string;
  set_tax_user: UserInfo;
  srcBuilding: BuilldingItem;
  srcStreet: srcstreet;
}
interface srcstreet {
  id: number;
  name: string;
  type: number;
  status: number;
  tax_amount: string;
  taxable: string;
}
export interface ProjectInfo {
  /**
   * 公司名字
   */
  name: string;
  /**
   * 组织机构代码
   */
  occ: string;
  /**
   * 注册资本
   */
  registered_capital: number;
  /**
   * # 注册地址
   */
  register_address: string;
  /**
   * 经营范围
   */
  business_scope: string;
  /**
   * 从业人数
   */
  employee_number: number;
  /**
   * 企业控股情况
   */
  business_holdings: string;
  /**
   * 企业营业状态；0：营业中；1:已关闭
   */
  business_status: string;
  /**
   * 注册更变时间
   */
  register_time: number;
  /**
   * # 是否在区内注册
   */
  isRegister: string;
  /**
   * 是否在区内纳税
   */
  isTaxes: boolean;
  /**
   * 营业收入
   */
  operating_income: number;
  /**
   *年纳税额
   */
  tax_amount: number;
  /**
   * 机构类型
   */
  organization_type: string;
  /**
   *是否在名录库
   */
  isStorehouse: boolean;
  /**
   *是否为联网直报单位
   */
  isNetwork: boolean;
  /**
   * # 企业联系人
   */
  contract: string;
  /**
   *联系方式
   */
  contact_method: string;
  /**
   *纳税地
   */
  taxable: string;
  /**
   *  产业划分
   */
  property_tyoe: string;
  /**
   *行业划分
   */
  industry_type: string;
  /**
   * 房间号
   */
  floor_number: string;
  /**
   *面积
   */
  area: number;
  /**
   * 企业入驻时间
   */
  business_entry_time: number;
  /**
   *# 是否有意向退出
   */
  isQuit: string;
  /**
   * #意向退出时间
   */
  quit_time: number;
  /**
   * 1:租；2：出售；2：删除
   */
  method: string;
}

export interface Role {
  name?: string;
  desc?: string;
  isRoot?: boolean;
  isShow?: boolean;
  setRootRoleIsAdd?: boolean;
  id?: number;
}
export interface StatisticToalInfo {
  company?: Company;
  industryType?: industryType[];
  organizationType?: organizationType[];
  total?: Total;
  vacant?: Vacant;
}

export interface Company {
  register_companies: number;
  register_companies_rate: number;
  taxes_companies: number;
  taxes_companies_rate: number;
}
export interface industryType {
  name: string;
  number: number;
  value: number;
}
export interface organizationType extends industryType {}

export interface Total {
  tax_amount_average?: number;
  total_all_area?: number;
  total_companies?: number;
  total_employee_number?: number;
  total_income?: number;
  total_rented_area?: number;
  total_sell_area?: number;
  total_tax_amount?: number;
  total_vacant_area?: number;
}
export interface Vacant {
  total_area: number;
  use_area: number;
  use_rate: number;
  vacant_area: number;
  vacant_rate: number;
  quit_area: number;
}
export interface StatisticStreetInfo {
  register_companies?: number;
  register_companies_rate?: number;
  streetdId?: number;
  streetdName?: string;
  tax_amount?: number;
  taxes_companies?: number;
  taxes_companies_rate?: number;
  total_area?: number;
  total_companies?: number;
  use_area?: number;
  vacant_area?: number;
  vacant_rate?: number;
}
export interface AdviceInfo {
  /**
   *企业名字
   */
  company_name: string;
  /**
   *投诉时间
   */
  time: number;
  /**
   *投诉内容
   */
  content: string;
  /**
   *投诉结果
   */
  result: string;

  /**
   *处理状态
   */
  status: number;
  /**
   *处理单位
   */
  unit: string;
  /**
   *结对干部
   */
  cadre: string;
}
