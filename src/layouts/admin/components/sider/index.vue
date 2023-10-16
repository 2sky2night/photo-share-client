<template>
  <div class="sider-container">
    <n-scrollbar style="max-height: 100vh">
      <sider-logo></sider-logo>
      <sider-menu></sider-menu>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SiderLogo from "./components/logo/index.vue";
import SiderMenu from "./components/menu/index.vue";
defineOptions({
  name: "Sider",
});
</script>

<style scoped lang="scss">
.sider-container {
  height: 100%;
  width: var(--admin-sider-width);
  padding: 5px 0;
  box-sizing: border-box;
  transition: width var(--time-normal);
  // background-color: var(--sider-color);
}
</style>
