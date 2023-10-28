import type { AccountsParams } from "../user/types";

/**
 * 搜索账户的查询参数
 */
export type SearchAccountsParams = AccountsParams & { keywords: string };
