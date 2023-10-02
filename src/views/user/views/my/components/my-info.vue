<template>
  <user-info :user-data="(userData as any)">
    <n-button type="primary" size="small">修改个人信息</n-button>
  </user-info>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import UserInfo from "@User/components/user-info/index.vue";

const userStore = useUserStore();
const { userInfo } = userStore;
const userData = {
  avatar: userInfo.avatar,
  uid: userInfo.uid,
  createdAt: userInfo.createdAt,
  updatedAt: userInfo.updatedAt,
  username: userInfo.username,
};
</script>

<style scoped lang="scss"></style>
