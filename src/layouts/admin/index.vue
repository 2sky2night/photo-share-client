<template>
  <div class="photo-share-admin-page">
    <p-sider></p-sider>
    <div class="content">
      <p-header></p-header>
      <p-main></p-main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PHeader from "./components/header/index.vue";
import PMain from "./components/main/index.vue";
import PSider from "./components/sider/index.vue";

defineOptions({
  name: "Admin:PhotoShare",
});
</script>

<style scoped lang="scss">
.photo-share-admin-page {
  display: flex;
  height: 100vh;
  color: var(--text-color-1);
  .content {
    flex-grow: 1;
    height: 100%;
  }
}
</style>
