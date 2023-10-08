import { request } from "@/utils";
import {
  PhotoListResponse,
  RandomPicResponse,
  UserGetPhotoParams,
  PidsListResponse,
  SearchCommentQuery,
  SearchCommentResponse,
} from "./types";

/**
 * 随机获取审核通过的图片
 * @param limit 获取的数量
 * @returns
 */
export const randomPicAPI = (limit = 20) => {
  return request.get<RandomPicResponse>("/photo/random/pic", { limit });
};

/**
 * 用户获取照片
 * @param param
 * @returns
 */
export const userGetPhotoAPI = (param: UserGetPhotoParams) => {
  const query: any = {
    limit: param.pageSize,
    offset: (param.page - 1) * param.pageSize,
    desc: param.desc === undefined ? true : param.desc,
  };

  if (param.status !== undefined) {
    query.status = param.status;
  }

  if (param.uid !== undefined) {
    query.uid = param.uid;
  }

  return request.get<PhotoListResponse>("/photo/user/list", query);
};

/**
 * 获取指定的照片
 */
export const getPhotoByPidsAPI = (pids: number[]) => {
  return request.get<PidsListResponse>("/photo/pids/list", {
    pids: pids.join(","),
  });
};

/**
 * 搜索评论
 * @param query 查询参数
 * @returns 
 */
export const searchCommentAPI = (query: SearchCommentQuery) => {
  return request.get<SearchCommentResponse>("/search/comment", {
    limit: query.pageSize,
    offset: (query.pageNum - 1) * query.pageSize,
    desc: true,
    keywords: query.keywords,
  });
};
