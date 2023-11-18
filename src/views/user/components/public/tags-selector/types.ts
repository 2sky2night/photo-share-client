/**
 * 标签选择器的emits
 */
export interface TagsSelectorEmits {
  /**
   * 选择的标签更新
   */
  (e: "update:tids", value: number[]): void;
}

/**
 * 标签选择器的props
 */
export interface TagsSelectorProps {
  /**
   * 选择的标签
   */
  tids: number[];
}
