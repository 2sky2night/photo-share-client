import type { ListResponse, PageParams } from "@/apis/public/types";
import { Comment } from "@/views/user/apis/photo/types";

/**
 * 评论项
 */
export interface CommentBase {
  cid: number;
  content: string;
  createdAt: string;
  deletedAt: null | string;
  pid: number;
  uid: number;
  updatedAt: string;
}

/**
 * 获取所有评论的查询参数
 */
export interface AllCommentQuery extends PageParams {
  /**
   * 是否包含被删除的评论，否不包含，真查询未被删除记录，不传查询所有记录
   */
  isDele?: boolean;
  /**
   * 搜索关键词
   */
  keywords?: string;
  /**
   * 评论来自于哪个照片？不会检查是否存在
   */
  pid?: number;
  /**
   * 评论来自于哪个用户？不会检查是否存在
   */
  uid?: number;
}

/**
 * 获取所有评论的回调
 */
export type AllCommentsResponse = ListResponse<CommentBase>;

/**
 * 恢复评论的回调
 */
export type ReStoreCommentResponse = null;

/**
 * 删除评论
 */
export type RemoveCommentResponse = null;

/**
 * 获取某个评论详情的响应结果
 */
export type CommentInfoResponse = Comment;
