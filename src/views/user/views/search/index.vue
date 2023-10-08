<template>
  <div class="search-photo-page">
    <search-bar
      v-model:keywords="searchParam.keywords"
      @update:keywords="onHandleUpdate" />
    <results
      :keywords="searchParam.keywords"
      v-model:search-type="searchParam.type"
      v-model:page-num="searchParam.pageNum"
      v-model:page-size="searchParam.pageSize"
      @update:page-num="onHandleUpdate"
      @update:page-size="onHandleUpdate"
      @update:search-type="onHandleUpdate" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuery, useNavigator } from "@/hooks";
import SearchBar from "./components/search-bar/index.vue";
import Results from "./components/results/index.vue";
import { SearchType, SearchParam } from "./types";

// router
const router = useRouter();
// 查询参数
const searchParam = ref<SearchParam>({
  pageSize: 20,
  pageNum: 1,
  type: SearchType.Photo,
  keywords: "",
});
// 导航
const {
  user: { goSearch },
} = useNavigator();

// 查询参数更新的回调
const onHandleUpdate = () => {
  // 若未输入关键词，重置搜索分页数据
  router.push({
    path: "/search",
    query: searchParam.value.keywords ? searchParam.value : {},
  });
};

// 校验查询参数
useQuery<SearchParam>(
  (result) => {
    // 路由更新的回调
    let flag = false;
    searchParam.value.keywords = result.keywords ? result.keywords : "";
    if (result.pageNum > 0) {
      searchParam.value.pageNum = result.pageNum;
    } else {
      flag = true;
      searchParam.value.pageNum = 1;
    }
    if (result.pageSize > 0) {
      searchParam.value.pageSize = result.pageSize;
    } else {
      flag = true;
      searchParam.value.pageSize = 20;
    }
    if (result.type >= 0 && result.type <= 2) {
      searchParam.value.type = result.type;
    } else {
      flag = true;
      searchParam.value.type = 0;
    }
    if (flag) {
      // 若出现了参数错误的情况
      if (searchParam.value.keywords)
        // 未输入关键词不做跳转
        router.replace({
          path: "/search",
          query: searchParam.value,
        });
    }
  },
  () => {},
  ["keywords"]
);

// 监听参数更新，重置页码
watch(
  () => [
    searchParam.value.keywords,
    searchParam.value.pageSize,
    searchParam.value.type,
  ],
  () => {
    searchParam.value.pageNum = 1;
    router.push({
      path: "/search",
      query: searchParam.value.keywords ? searchParam.value : {},
    });
  }
);
defineOptions({ name: "SearchPhotoPage" });
</script>

<style scoped lang="scss">
.search-photo-page {
  padding: 10px 15px;
}
</style>
