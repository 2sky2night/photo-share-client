import { request } from "@/utils";
import type { UserListResponse } from "@/apis/user/types";
import {
  AccountsParams,
  CreateAccountBody,
  CreateAccountResponse,
  EditAccountBody,
  EditAccountResponse,
  UsersParams,
} from "./types";

/**
 * 获取账户列表
 * @param params
 * @returns
 */
export const getAccountsAPI = (params: AccountsParams) => {
  const query: Record<string, any> = {
    offset: (params.pageNum - 1) * params.pageSize,
    limit: params.pageSize,
    desc: params.desc,
  };
  if (params.role !== null) {
    query.role = params.role;
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

/**
 * 创建账户
 * @param body
 * @returns
 */
export const createAccountAPI = (body: CreateAccountBody) => {
  return request.post<CreateAccountResponse>("/auth/create/account", body);
};

/**
 * 编辑用户
 * @param uid
 * @param body
 * @returns
 */
export const editAccountAPI = (uid: number, body: EditAccountBody) => {
  return request.put<EditAccountResponse>(`/auth/update/${uid}`, body);
};
