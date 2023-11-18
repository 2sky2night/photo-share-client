<template>
  <n-tag
    closable
    @close="handleClose">
    {{ text }}
  </n-tag>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/store";
import { LOCALE_VALUE } from "@/config";
import type { TagsBase } from "@/apis/photo/types";

// props
const props = defineProps<{ item: TagsBase; handleClose: () => void }>();
// 语言
const { locale } = storeToRefs(useConfigStore());

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

</script>

<style scoped lang="scss">
.tags-item {
  padding: 5px;
}
</style>
