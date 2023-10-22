import { request } from "@/utils";
import {
  ListPhotoResponse,
  ListPhotoParams,
  AuditPhotoBody,
  AuditPhotoResponse,
} from "./types";

/**
 * 获取照片列表
 * @param params
 * @returns
 */
export const getPhotoListAPI = (params: ListPhotoParams) => {
  const _params = {
    offset: (params.pageNum - 1) * params.pageSize,
    limit: params.pageSize,
    desc: params.desc,
  };
  if (params.status !== undefined || params.status !== null) {
    Reflect.set(_params, "status", params.status);
  }
  if (params.uid !== undefined || params.uid !== null) {
    Reflect.set(_params, "uid", params.uid);
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
