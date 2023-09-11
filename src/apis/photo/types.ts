/**
 * 图片数据
 */
export interface PicData {
  /**
   * 宽
   */
  width: number;
  /**
   * 高
   */
  height: number;
  /**
   * 链接
   */
  url: string;
}

/**
 * 随机获取审核通过的图片数据
 */
export interface RandomPicResponse {
  list: PicData[];
  /**
   * 实际获取的数量
   */
  count: number;
  /**
   * 请求的数量
   */
  limit: number;
}