<template>
  <div class="root">
    <n-notification-provider>
      <n-dialog-provider>
        <n-message-provider>
          <Layout></Layout>
        </n-message-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { pubsub, debounce } from "@/utils";
import Layout from "@/layouts/root/index.vue";

// 全局就一个window.resize事件!!
// 通过消息订阅与发布来实现一个事件监听下发给多个监听者
// resize事件回调处理防抖
// const resizeHandle = debounce(() => {
//   pubsub.emit('window.resize', { width: window.innerWidth, height: window.innerHeight })
// })
// 不防抖,效果好，但性能开销大
const resizeHandle = () => {
  pubsub.emit("window.resize", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
};
onMounted(() => {
  window.addEventListener("resize", resizeHandle);
});
</script>

<style lang="scss">
.root {
  background-color: var(--bg-color-1);
}
.n-message-container {
  z-index: 99999;
}
.img-cutter-container {
  color: var(--text-color-1);
  background-color: var(--bg-color-1) !important;
}
.admin-page{
  padding:10px ;
}
</style>
