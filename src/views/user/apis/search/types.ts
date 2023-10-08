import type { Photo } from "@/apis/photo/types";
import type { ListResponse, PageParams } from "@/apis/public/types";
import type { UserInfo } from "../user/types";

/**
 * 搜索照片的查询参数
 */
export type SearchPhotoQuery = PageParams & { keywords: string };

/**
 * 搜索照片的响应结果
 */
export type SearchPhotoResponse = ListResponse<Photo>;

/**
 * 搜索用户的响应结果
 */
export type SeachUserResponse = ListResponse<UserInfo>;

/**
 * 搜索用户的查询参数
 */
export type SearchUserQuery = PageParams & { keywords: string };
