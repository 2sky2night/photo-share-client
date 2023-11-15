import type { Role } from "@/types/auth";
/**
 * 用户信息
 */
export interface UserInfo {
  uid: number | undefined;
  avatar: string | null | undefined;
  username: string | undefined;
  accessToken: string | undefined;
  role: Role | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  refreshToken: string | undefined;
}
