<template>
  <n-config-provider :theme="isDark ? darkTheme : null" :theme-overrides="themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>

<script lang='ts' setup>
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@/store'
import { themeOverrides } from '@/config'
import { darkTheme } from "naive-ui";

// 配置仓库
const { isDark } = storeToRefs(useConfigStore())
</script>
