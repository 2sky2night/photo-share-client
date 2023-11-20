<template>
  <div class="overall-panel-container">
    <card
      :loading="isLoading"
      :title="$t('audit_count')"
      :value="overallData.audit_count"
      :sum="allData.audit_count"
      :is-today="isToDay"
      @update:is-today="handleUpdateDays">
      <audit-icon></audit-icon>
    </card>
    <card
      :loading="isLoading"
      :title="$t('photo_count')"
      :value="overallData.photo_count"
      :sum="allData.photo_count"
      :is-today="isToDay"
      @update:is-today="handleUpdateDays">
      <photo-icon></photo-icon>
    </card>
    <card
      :loading="isLoading"
      :title="$t('comment_count')"
      :value="overallData.comment_count"
      :sum="allData.comment_count"
      :is-today="isToDay"
      @update:is-today="handleUpdateDays">
      <comment-icon></comment-icon>
    </card>
    <card
      :loading="isLoading"
      :title="$t('user_count')"
      :value="overallData.user_count"
      :sum="allData.user_count"
      :is-today="isToDay"
      @update:is-today="handleUpdateDays">
      <user-icon></user-icon>
    </card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import Card from "./components/card.vue";
import {
  CommentAdd48Regular as CommentIcon,
  CameraAdd24Regular as PhotoIcon,
  BookmarkAdd24Regular as AuditIcon,
} from "@vicons/fluent";
import { UsergroupAddOutlined as UserIcon } from "@vicons/antd";
import { overallAPI } from "@Admin/apis/data";
import type { OverallResponse } from "@Admin/apis/data/types";

// 正在加载
const isLoading = ref(false);
// 数据总览
const overallData = ref<OverallResponse>({
  /**
   * 审核数量
   */
  audit_count: 0,
  /**
   * 评论数量
   */
  comment_count: 0,
  /**
   * 照片数量
   */
  photo_count: 0,
  /**
   * 用户数量
   */
  user_count: 0,
});
// 总数据
const allData = ref<OverallResponse>({
  /**
   * 审核数量
   */
  audit_count: 0,
  /**
   * 评论数量
   */
  comment_count: 0,
  /**
   * 照片数量
   */
  photo_count: 0,
  /**
   * 用户数量
   */
  user_count: 0,
});
// 当日/七天
const isToDay = ref(true);

// 获取总数据
const handleSumData = async () => {
  const { data } = await overallAPI();
  allData.value.audit_count = data.audit_count;
  allData.value.comment_count = data.comment_count;
  allData.value.photo_count = data.photo_count;
  allData.value.user_count = data.user_count;
};

// 当日/七天状态更新
const handleUpdateDays = async (value: boolean) => {
  if (isLoading.value) return;
  isLoading.value = true;
  isToDay.value = value;
  await handleGetData();
  isLoading.value = false;
};

// 加载数据
const handleGetData = async () => {
  const { data } = await overallAPI(isToDay.value ? 0 : 7);
  overallData.value.audit_count = data.audit_count;
  overallData.value.comment_count = data.comment_count;
  overallData.value.photo_count = data.photo_count;
  overallData.value.user_count = data.user_count;
};

// 获取数据
onBeforeMount(async () => {
  isLoading.value = true;
  await handleSumData();
  await handleGetData();
  isLoading.value = false;
});

defineOptions({
  name: "OverallPanel",
});
</script>

<style scoped lang="scss">
.overall-panel-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
}
@media screen and (max-width: 1000px) {
  .overall-panel-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 650px) {
  .overall-panel-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
