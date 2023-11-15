import { PageParams } from "@/apis/public/types";
import { Roles } from "@/types/auth";

/**
 * 获取账户列表的查询参数
 */
export interface AccountsParams extends PageParams {
  /**
   * 查询某个角色，null为全部角色
   */
  role: Roles | null;
  desc: boolean;
}

/**
 * 获取User账户列表的查询参数
 */
export type UsersParams = { desc: boolean } & PageParams;

/**
 * 创建账户的请求体
 */
export interface CreateAccountBody {
  password: string;
  username: string;
  role: Roles;
}

/**
 * 修改用户的请求体
 */
export interface EditAccountBody {
  username?: string;
  password?: string;
  avatar?: string;
}

/**
 * 创建账户成功的响应体
 */
export type CreateAccountResponse = null;

/**
 * 编辑账户成功的响应体
 */
export type EditAccountResponse = null;
