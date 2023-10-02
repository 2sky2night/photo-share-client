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
