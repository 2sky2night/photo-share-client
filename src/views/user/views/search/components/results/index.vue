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
      <template v-if="keywords.length">
        <photo-result
          v-if="searchType === 0"
          :keywords="keywords"
          :page-num="pageNum"
          :page-size="pageSize"
          @update:page-num="onHandleUpdatePageNum"
          @update:page-size="onHandleUpdatePageSize" />
        <comment-result
          v-if="searchType === 1"
          :keywords="keywords"
          :page-num="pageNum"
          :page-size="pageSize"
          @update:page-num="onHandleUpdatePageNum"
          @update:page-size="onHandleUpdatePageSize" />
        <user-result
          v-if="searchType === 2"
          :keywords="keywords"
          :page-num="pageNum"
          :page-size="pageSize"
          @update:page-num="onHandleUpdatePageNum"
          @update:page-size="onHandleUpdatePageSize" />
      </template>
      <template v-else>
        <n-result
          status="info"
          :title="$t('tips')"
          :description="$t('searchTips')">
          <template #footer>
            <n-button @click="onHandleFocus">{{ $t("toSearch") }}</n-button>
          </template>
        </n-result>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, h } from "vue";
import PhotoResult from "./components/photo-result.vue";
import UserResult from "./components/user-result.vue";
import CommentResult from "./components/comment-result.vue";
import { i18n } from "@/config";
import { SearchType } from "../../types";
import { pubsub } from "@/utils";

// props
defineProps<{
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

// // 映射表
// const table = {
//   [tabList.value[0].name]: () => h(PhotoResult, tabsProps),
//   [tabList.value[1].name]: () => h(CommentResult, tabsProps),
//   [tabList.value[2].name]: () => h(UserResult, tabsProps),
// };

// // tab对应渲染的组件
// const comp = computed(() => {
//   const obj = Reflect.get(table, props.searchType);
//   return obj();
// });

// 选择的标签页更新的回调
const onHandleUpdateTabs = (value: SearchType) => {
  emit("update:searchType", value);
};

// 页码更新的回调
const onHandleUpdatePageNum = (value: number) => emit("update:pageNum", value);

// 页长度更新的回调
const onHandleUpdatePageSize = (value: number) =>
  emit("update:pageSize", value);

// // 各个标签页内容组件的props
// const tabsProps = {
//   keywords: props.keywords,
//   pageNum: props.pageNum,
//   pageSize: props.pageSize,
//   "onUpdate:pageNum": onHandleUpdatePageNum,
//   "onUpdate:pageSize": onHandleUpdatePageSize,
// };

// 点击让输入框聚焦
const onHandleFocus = () => pubsub.emit("user:search-input-focus");

defineOptions({ name: "SearchResults" });
</script>

<style scoped lang="scss">
.results-container {
  margin-top: 20px;
  padding: 0 20px;
  @media screen and (max-width: 650px) {
    margin-top: 5px;
    padding: 0px;
  }
  .content {
    margin-top: 10px;
    .search-tips {
      margin-top: 30px;
    }
    .n-result {
      margin-top: 30px;
    }
  }
}
</style>
