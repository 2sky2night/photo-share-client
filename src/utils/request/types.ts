/**
 * 基础响应
 */
export interface BaseResponse {
  code: number,
  msg: string;
}

/**
 * 业务响应
 */
export interface Response<T> extends BaseResponse {
  data: T
}