<template>
  <div class="main-content">
    <router-view
      :key="timestamp"
      #default="{ Component }">
      <transition name="page">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import { pubsub } from "@/utils";

// 页面的时间戳，作为刷新页面的key值
const timestamp = ref(Date.now());

// 刷新页面的回调
const handleRefreshPage = () => {
  timestamp.value = Date.now();
};

// 监听刷新页面的事件
pubsub.on("admin:refresh-page", handleRefreshPage);

// 卸载页面时移除监听
onBeforeUnmount(() => {
  pubsub.removeOn("admin:refresh-page", handleRefreshPage);
});

defineOptions({ name: "ViewEnter" });
</script>

<style scoped lang="scss">
.page-enter-active {
  animation: page-enter-animation var(--time-normal) 1;
}
@keyframes page-enter-animation {
  from {
    transform: translateX(20px);
    opacity: 0.5;
  }
}
</style>
