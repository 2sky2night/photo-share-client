<template>
  <div class="right-container">
    <n-icon
      class="mr-10"
      size="25"
      @click="onHandleFullScreen"
      >
      <component
        :is="
          settingStore.settingData.isFullScreen
            ? NufullScreenIcon
            : FullScreenIcon
        " />
    </n-icon>
    <setting />
    <n-dropdown
      :options="options"
      @select="onHandleSelect">
      <n-icon
        size="25"
        class="ml-10">
        <UserCircle></UserCircle>
      </n-icon>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import { useSettingStore } from "@Admin/store";
import { useNavigator } from "@/hooks";
import { useDialog } from "naive-ui";
import {
  FullScreenMaximize24Filled as FullScreenIcon,
  FullScreenMinimize24Filled as NufullScreenIcon,
} from "@vicons/fluent";
import { UserCircle } from "@vicons/fa";
import Setting from "@/components/public/setting/index.vue";
import { options } from "./configs";
import { i18n } from "@/config";

// 用户仓库
const userStore = useUserStore();
// 设置仓库
const settingStore = useSettingStore();
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
};

// 选择的回调
const onHandleSelect = (value: string) => {
  if (value.includes("/")) {
    // 路由跳转
  } else {
    // 操作
    const handle = Reflect.get(tabs, value);
    handle && handle();
  }
};

// 点击切换全屏的回调
const onHandleFullScreen = () => {
  settingStore.toggleFullScreen()
}

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
