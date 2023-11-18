<template>
  <n-dropdown
    trigger="hover"
    :options="menuOption"
    @select="onHandleSelect">
    <avatar
      v-if="userStore.userInfo.avatar !== undefined"
      :src="userStore.userInfo.avatar">
    </avatar>
    <n-icon
      size="20"
      v-else
      ><user
    /></n-icon>
  </n-dropdown>
  <langModel v-model="showModal"></langModel>
</template>

<script lang="ts" setup>
import { computed, ref, h } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { useDialog } from "naive-ui";
import avatar from "@/components/public/avatar/index.vue";
import about from "@/components/public/about/index.vue";
import langModel from "@/components/public/lang-modal/index.vue";
import { User } from "@vicons/fa";
import { UserMenu, VisitorMenu } from "../config";
import { i18n } from "@/config";

// router
const router = useRouter();
// 用户仓库
const userStore = useUserStore();
// 语言模态框
const showModal = ref(false);
// 下拉菜单
const menuOption = computed(() => {
  return userStore.isLogin ? UserMenu.value : VisitorMenu.value;
});
// 对话框
const dialog = useDialog();
// 操作映射
const action = {
  language: () => (showModal.value = true),
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
        return h(about);
      },
    });
  },
};
// 选择的回调
const onHandleSelect = (key: string) => {
  if (key.includes("/")) {
    // 路由导航
    router.push(key);
  } else {
    // 操作
    const cb = Reflect.get(action, key);
    cb && cb();
  }
};
</script>
<style scoped lang="scss">
.n-icon {
  padding: 5px;
  border-radius: 50%;
  border: 1px solid var(--border-color-1);
}
</style>
