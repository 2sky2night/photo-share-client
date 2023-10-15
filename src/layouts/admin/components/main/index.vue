<template>
  <div class="main-container">
    <n-scrollbar style="max-height: 100%">
      <div class="history-list">历史记录</div>
      <div style="height: 200vh"></div>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Main",
});
</script>

<style scoped lang="scss">
.main-container {
  height: calc(100% - var(--admin-header-height));
  :deep(.n-scrollbar-container){
    .history-list {
      position: sticky;
      top:0;
      height: 30px;
    }
  }
}
</style>
