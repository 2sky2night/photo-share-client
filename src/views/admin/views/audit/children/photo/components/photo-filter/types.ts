import { AuditStatus } from "@/types/photo";

/**
 * 过滤器props
 */
export interface PhotoFilterProps {
  uid: number | null;
  status: AuditStatus | null;
  loading: boolean;
  desc: boolean;
}

/**
 * 自定义事件emit
 */
export interface PhotoFilterEmits {
  (e: "update:uid", value: number | null): void;
  (e: "update:status", value: AuditStatus | null): void;
  (e: "update:desc", value: boolean): void;
}
