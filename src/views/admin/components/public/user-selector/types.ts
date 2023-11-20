/**
 * User选择器组件的props
 */
export interface UserSelectorProps {
  /**
   * 筛选了哪个user用户?
   */
  uid: number | null;
}
/**
 * User选择器组件的emits
 */
export interface UserSelectorEmits {
  (e: "update:uid", value: number | null): void;
}
