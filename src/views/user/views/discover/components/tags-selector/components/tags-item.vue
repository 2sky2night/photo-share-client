<template>
  <n-tag
    class="pointer"
    :type="active ? 'primary' : 'default'"
    :bordered="false"
    @click="handleClick">
    {{ text }}
  </n-tag>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/store";
import { LOCALE_VALUE } from "@/config";
import { TagsBase } from "@/apis/photo/types";

// props
const props = defineProps<{ item: TagsBase; tid: number | null }>();
// emits
const emit = defineEmits<{
  "update:tid": [value: number | null];
}>();
// 语言
const { locale } = storeToRefs(useConfigStore());
// 是否激活了当前标签?
const active = computed(() => {
  return props.tid === props.item.tid;
});
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

// 点击的回调
const handleClick = () => {
  if (active.value) {
    // 当前激活了，取消选择该标签
    emit("update:tid", null);
  } else {
    // 选择该标签
    emit("update:tid", props.item.tid);
  }
};

defineOptions({
  name: "TagsItem",
});
</script>
