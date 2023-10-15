<template>
  <div class="left-container">
    <n-icon size="25" @click="onHandleExpand">
      <MenuUnfoldOutlined />
    </n-icon>
    <n-breadcrumb class="ml-10">
      <n-breadcrumb-item>
        <n-icon :component="MdCash" /> 北京总行</n-breadcrumb-item
      >
      <n-breadcrumb-item>
        <n-icon :component="MdCash" /> 天津分行</n-breadcrumb-item
      >
      <n-breadcrumb-item>
        <n-icon :component="MdCash" /> 平山道支行</n-breadcrumb-item
      >
    </n-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from "@Admin/store";
import { MdCash } from "@vicons/ionicons4";
import { MenuUnfoldOutlined } from "@vicons/antd";

// setting仓库
const settingStore = useSettingStore()

// 点击展开菜单的回调
const onHandleExpand = () => {
  settingStore.toggleSider()
}

defineOptions({
  name: "Left",
});
</script>

<style scoped lang="scss">
.left-container {
  display: flex;
  .n-icon {
    cursor: pointer;
  }
}
</style>
