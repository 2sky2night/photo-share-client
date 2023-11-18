import type { TagsBase } from "@/apis/photo/types";
/**
 * 标签的props
 */
export interface TagsItemProps {
  /**
   * 标签项
   */
  item: TagsBase;
  /**
   * 是否开启随机颜色，默认为不开启
   */
  random?: boolean;
  /**
   * 朴素主题，默认不开启，高优先级
   */
  common?: boolean;
}
