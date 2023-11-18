import { Photo, TagsBase } from "@/apis/photo/types";
import { UserInfo } from "../user/types";
import { ListResponse, PageParams } from "@/apis/public/types";

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
  deletedAt: string;
}

/**
 * 获取评论列表
 */
export type CommentListResponse = ListResponse<Comment>;
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

/**
 * 发布照片的负载
 */
export interface PostPhotoBody {
  /**
   * 照片的描述
   */
  content: string;
  /**
   * 照片的url
   * @length 1-10
   */
  photos: string[];
  /**
   * 照片的标题
   */
  title: string;
  /**
   * 照片的标签
   * @length 1-10
   */
  tids?: number[];
}

/**
 * 发送照片响应成功的结果
 */
export interface PostPhotoResponse {
  content: string;
  createdAt: string;
  photos: string;
  pid: number;
  publish_uid: number;
  status: number;
  title: string;
  updatedAt: string;
  views: number;
}

/**
 * 订阅照片审核结果频道的响应结果
 */
export type SubscribeAuditResponse = string;

/**
 * 取消订阅照片审核结果频道的响应结果
 */
export type UnSubscribeAuditResponse = null;

/**
 * 获取照片标签列表的响应结果
 */
export type PhotoTagsListResponse = ListResponse<TagsBase>;

/**
 * 根据照片标签获取照片的查询参数
 */
export type GetPhotosByTagsParmas = PageParams & {
  /**
   * 标签id
   */
  tid: number;
};
