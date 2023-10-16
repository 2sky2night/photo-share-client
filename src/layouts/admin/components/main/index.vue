<template>
  <div class="main-container">
    <history></history>
    <n-scrollbar style="max-height: calc(100% - var(--history-heigth))">
      <div style="height: 500vh"></div>
      <!-- <view-enter></view-enter> -->
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import History from "./components/history/index.vue";
import ViewEnter from "./components/view/index.vue";
// TO-DO
// 对视图滚动到底部的回调进行监听
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
