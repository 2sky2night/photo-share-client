import { Role } from "@/types/auth";

/**
 * 获取用户信息
 */
export interface UserInfoResponse {
  username: string;
  role: Role;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  uid: number;
}