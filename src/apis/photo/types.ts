import type { AuditStatus } from "@/types/photo";
import type { UserInfo } from "@/views/user/apis/user/types";

/**
 * 图片数据
 */
export interface PicData {
  /**
   * 宽
   */
  width: number;
  /**
   * 高
   */
  height: number;
  /**
   * 链接
   */
  url: string;
}

/**
 * User获取照片请求的查询参数
 */
export interface UserGetPhotoParams {
  page: number;
  pageSize: number;
  status?: AuditStatus;
  uid?: number | undefined;
  desc?: boolean;
}

/**
 * 照片信息
 */
export interface Photo {
  audit_desc: string | null;
  audit_time: string | null;
  audit_uid: number | null;
  content: string;
  createdAt: string;
  is_liked: boolean;
  like_count: number;
  photos: PicData[];
  pid: number;
  publish_uid: number;
  status: number;
  title: string;
  updatedAt: string;
  views: number;
  /**
   * 发布人信息
   */
  user: UserInfo;
}

/**
 * User获取照片列表的响应结果
 */
export interface PhotoListResponse {
  has_more: boolean;
  limit: number;
  list: Photo[];
  offset: number;
  total: number;
}

/**
 * 随机获取审核通过的图片数据
 */
export interface RandomPicResponse {
  list: PicData[];
  /**
   * 实际获取的数量
   */
  count: number;
  /**
   * 请求的数量
   */
  limit: number;
}
