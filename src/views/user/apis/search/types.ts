import { Photo } from "@/apis/photo/types";
import type { ListResponse, PageParams } from "@/apis/public/types";

/**
 * 搜索照片的查询参数
 */
export type SearchPhotoQuery = PageParams & { keywords: string };

/**
 * 搜索照片的响应结果
 */
export type SearchPhotoResponse = ListResponse<Photo>;
