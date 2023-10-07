<template>
  <div class="results-container">
    <n-tabs
      :value="searchType"
      @update-value="onHandleUpdateTabs"
      type="line">
      <n-tab
        v-for="item in tabList"
        :name="item.name">
        {{ item.label }}
      </n-tab>
    </n-tabs>
    <div class="content">
      <photo-result
        :keywords="keywords"
        :page-num="pageNum"
        :page-size="pageSize"
        @update:page-num="onHandleUpdatePageNum"
        @update:page-size="onHandleUpdatePageSize" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useMessage } from "naive-ui";
import PhotoResult from "./components/photo-result.vue";
import { i18n } from "@/config";
import { SearchType } from "../../types";

// props
const props = defineProps<{
  /**
   * 搜索关键词
   */
  keywords: string;
  /**
   * 搜索类别
   */
  searchType: SearchType;
  /**
   * 页码
   */
  pageNum: number;
  /**
   * 页长度
   */
  pageSize: number;
}>();
// emit
const emit = defineEmits<{
  "update:searchType": [value: SearchType];
  "update:pageNum": [value: number];
  "update:pageSize": [value: number];
}>();
// messageAPI
const message = useMessage();
// 标签页
const tabList = computed(() => [
  {
    label: i18n.global.t("photo"),
    name: 0,
  },
  {
    label: i18n.global.t("comment"),
    name: 1,
  },
  {
    label: i18n.global.t("user"),
    name: 2,
  },
]);

// 选择的标签页更新的回调
const onHandleUpdateTabs = (value: SearchType) => {
  emit("update:searchType", value);
};

// 页码更新的回调
const onHandleUpdatePageNum = (value: number) => emit("update:pageNum", value);
// 页长度更新的回调
const onHandleUpdatePageSize = (value: number) =>
  emit("update:pageSize", value);

defineOptions({ name: "SearchResults" });
</script>

<style scoped lang="scss">
.results-container {
  margin-top: 20px;
  padding: 0 20px;
  // :deep(.n-tabs-nav-scroll-content) {
  //   // border: none !important;
  // }
  @media screen and (max-width: 650px) {
    margin-top: 5px;
    padding: 0px;
  }
  .content {
  }
}
</style>
