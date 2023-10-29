import type { AuditStatus } from "@/types/photo";
import type { UserInfo } from "@/views/user/apis/user/types";
import type { Comment } from "@User/apis/photo/types";
import type { ListResponse, PageParams } from "../public/types";

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
 * 照片的基本信息
 */
export interface PhotoBase {
  audit_desc: string | null;
  audit_time: string | null;
  audit_uid: number | null;
  content: string;
  createdAt: string;
  photos: PicData[];
  pid: number;
  publish_uid: number;
  /**
   * 审核状态 0未审核 1审核成功 2未通过审核
   */
  status: AuditStatus;
  title: string;
  updatedAt: string;
  views: number;
}

/**
 * 照片信息
 */
export interface Photo extends PhotoBase {
  is_liked: boolean;
  like_count: number;
  /**
   * 发布人信息
   */
  user: UserInfo;
}

/**
 * User获取照片列表的响应结果
 */
export type PhotoListResponse = ListResponse<Photo>;

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

/**
 * 通过pids获取指定照片列表的响应结果
 */
export type PidsListResponse = Photo[];

/**
 * 搜索评论的查询参数
 */
export type SearchCommentQuery = PageParams & {
  /**
   * 搜索关键字
   */
  keywords: string;
};

/**
 * 搜索评论的响应结果
 */
export type SearchCommentResponse = ListResponse<Comment>;
