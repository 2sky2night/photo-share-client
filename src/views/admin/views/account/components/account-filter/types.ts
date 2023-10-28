import { Roles } from "@/types/auth";

/**
 * 账户过滤器props
 */
export interface AccountFilterProps {
  desc: boolean;
  keywords: string;
  role: Roles | null;
}

/**
 * 账户过滤器emits
 */
export interface AccountFilterEmits {
  (e: "update:desc", value: boolean): void;
  (e: "update:keywords", value: string): void;
  (e: "update:role", value: Roles | null): void;
}
