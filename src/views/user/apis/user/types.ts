import { UserBase } from "@/apis/user/types";

/**
 * 根据参数获取User详情的响应结果
 */
export interface UserInfoResponse extends UserInfo {}

/**
 * 用户基本信息(无role字段)
 */
export type UserInfo = Omit<UserBase, "role">;
