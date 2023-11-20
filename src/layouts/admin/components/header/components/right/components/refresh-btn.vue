<template>
  <n-icon
    :class="{ refreshing: isLoading }"
    size="25"
    @click="onHandleClick">
    <refresh-icon />
  </n-icon>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { MdRefresh as RefreshIcon } from "@vicons/ionicons4";
import { throttle } from "@/utils";
import { pubsub } from "@/utils";

// 节流时间/刷新动画执行时间
let delay = 1000;
// 是否执行刷新动画
const isLoading = ref(false);

// 刷新的回调
const handleClick = () => {
  pubsub.emit("admin:refresh-page");
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, delay);
};

// 节流事件回调
const onHandleClick = throttle(handleClick, delay);
</script>

<style scoped lang="scss">
.refreshing {
  animation: icon-animation 1s infinite linear;
}
@keyframes icon-animation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
