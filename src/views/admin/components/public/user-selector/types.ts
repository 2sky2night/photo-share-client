import { Roles } from "@/types/auth";
export interface UserSelectorProps {
  uid: number | null;
  /**
   * 筛选哪种角色的账户
   */
  role?: Roles | null;
}

export interface UserSelectorEmits {
  (e: "update:uid", value: number | null): void;
}
