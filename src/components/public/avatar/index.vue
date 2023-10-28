<template>
  <n-icon
    v-if="src === null"
    :size="size">
    <user-circle></user-circle>
  </n-icon>
  <n-avatar
    v-else
    :size="imgSize"
    :round="round"
    :src="config.IMG_BASE_URL + src"
    lazy></n-avatar>
</template>

<script lang="ts" setup>
import { UserCircle } from "@vicons/fa";
import { config } from "@/config";
withDefaults(
  defineProps<{
    src: null | string;
    size?: number;
    round?: boolean;
    imgSize?: "medium" | "large" | "small";
  }>(),
  {
    size: 20,
    round: false,
    imgSize: "medium",
  }
);
defineOptions({
  name: "avatar",
});
</script>

<style scoped lang="scss">
.n-icon {
  color: var(--text-color-1);
}
</style>
