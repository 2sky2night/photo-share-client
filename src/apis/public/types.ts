/**
 * 列表的响应结果
 */
export interface ListResponse<L> {
  list: L[];
  desc: boolean;
  has_more: boolean;
  limit: number;
  offset: number;
  total: number;
}
