<template>
  <div class="header-container">
    <left></left>
    <right></right>
  </div>
</template>

<script lang="ts" setup>
import Left from './components/left/index.vue'
import Right from './components/right/index.vue'
defineOptions({
  name: "Header",
});
</script>

<style scoped lang="scss">
.header-container {
  height: var(--admin-header-height);
  border-bottom: 1px solid var(--border-color-1);
  box-sizing: border-box;
  display: flex;
  justify-content:space-between;
  padding: 0 15px;
  align-items: center;
}
</style>
