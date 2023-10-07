<template>
  <div class="input-container">
    <n-input
      :placeholder="$t('searchTip')"
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
import { ref } from "vue";

// props
const props = defineProps<{
  /**
   * 输入的关键字
   */
  keywords: string;
}>();
// 关键字
const keywords = ref(props.keywords);

const emit = defineEmits<{
  "update:keywords": [value: string];
}>();

// 更新关键词的回调
const onHandleUpdate = (value: string) => {
  keywords.value = value.trim();
};

// 更新该组件的关键词的回调
const onHandleEmitUpdate = () => {
  emit("update:keywords", keywords.value);
};

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
