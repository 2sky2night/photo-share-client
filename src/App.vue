<template>
  <div class="root">
    <n-config-provider
      :locale="localeData"
      :theme="isDark ? darkTheme : null"
      :theme-overrides="themeOverrides">
      <n-notification-provider>
        <n-dialog-provider>
          <n-message-provider>
            <Layout></Layout>
          </n-message-provider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { pubsub, debounce } from "@/utils";
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/store";
import { themeOverrides, LOCALE_VALUE } from "@/config";
import { darkTheme } from "naive-ui";
import { zhCN, enUS } from "naive-ui";
import Layout from "@/layouts/root/index.vue";

// 配置仓库
const { isDark, locale } = storeToRefs(useConfigStore());
// 国际化映射表
const localeTalbe = {
  [LOCALE_VALUE.ZH]: zhCN,
  [LOCALE_VALUE.EN]: enUS,
};
// 国际化值
const localeData = computed(() => {
  const data = Reflect.get(localeTalbe, locale.value);
  if (data) {
    return data;
  }
  throw new Error("错误的locale值!");
});
// 监听窗口resize事件
// 不防抖,效果好，但性能开销大
const resizeHandle = () => {
  pubsub.emit("window.resize", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
};
onMounted(() => {
  window.addEventListener("resize", resizeHandle);
});
</script>

<style lang="scss">
.root {
  background-color: var(--bg-color-1);
}
.n-message-container {
  z-index: 99999;
}
.admin-page {
  padding: 10px;
}
</style>
