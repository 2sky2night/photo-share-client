export interface UserSelectorProps {
  uid: number | null;
}

export interface UserSelectorEmits {
  (e: "update:uid", value: number | null): void;
}
