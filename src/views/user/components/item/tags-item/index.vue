<template>
  <router-link :to="`/discover?tid=${item.tid}`">
    <div
      v-if="common"
      class="p-btn">
      {{ text }}
    </div>
    <n-tag
      v-else
      class="pointer"
      :type="type"
      :bordered="false">
      {{ text }}
    </n-tag>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/store";
import { LOCALE_VALUE } from "@/config";
import type { TagsItemProps } from "./types";

// props
const props = withDefaults(defineProps<TagsItemProps>(), {
  random: false,
  common: false,
});
// 语言
const { locale } = storeToRefs(useConfigStore());
// 标签类型
const type = props.random
  ? (["default", "error", "primary", "info", "success", "warning"][
      Math.floor(Math.random() * 6)
    ] as any)
  : "primary";

// 标签文本
const text = computed(() => {
  switch (locale.value) {
    case LOCALE_VALUE.ZH:
      return props.item.name_zh;
    case LOCALE_VALUE.EN:
      return props.item.name_en;
    default:
      return props.item.name_zh;
  }
});

defineOptions({
  name: "TagsItem",
});
</script>
