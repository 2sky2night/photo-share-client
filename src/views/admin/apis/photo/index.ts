import { request } from "@/utils";
import {
  ListPhotoResponse,
  ListPhotoParams,
  AuditPhotoBody,
  AuditPhotoResponse,
  ListPhotoBrieflyResponse,
  ListTagsResponse,
  RemoveTagsResponse,
  EditTagsBody,
  EditTagsResponse,
  CreateTagsBody,
} from "./types";

/**
 * 获取照片列表
 * @param params
 * @returns
 */
export const getPhotoListAPI = (params: ListPhotoParams) => {
  const _params: Record<string, any> = {
    offset: (params.pageNum - 1) * params.pageSize,
    limit: params.pageSize,
    desc: params.desc,
  };
  if (params.status !== undefined || params.status !== null) {
    _params.status = params.status;
  }
  if (params.uid !== undefined || params.uid !== null) {
    _params.uid = params.uid;
  }
  return request.get<ListPhotoResponse>("/photo/admin/list", _params);
};

/**
 * 审核照片
 * @param pid
 * @param status
 * @param desc
 * @returns
 */
export const auditPhotoAPI = (pid: number, body: AuditPhotoBody) => {
  return request.post<AuditPhotoResponse>(`/photo/audit/${pid}`, body);
};

/**
 * 获取照片列表简要信息
 * @param pageNum 页码
 * @param pageSize 长度
 * @param desc 降序
 * @returns
 */
export const getPhotosBriefly = (
  pageNum: number,
  pageSize: number,
  desc: boolean
) => {
  return request.get<ListPhotoBrieflyResponse>("/photo/all/briefly", {
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
    desc,
  });
};

/**
 * 获取标签列表
 * @param pageNum 页码
 * @param pageSize 页长度
 * @param desc 是否降序
 * @param creator_uid 创建者
 * @returns
 */
export const getTagsListAPI = (
  pageNum: number,
  pageSize: number,
  desc: boolean,
  creator_uid?: number
) => {
  const query: Record<string, any> = {
    offset: (pageNum - 1) * pageSize,
    limit: pageSize,
    desc,
  };
  if (typeof creator_uid === "number") {
    query.creator_uid = creator_uid;
  }
  return request.get<ListTagsResponse>("/photo/tags/list", query);
};

/**
 * 移除标签
 * @param tid 标签id
 * @returns
 */
export const removeTagsAPI = (tid: number) => {
  return request.delete<RemoveTagsResponse>(`/photo/tags/${tid}`);
};

/**
 * 编辑标签
 * @param tid 标签id
 * @param body 信息
 */
export const editTagsAPI = (tid: number, body: EditTagsBody) => {
  return request.put<EditTagsResponse>(`/photo/tags/${tid}`, body);
};

/**
 * 创建标签
 * @param body 信息
 * @returns
 */
export const createTagsAPI = (body: CreateTagsBody) => {
  return request.post("/photo/tags/create", body);
};
