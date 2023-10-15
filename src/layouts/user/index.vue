<template>
  <div class="photo-share-page">
    <p-header></p-header>
    <p-main></p-main>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import PMain from "./components/main/index.vue";
import PHeader from "./components/header/index.vue";
import { startSSE, es } from "@/utils/events";

// 用户信息
const { isLogin } = useUserStore();
if (isLogin) {
  // 若用户登录了，开启SSE审核推送服务
  if (es === null) startSSE();
}

defineOptions({
  name: "User:PhotoShare",
});
</script>

<style scoped lang="scss">
.photo-share-page {
  height: 100vh;
}
</style>
