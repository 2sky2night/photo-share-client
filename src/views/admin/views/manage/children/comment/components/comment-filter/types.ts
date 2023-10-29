/**
 * 评论过滤器的props
 */
export interface CommentFilterProps {
  isDele: boolean | null;
  keywords: string;
  uid: number | null;
  pid: number | null;
}

/**
 * 评论过滤器的emit
 */
export interface CommentFilterEmits {
  (e: "update:isDele", value: boolean | null): void;
  (e: "update:keywords", value: string): void;
  (e: "update:uid", value: number | null): void;
  (e: "update:pid", value: number | null): void;
  (e: "filter", value: string): void;
}
