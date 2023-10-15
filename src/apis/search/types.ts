import type { ListResponse } from "../public/types";
import type { UserBase, UserInfo } from "../user/types";

/**
 * 用户列表
 */
export type UserListResponse = ListResponse<UserBase>;

/**
 * 用户列表(无role字段)
 */
export type UserListResponse_ER = ListResponse<UserInfo>;
