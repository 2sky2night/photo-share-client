<template>
  <div class="comment-filter-container">
    <n-form inline>
      <n-form-item :label="$t('isDelete')">
        <delete-selector
          :is-dele="isDele"
          @update:is-dele="onHandleDeleteUpdate" />
      </n-form-item>
      <n-form-item :label="$t('user')">
        <user-selector
          :uid="uid"
          @update:uid="onHandleUidUpdate" />
      </n-form-item>
      <n-form-item :label="`${$t('photo')} ( PID )`">
        <photo-selector
          :pid="pid"
          @update:pid="onHandlePidUpdate" />
      </n-form-item>
      <n-form-item :label="$t('keywords')">
        <n-input
          :value="keywords"
          @input="onHandleKeywordsChange"
          @update:value="onHanldeDispatchKeywords" />
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import UserSelector from "@Admin/components/public/user-selector/index.vue";
import DeleteSelector from "@Admin/components/public/delete-selector/index.vue";
import PhotoSelector from "@Admin/components/public/photo-selector/index.vue";
import { debounce } from "@/utils";
import type { CommentFilterEmits, CommentFilterProps } from "./types";
// 过滤 1.是否被删除 2.uid搜索 3.pid搜索 4.关键词搜索

// props
defineProps<CommentFilterProps>();
// emits
const emit = defineEmits<CommentFilterEmits>();
// 关键词
const keywords = ref("");

// 选择的用户更新的回调
const onHandleUidUpdate = (value: number | null) => {
  emit("update:uid", value);
  emit("filter", "uid");
};

// 删除状态更新的回调
const onHandleDeleteUpdate = (value: boolean | null) => {
  emit("update:isDele", value);
  emit("filter", "isDele");
};

// 输入的关键词更新
const onHandleKeywordsChange = (value: string) => {
  keywords.value = value.trim();
};

// 输入的关键词的回调（分发事件给外部组件）
const dispatchKeywords = () => {
  emit("update:keywords", keywords.value);
  emit("filter", "keywords");
};

// 选择的照片更新的回调
const onHandlePidUpdate = (value: number | null) => {
  emit("update:pid", value);
  emit("filter", "pid");
};

// 防抖的将关键词分发给外部组件
const onHanldeDispatchKeywords = debounce(dispatchKeywords);

defineOptions({ name: "CommentFilter" });
</script>
