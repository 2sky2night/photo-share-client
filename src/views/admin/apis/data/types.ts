/**
 * 数据模块的统计查询参数
 */
export interface DataParam {
  limit: number;
  days: number;
}
/**
 * 数据模块的统计查询参数
 */
export type DataParamP = Partial<DataParam>;

/**
 * 标签的照片统计数据
 */
export interface TagsPhotoCount {
  tid: number;
  name_en: string;
  name_zh: string;
  total: number;
}

/**
 * 照片浏览统计数据
 */
export interface PhotoViewsCount {
  pid: number;
  title: string;
  views: number;
}

/**
 * 用户发布照片数量
 */
export interface UserPostPhotoCount {
  uid: number;
  total: number;
  username: string;
}

/**
 * 数据总览的响应结果
 */
export interface OverallResponse {
  /**
   * 审核数量
   */
  audit_count: number;
  /**
   * 评论数量
   */
  comment_count: number;
  /**
   * 照片数量
   */
  photo_count: number;
  /**
   * 用户数量
   */
  user_count: number;
}

/**
 * 标签的照片数量统计的响应结果
 */
export type TagsPhotoCountResponse = TagsPhotoCount[];

/**
 * 照片浏览统计数据的响应结果
 */
export type PhotoViewsCountResponse = PhotoViewsCount[];

/**
 * 账户角色占比的响应结果
 */
export interface AccountPortionResponse {
  user_count: number;
  admin_count: number;
  super_admin_count: number;
}

/**
 * 用户发布照片统计的响应结果
 */
export type UserPostPhotoCountResponse = UserPostPhotoCount[];

/**
 * 照片审核状态的响应结果
 */
export interface AuditPhotoStatusResponse {
  no_pass: number;
  pass: number;
  unaudit: number;
}
