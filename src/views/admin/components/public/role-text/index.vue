<template>
  <span
    class="role-text"
    :class="className">
    {{ $t(className) }}
  </span>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Roles } from "@/types/auth";

// props
const props = defineProps<{ role: Roles }>();
// 映射表
const table = {
  [Roles.SuperAdmin]: "superAdmin",
  [Roles.Admin]: "admin",
  [Roles.User]: "user",
};
// 动态class
const className = computed(() => {
  const name = table[props.role];
  if (name) {
    return name;
  } else {
    throw new Error("非法的角色值");
  }
});

defineOptions({ name: "RoleText" });
</script>

<style scoped lang="scss">
.role-text {
  font-weight: 600;
  &.superAdmin {
    color: var(--primary-color);
  }
  &.admin {
    color: var(--info-color);
  }
  &.user {
    color: var(--text-color-1);
  }
}
</style>
