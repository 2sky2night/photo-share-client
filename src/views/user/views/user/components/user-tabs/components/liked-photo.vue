<template>
  <photo-list :cb="onHandleGetData"></photo-list>
</template>

<script lang="ts" setup>
import PhotoList from "@User/components/list/load/photo-list/index.vue";
import { getUserLikePhotosAPI } from "@User/apis/photo";

// props
const props = defineProps<{ uid: number }>();

// 获取数据
const onHandleGetData = async (
  pageNum: number,
  pageSize: number,
  desc: boolean
) => {
  const result = await getUserLikePhotosAPI(props.uid, pageSize, pageNum, desc);
  return result.data;
};
</script>