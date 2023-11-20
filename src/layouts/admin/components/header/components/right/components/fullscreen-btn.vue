<template>
  <n-icon
    size="25"
    @click="onHandleFullScreen">
    <component
      :is="
        settingStore.settingData.isFullScreen
          ? NufullScreenIcon
          : FullScreenIcon
      " />
  </n-icon>
</template>

<script lang="ts" setup>
import { useSettingStore } from "@Admin/store";
import {
  FullScreenMaximize24Filled as FullScreenIcon,
  FullScreenMinimize24Filled as NufullScreenIcon,
} from "@vicons/fluent";

// 设置仓库
const settingStore = useSettingStore();

// 点击切换全屏的回调
const onHandleFullScreen = () => {
  settingStore.toggleFullScreen();
};
</script>
