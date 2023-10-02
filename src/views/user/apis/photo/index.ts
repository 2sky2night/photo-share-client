import { request } from "@/utils";
import { CancelLikePhotoResponse, LikePhotoResponse, PhotoDetailResponse, CommentListResponse, PostViewResponse, PostCommentResponse, LikeCommentResponse } from "./types";

/**
 * 用户点赞照片
 * @param pid 照片id
 */
export const likePhotoAPI = (pid: number) => request.post<LikePhotoResponse>(`/photo/like/${pid}`)

/**
 * 用户取消点赞照片
 * @param pid 照片id
 */
export const cancelLikePhotoAPI = (pid: number) => request.delete<CancelLikePhotoResponse>(`/photo/like/${pid}`)

/**
 * 获取照片详情
 * @param pid 照片id
 */
export const getPhotoDetailAPI = (pid: number) => {
  return request.get<PhotoDetailResponse>(`/photo/${pid}`)
}

/**
 * 获取照片评论
 * @param pid 照片id
 * @param page 页码
 * @param pageSize 页长度
 * @returns 
 */
export const getCommentAPI = (pid: number, page: number, pageSize: number, desc: boolean) => {
  return request.get<CommentListResponse>('/photo/comment/list', {
    pid,
    offset: (page - 1) * pageSize,
    limit: pageSize,
    desc
  })
}

/**
 * 上报照片浏览量
 * @param pid 照片id
 * @returns 
 */
export const postPhotoViewAPI = (pid: number) => request.post<PostViewResponse>(`/photo/view/${pid}`)

/**
 * 发送评论
 */
export const postCommentAPI = (pid: number, content: string) => request.post<PostCommentResponse>(`/photo/comment/${pid}`, { content })

/**
 * 点赞评论
 */
export const likeCommentAPI = (cid: number) => request.post<LikeCommentResponse>(`/photo/comment/like/${cid}`)

/**
 * 取消点赞评论
 */
export const cancelLikeCommentAPI = (cid: number) => request.delete<CancelLikePhotoResponse>(`/photo/comment/like/${cid}`)