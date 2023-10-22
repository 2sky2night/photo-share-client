import { request } from "@/utils";
import type { UserListResponse } from "@/apis/search/types";
import { AccountsParams, UsersParams } from "./types";

/**
 * 获取账户列表
 * @param params
 * @returns
 */
export const getAccountsAPI = (params: AccountsParams) => {
  const query = {
    offset: (params.pageNum - 1) * params.pageSize,
    limit: params.pageSize,
    desc: params.desc,
  };
  if (params.role) {
    Reflect.set(params, "role", params.role);
  }
  return request.get<UserListResponse>("/auth/account/list", query);
};

/**
 * 获取User账户列表
 * @param params
 */
export const getUsersAPI = (params: UsersParams) => {
  const query = {
    offset: (params.pageNum - 1) * params.pageSize,
    limit: params.pageSize,
    desc: params.desc,
  };
  return request.get<UserListResponse>("/auth/account/list/user", query);
};
