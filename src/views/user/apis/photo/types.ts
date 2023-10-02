import { Photo } from "@/apis/photo/types";
import { UserInfo } from "../user/types";

/**
 * 评论项
 */
export interface Comment {
  cid: number;
  content: string;
  createdAt: string;
  is_liked: boolean;
  like_count: number;
  pid: number;
  uid: number;
  updatedAt: string;
  user: UserInfo;
}

/**
 * 获取评论列表
 */
export interface CommentListResponse {
  has_more: boolean;
  limit: number;
  list: Comment[];
  offset: number;
  total: number;
}

/**
 * 上报浏览量的响应结果
 */
export type PostViewResponse = null;

/**
 * 点赞照片后的响应结果
 */
export type LikePhotoResponse = null;

/**
 * 取消点赞照片的响应结果
 */
export type CancelLikePhotoResponse = null;

/**
 * 获取照片详情的响应结果
 */
export interface PhotoDetailResponse extends Photo {
  comment_count: number;
}

/**
 * 点赞评论的响应结果
 */
export type LikeCommentResponse = null;

/**
 * 取消点赞评论的响应结果
 */
export type CancelLikeCommentResponse = null;

/**
 * 发送评论的响应结果
 */
export interface PostCommentResponse {
  cid: number;
  content: string;
  createdAt: string;
  pid: number;
  uid: number;
  updatedAt: string;
}
