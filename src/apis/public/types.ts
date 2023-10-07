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

/**
 * 分页参数
 */
export interface PageParams {
  /**
   * 页码
   */
  pageNum: number;
  /**
   * 页长度
   */
  pageSize: number;
  /**
   * 是否降序
   */
  desc?: boolean;
}
