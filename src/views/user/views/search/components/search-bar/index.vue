<template>
  <div class="input-container">
    <n-input
      ref="inputIns"
      :placeholder="$t('searchInputTips')"
      @keydown.enter="onHandleEmitUpdate"
      :value="keywords"
      @update:value="onHandleUpdate" />
    <n-button
      type="primary"
      @click="onHandleEmitUpdate"
      :disabled="!keywords.length">
      {{ $t("search") }}
    </n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { pubsub } from "@/utils";
import type { InputInst } from "naive-ui";
import { onBeforeUnmount } from "vue";

// props
const props = defineProps<{
  /**
   * 输入的关键字
   */
  keywords: string;
}>();
// emits
const emit = defineEmits<{
  "update:keywords": [value: string];
}>();

// 输入框实例
const inputIns = ref<InputInst | null>(null);
// 关键字
const keywords = ref(props.keywords);

// 更新关键词的回调
const onHandleUpdate = (value: string) => {
  keywords.value = value.trim();
};

// 监听聚焦事件
const onHandleFocus = () => inputIns.value && inputIns.value.focus();

// 更新该组件的关键词的回调
const onHandleEmitUpdate = () => {
  emit("update:keywords", keywords.value);
};

// keywords更新的回调
watch(
  () => props.keywords,
  (v) => (keywords.value = v)
);
// 开启监听
pubsub.on("user:search-input-focus", onHandleFocus);
// 删除监听
onBeforeUnmount(() => {
  pubsub.remove("user:search-input-focus");
});

defineOptions({ name: "SearchBar" });
</script>

<style scoped lang="scss">
.input-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;

  .n-input {
    max-width: 500px;
  }
}
</style>
