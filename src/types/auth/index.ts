/**
 * 角色列表
 */
export enum Roles {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  User = 'User'
}

/**
 * 角色
 */
export type Role = Roles

/**
 * 用户信息
 */
export interface UserInfo {
  uid: number | undefined;
  avatar: string | null | undefined;
  username: string | undefined;
  token: string | undefined;
  role: Role | undefined
}