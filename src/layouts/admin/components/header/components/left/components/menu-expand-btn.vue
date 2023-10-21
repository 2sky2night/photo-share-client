<template>
  <n-icon
    size="25"
    @click="onHandleClick">
    <MenuUnfoldOutlined />
  </n-icon>
</template>

<script setup lang="ts">
import { useSettingStore } from "@Admin/store";
import { MenuUnfoldOutlined } from "@vicons/antd";

const settingStore = useSettingStore();

// 点击按钮的回调
const onHandleClick = () => {
  settingStore.toggleSider();
};
</script>

<style scoped>
.n-icon {
  cursor: pointer;
}
</style>
