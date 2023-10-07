/**
 * 搜索类型
 */
export enum SearchType {
  /**
   * 搜索照片
   */
  Photo = 0,
  /**
   * 搜索评论
   */
  Comment = 1,
  /**
   * 搜索用户
   */
  User = 2,
}

/**
 * 搜索查询参数
 */
export interface SearchParam {
  pageSize: number;
  pageNum: number;
  type: SearchType;
  keywords: string;
}
