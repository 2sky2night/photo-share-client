<template>
  <div class="right-container">
    <fullscreen-btn class="mr-10" />
    <refresh-btn class="mr-10" />
    <setting />
    <n-dropdown
      :options="options"
      @select="onHandleSelect">
      <avatar
        class="ml-10"
        round
        :src="(userStore.userInfo.avatar as any)"></avatar>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import { useUserStore } from "@/store";
import { useNavigator } from "@/hooks";
import { useDialog } from "naive-ui";
import FullscreenBtn from "./components/fullscreen-btn.vue";
import RefreshBtn from "./components/refresh-btn.vue";
import About from "@/components/public/about/index.vue";
import Setting from "@/components/public/setting/index.vue";
import { options } from "./configs";
import { i18n } from "@/config";

// 用户仓库
const userStore = useUserStore();
// 导航
const { router } = useNavigator();
// dialog
const dialog = useDialog();
// 操作映射表
const tabs = {
  logout: () => {
    dialog.warning({
      title: i18n.global.t("warning"),
      content: i18n.global.t("logoutTip"),
      positiveText: i18n.global.t("confirm"),
      negativeText: i18n.global.t("cancel"),
      onPositiveClick: async () => {
        // 关闭弹窗
        await userStore.logout();
        router.replace("/login");
      },
    });
  },
  about: () => {
    dialog.info({
      showIcon: false,
      title: i18n.global.t("about"),
      content() {
        return h(About);
      },
    });
  },
};

// 选择的回调
const onHandleSelect = (value: string) => {
  if (value.includes("/")) {
    // 路由跳转
    router.push(value);
  } else {
    // 操作
    const handle = Reflect.get(tabs, value);
    handle && handle();
  }
};

defineOptions({
  name: "Right",
});
</script>

<style scoped lang="scss">
.right-container {
  align-items: center;
  display: flex;
  i {
    cursor: pointer;
  }
  :deep(.setting-container) {
    position: relative;
    top: 4px;
  }
}
</style>
