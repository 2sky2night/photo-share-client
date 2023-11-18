import { request } from "@/utils";
import {
  CancelLikePhotoResponse,
  LikePhotoResponse,
  PhotoDetailResponse,
  CommentListResponse,
  PostViewResponse,
  PostCommentResponse,
  LikeCommentResponse,
  PostPhotoBody,
  PostPhotoResponse,
  SubscribeAuditResponse,
  UnSubscribeAuditResponse,
  PhotoTagsListResponse,
  GetPhotosByTagsParmas,
} from "./types";
import { PhotoListResponse } from "@/apis/photo/types";
import { PageParams } from "@/apis/public/types";

/**
 * 用户点赞照片
 * @param pid 照片id
 */
export const likePhotoAPI = (pid: number) =>
  request.post<LikePhotoResponse>(`/photo/like/${pid}`);

/**
 * 用户取消点赞照片
 * @param pid 照片id
 */
export const cancelLikePhotoAPI = (pid: number) =>
  request.delete<CancelLikePhotoResponse>(`/photo/like/${pid}`);

/**
 * 获取照片详情
 * @param pid 照片id
 */
export const getPhotoDetailAPI = (pid: number) => {
  return request.get<PhotoDetailResponse>(`/photo/${pid}`);
};

/**
 * 获取照片评论
 * @param pid 照片id
 * @param page 页码
 * @param pageSize 页长度
 * @returns
 */
export const getCommentAPI = (
  pid: number,
  page: number,
  pageSize: number,
  desc: boolean
) => {
  return request.get<CommentListResponse>("/photo/comment/list", {
    pid,
    offset: (page - 1) * pageSize,
    limit: pageSize,
    desc,
  });
};

/**
 * 上报照片浏览量
 * @param pid 照片id
 * @returns
 */
export const postPhotoViewAPI = (pid: number) =>
  request.post<PostViewResponse>(`/photo/view/${pid}`);

/**
 * 发送评论
 */
export const postCommentAPI = (pid: number, content: string) =>
  request.post<PostCommentResponse>(`/photo/comment/create/${pid}`, {
    content,
  });

/**
 * 点赞评论
 */
export const likeCommentAPI = (cid: number) =>
  request.post<LikeCommentResponse>(`/photo/comment/like/${cid}`);

/**
 * 取消点赞评论
 */
export const cancelLikeCommentAPI = (cid: number) =>
  request.delete<CancelLikePhotoResponse>(`/photo/comment/like/${cid}`);

/**
 * 获取用户点赞的照片列表
 * @param uid 用户id
 * @param pageSize 长度
 * @param pageNum 页码
 * @param desc 是否降序
 * @returns
 */
export const getUserLikePhotosAPI = (
  uid: number,
  pageSize: number,
  pageNum: number,
  desc: boolean
) => {
  return request.get<PhotoListResponse>(`/photo/like/list/${uid}`, {
    desc,
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
  });
};

/**
 * 推送照片
 * @param body
 * @returns
 */
export const postPhotoAPI = (body: PostPhotoBody) => {
  return request.post<PostPhotoResponse>("/photo/create", body);
};

/**
 * 订阅照片审核结果频道
 */
export const subscribeAuditAPI = () => {
  return request.get<SubscribeAuditResponse>("/photo/events/subscribe");
};

/**
 * 取消订阅照片审核结果频道
 */
export const unsubscribeAuditAPI = () => {
  return request.get<UnSubscribeAuditResponse>("/photo/events/unsubscribe");
};

/**
 * 获取照片标签列表
 * @param params
 * @returns
 */
export const getPhotoTagsListAPI = (params: PageParams) => {
  const query: Record<string, any> = {
    limit: params.pageSize,
    offset: (params.pageNum - 1) * params.pageSize,
    desc: params.desc,
  };
  return request.get<PhotoTagsListResponse>("/photo/tags/all", query);
};

export const getPhotosByTagsAPI = (params: GetPhotosByTagsParmas) => {
  const query: Record<string, any> = {
    limit: params.pageSize,
    offset: (params.pageNum - 1) * params.pageSize,
    desc: params.desc,
    tid: params.tid,
  };
  return request.get<PhotoListResponse>("/photo/byTags/list", query);
};
