<template>
  <div
    class="main-container"
    id="admin-main-container">
    <history></history>
    <n-scrollbar style="max-height: calc(100% - var(--history-heigth))">
      <view-enter></view-enter>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import History from "./components/history/index.vue";
import ViewEnter from "./components/view/index.vue";
import { pubsub } from "@/utils";

const route = useRoute();

const onHandleToTop = () => {
  // 获取滚动视图DOM
  const container = document.querySelector(
    "#admin-main-container>.n-scrollbar .n-scrollbar-container"
  );
  if (container) {
    container.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};

// 对主视图相关的监听
// 1.滚动底部的监听
// 2.需要在某些时刻滚动到顶部
// 3.路由切换时需要滚动到顶部
onMounted(() => {
  // 获取滚动视图DOM
  const container = document.querySelector(
    "#admin-main-container>.n-scrollbar .n-scrollbar-container"
  );
  if (container) {
    // 1.监听容器是否滚动到底部
    container.addEventListener("scroll", () => {
      if (
        Math.round(container.clientHeight + container.scrollTop) >=
        container.scrollHeight
      ) {
        pubsub.emit("admin:page-bottom");
      }
    });
    // 2.监听容器是否需要滚动到顶部
    pubsub.on("admin:to-top", onHandleToTop);
    // 3.监听路由路径变化，让视图滚动到顶部
    watch(
      () => route.path,
      () => pubsub.emit("admin:to-top")
    );
  }
});

onBeforeUnmount(() => {
  // 页面卸载，移除滚动顶部的回调
  pubsub.removeOn("admin:to-top", onHandleToTop);
});

defineOptions({
  name: "Main",
});
</script>

<style scoped lang="scss">
.main-container {
  height: calc(100% - var(--admin-header-height));
  --history-heigth: 30px;
}
</style>
