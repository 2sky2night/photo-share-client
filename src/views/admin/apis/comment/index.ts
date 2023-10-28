import { request } from "@/utils";
import {
  AllCommentQuery,
  AllCommentsResponse,
  ReStoreCommentResponse,
  RemoveCommentResponse,
} from "./types";

/**
 * 获取评论列表
 * @param query
 * @returns
 */
export const getAllCommentsAPI = (query: AllCommentQuery) => {
  const params: Record<string, any> = {
    limit: query.pageSize,
    offset: (query.pageNum - 1) * query.pageSize,
    desc: query.desc,
  };
  return request.get<AllCommentsResponse>("/photo/comment/all", params);
};

/**
 * 删除评论
 * @param cid 评论id
 * @returns
 */
export const removeCommentAPI = (cid: number) => {
  return request.delete<RemoveCommentResponse>(`/photo/comment/${cid}`);
};

/**
 * 恢复评论
 * @param cid 评论id
 * @returns
 */
export const restoreCommentAPI = (cid: number) => {
  return request.post<ReStoreCommentResponse>(`/photo/comment/restore/${cid}`);
};
