import type { Photo, PhotoBase, TagsBase } from "@/apis/photo/types";
import type { PageParams, ListResponse } from "@/apis/public/types";
import { UserInfo } from "@/apis/user/types";
import { AuditStatus } from "@/types/photo";

/**
 * 获取照片的查询参数
 */
export type ListPhotoParams = PageParams & {
  uid?: number | null;
  status?: AuditStatus | null;
};

/**
 * 审核照片的请求体
 */
export interface AuditPhotoBody {
  status: AuditStatus;
  desc?: string;
}

/**
 * 获取照片的响应结果
 */
export type ListPhotoResponse = ListResponse<Photo>;

/**
 * 审核照片成功的结果
 */
export type AuditPhotoResponse = null;

/**
 * 获取照片简要信息列表的响应结果
 */
export type ListPhotoBrieflyResponse = ListResponse<PhotoBase>;

/**
 * 标签详情
 */
export interface Tags extends TagsBase {
  /**
   * 创建者信息
   */
  creator: UserInfo;
}

/**
 * 标签列表的响应结果
 */
export type ListTagsResponse = ListResponse<Tags>;

/**
 * 删除标签的响应结果
 */
export type RemoveTagsResponse = null;

/**
 * 编辑标签的响应结果
 */
export type EditTagsResponse = null;

/**
 * 新增标签的响应结果
 */
export type CreateTagsResponse = null;

/**
 * 编辑标签的请求体
 */
export type EditTagsBody = Partial<CreateTagsBody>;

/**
 * 创建标签的请求体
 */
export interface CreateTagsBody {
  nameZH: string;
  nameEN: string;
  descriptionZH?: string;
  descriptionEN?: string;
}
