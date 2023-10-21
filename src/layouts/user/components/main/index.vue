<template>
  <div
    class="main-container"
    ref="mainDOM">
    <div class="content">
      <router-view #default="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onBeforeMount, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { pubsub } from "@/utils";

// 主视图容器
const mainDOM = ref<HTMLDivElement | null>(null);
// 阈值
const threshold = window.innerHeight * 0.05;
const route = useRoute();

// 滚动到顶部事件的监听
const onHandleToTop = (_: string, flag = true) => {
  if (mainDOM.value) {
    const target = mainDOM.value;
    target.scroll({
      top: 0,
      left: 0,
      behavior: flag ? "smooth" : undefined,
    });
  }
};

// 监听路由路径变化，让主视图滚动到顶部
watch(
  () => route.path,
  () => {
    pubsub.emit("user:to-top", false);
  }
);

onBeforeMount(() => {
  // 提前创建好频道,onBeforeMount比所有子组件都早
  pubsub.emit("user:page-bottom");
  pubsub.emit("user:to-top");
});

onMounted(() => {
  if (mainDOM.value) {
    const target = mainDOM.value;
    // 滚动事件的回调
    target.addEventListener("scroll", () => {
      if (
        target.scrollHeight - threshold <=
        target.scrollTop + target.clientHeight
      ) {
        pubsub.emit("user:page-bottom");
      }
    });
    // 监听发布者，将视图滚动到顶部
    pubsub.on("user:to-top", onHandleToTop);
  }
});

// 页面卸载，移除监听
onBeforeUnmount(() => {
  pubsub.removeOn("user:to-top", onHandleToTop);
});

defineOptions({
  name: "Main",
});
</script>

<style scoped lang="scss">
.main-container {
  height: calc(100% - var(--user-header-height));
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-color-1);

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--scroll-thumb-color);
  }

  .content {
    margin: 0 auto;
    width: var(--user-main-width);
    height: 100%;
    // background-color: var(--bg-color-1);
  }
}

@media screen and (max-width: 1300px) {
  .main-container {
    .content {
      margin: 0;
      width: inherit;
    }
  }
}
</style>
