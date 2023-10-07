import { request } from "@/utils";
import type { SearchPhotoQuery, SearchPhotoResponse } from "./types";

/**
 * 用户搜索照片
 * @param query 查询参数
 * @returns 列表项
 */
export const searchPhotoAPI = (query: SearchPhotoQuery) => {
  return request.get<SearchPhotoResponse>("/search/photo/user", {
    offset: (query.pageNum - 1) * query.pageSize,
    keywords: query.keywords,
    limit: query.pageSize,
    desc: query.desc,
  });
};
