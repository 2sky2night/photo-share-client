<template>
  <div class="user-result-container">
    <user-list
      :cb="onHandleGetData"
      ref="userListIns"
      :page-num="pageNum"
      @update:page-num="onHandleUpdatePage"
      @update:page-size="onHandleUpdateSize"
      :page-size="pageSize"></user-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import UserList from "@User/components/list/pagination/user-list/index.vue";
import { searchUserAPI } from "@/views/user/apis/search";
import { SearchType } from "../../../types";
import type { UserListIns } from "@User/components/list/pagination/user-list/types";

// props
const props = defineProps<{
  pageNum: number;
  keywords: string;
  pageSize: number;
}>();
// emit
const emit = defineEmits<{
  "update:searchType": [value: SearchType];
  "update:pageNum": [value: number];
  "update:pageSize": [value: number];
}>();

// 列表组件实例
const userListIns = ref<UserListIns | null>(null);

// 获取数据的API
const onHandleGetData = async (pageNum: number, pageSize: number) => {
  const result = await searchUserAPI({
    pageNum,
    pageSize,
    keywords: props.keywords,
  });
  return result.data;
};

// 页码更新的回调
const onHandleUpdatePage = (page: number) => {
  emit("update:pageNum", page);
};

// 页长度更新的回调
const onHandleUpdateSize = (pageSize: number) => {
  emit("update:pageSize", pageSize);
};

// 监听keywords更新重新加载结果页
watch(
  () => [props.keywords],
  () => {
    userListIns.value && userListIns.value.onHandleReset();
  }
);
</script>

<style scoped lang="scss">
.user-result-container {
}
</style>
