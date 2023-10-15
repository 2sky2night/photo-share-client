import { Role } from "@/types/auth";

/**
 * 获取用户信息
 */
export interface UserInfoResponse extends UserBase {}

/**
 * 用户模型
 */
export interface UserBase {
  avatar: null | string;
  role: Role;
  createdAt: string;
  uid: number;
  updatedAt: string;
  username: string;
}

/**
 * 用户基本信息 不包含role字段
 */
export type UserInfo = Omit<UserBase, "role">;

/**
 * 修改用户密码的响应结果
 */
export type EditPasswordResponse = null;

/**
 * 修改用户基本信息的响应结果
 */
export type EditInfoResponse = EditInfoBody;

/**
 * 更新密码的负载
 */
export interface EditPasswordBody {
  password: string;
  oldPassword: string;
}

/**
 * 更新信息的负载
 */
export interface EditInfoBody {
  username?: string;
  avatar?: string;
}
