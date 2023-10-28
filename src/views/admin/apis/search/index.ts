import { request } from "@/utils";
import { SearchAccountsParams } from "./types";
import { UserListResponse } from "@/apis/user/types";

/**
 * 搜索账户列表
 * @param params
 * @returns
 */
export const searchAccountsAPI = (params: SearchAccountsParams) => {
  const query: Record<string, any> = {
    offset: (params.pageNum - 1) * params.pageSize,
    limit: params.pageSize,
    keywords: params.keywords,
    desc: params.desc,
  };
  if (params.role !== null) {
    query.role = params.role;
  }
  return request.get<UserListResponse>("/search/account", query);
};
