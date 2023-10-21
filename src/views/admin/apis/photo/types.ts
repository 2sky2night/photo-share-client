import type { Photo } from "@/apis/photo/types";
import type { PageParams, ListResponse } from "@/apis/public/types";
import { AuditStatus } from "@/types/photo";
import { status } from "nprogress";

/**
 * 获取照片的查询参数
 */
export type ListPhotoParams = PageParams & {
  uid?: number;
  status?: AuditStatus;
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
