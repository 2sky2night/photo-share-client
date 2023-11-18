/**
 * 选择的tid
 */
type Tid = number | null;

/**
 * 标签选择器的props
 */
export interface TagsSelectorProps {
  /**
   * 选择的tid
   */
  tid: Tid;
}

/**
 * 标签选择器的emits
 */
export interface TagsSelectorEmits {
  (e: "update:tid", value: Tid): void;
}
