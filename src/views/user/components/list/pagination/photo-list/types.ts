import { PhotoListResponse } from "@/apis/photo/types";

/**
 * 图片列表组件的props
 */
export interface PhotoListProps {
  /**
   * 获取照片数据的处理器
   * @param pageNum 页码
   * @param pageSize 长度
   * @returns
   */
  handle: (pageNum: number, pageSize: number) => Promise<PhotoListResponse>;
}

/**
 * 图片列表组件的暴露出的api
 */
export interface PhotoListInst {
  /**
   * 重置加载
   * @returns
   */
  handleReset: () => void;
}
