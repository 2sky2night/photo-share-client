/**
 * 删除状态选择器的props
 */
export interface DeleteSelectorProps {
  isDele: boolean | null;
}
/**
 * 删除状态选择器的emits
 */
export interface DeleteSelectorEmits {
  (e: "update:isDele", value: boolean | null): void;
}
