type Value = number | null;

/**
 * 照片选择器的props
 */
export interface PhotoSelectorProps {
  pid: Value;
}

/**
 * 照片选择器的emits
 */
export interface PhotoSelectorEmits {
  (e: "update:pid", value: Value): void;
}
