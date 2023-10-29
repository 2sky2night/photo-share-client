import { request } from "@/utils";
import {
  AllCommentQuery,
  AllCommentsResponse,
  CommentInfoResponse,
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
  if (query.keywords) {
    params.keywords = query.keywords;
  }
  if (query.uid !== null) {
    params.uid = query.uid;
  }
  if (query.pid !== null) {
    params.pid = query.pid;
  }
  if (query.isDele !== null) {
    params.isDele = query.isDele;
  }
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

/**
 * 获取某个评论的详情
 * @param cid 评论详情
 * @returns
 */
export const getCommentInfoAPI = (cid: number) => {
  return request.get<CommentInfoResponse>(`/photo/comment/${cid}`);
};
