import { request } from "@/utils";
import { resolveDataParam } from "./utils";
import {
  AccountPortionResponse,
  AuditPhotoStatusResponse,
  OverallResponse,
  PhotoViewsCountResponse,
  TagsPhotoCountResponse,
  UserPostPhotoCountResponse,
} from "./types";

/**
 * 数据总览
 * @param days x天前到今天新增，不传就是总的
 */
export const overallAPI = (days?: number) => {
  return request.get<OverallResponse>("/data", resolveDataParam(days));
};

/**
 * 各个标签下的照片数量统计（倒叙）
 * @param days x天前到今天新增，不传就是总的
 * @param limit 前x条数据
 */
export const tagsPhotoCountAPI = (days?: number, limit?: number) => {
  return request.get<TagsPhotoCountResponse>(
    "/data/tags/photoCount",
    resolveDataParam(days, limit)
  );
};

/**
 * 照片浏览量的统计数据(倒叙)
 * @param days x天前到今天新增，不传就是总的
 * @param limit 前x条数据
 */
export const photoViewsAPI = (days?: number, limit?: number) => {
  return request.get<PhotoViewsCountResponse>(
    "/data/photo/views",
    resolveDataParam(days, limit)
  );
};

/**
 * 账户角色占比
 * @param days x天前到今天新增，不传就是总的
 */
export const accountPortionAPI = (days?: number) => {
  return request.get<AccountPortionResponse>(
    "/data/account/portion",
    resolveDataParam(days)
  );
};

/**
 * 用户发布照片的统计数据(倒叙)
 * @param days x天前到今天新增，不传就是总的
 * @param limit 前x条数据
 */
export const userPostPhotoCountAPI = (days?: number, limit?: number) => {
  return request.get<UserPostPhotoCountResponse>(
    "/data/user/photo",
    resolveDataParam(days, limit)
  );
};

/**
 * 审核照片的状态统计占比
 * @param days x天前到今天新增，不传就是总的
 */
export const auditPhotoStatusAPI = (days?: number) => {
  return request.get<AuditPhotoStatusResponse>(
    "/data/photo/audit/portion",
    resolveDataParam(days)
  );
};
