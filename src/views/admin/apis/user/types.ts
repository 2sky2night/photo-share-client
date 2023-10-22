import { PageParams } from "@/apis/public/types";
import { Roles } from "@/types/auth";

/**
 * 获取账户列表的查询参数
 */
export interface AccountsParams extends PageParams {
  role?: Roles;
  desc: boolean;
}

/**
 * 获取User账户列表的查询参数
 */
export type UsersParams = { desc: boolean } & PageParams;
