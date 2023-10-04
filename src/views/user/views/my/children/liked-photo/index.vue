<template>
  <div class="liked-photo-container">
    <photo-list :cb="onHandleGetData"></photo-list>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import PhotoList from "@User/components/list/photo-list/index.vue";
import { getUserLikePhotosAPI } from "@/views/user/apis/photo";

// 用户id
const {
  userInfo: { uid },
} = useUserStore();

// 获取数据
const onHandleGetData = async (
  pageNum: number,
  pageSize: number,
  desc: boolean
) => {
  const result = await getUserLikePhotosAPI(
    uid as number,
    pageSize,
    pageNum,
    desc
  );
  return result.data;
};

defineOptions({ name: "LikedPhoto" });
</script>