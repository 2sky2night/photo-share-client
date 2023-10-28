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
