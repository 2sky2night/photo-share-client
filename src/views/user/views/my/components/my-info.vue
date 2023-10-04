<template>
  <user-info-comp
    :loading="isLoading"
    :user-data="(userData as any)">
    <n-button
      type="primary"
      size="small"
      >{{ $t('toUpdateInfo') }}</n-button
    >
  </user-info-comp>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from "vue";
import { useUserStore } from "@/store";
import UserInfoComp from "@User/components/public/user-info/index.vue";

// 正在加载
const isLoading = ref(true);
// 用户仓库
const userStore = useUserStore();
// 用户信息
const { userInfo } = userStore;
// 定时器
let timer: number | null = null;
// 用户信息
const userData = {
  avatar: userInfo.avatar,
  uid: userInfo.uid,
  createdAt: userInfo.createdAt,
  updatedAt: userInfo.updatedAt,
  username: userInfo.username,
};
// 加载1s的假象
timer = setTimeout(() => {
  isLoading.value = false;
  timer = null;
}, 500);
onUnmounted(() => {
  timer && clearTimeout(timer);
});
</script>
