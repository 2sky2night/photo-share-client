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
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import avatar from "@/components/public/avatar/index.vue";
import langModel from "@/components/public/lang-modal/index.vue";
import { User } from "@vicons/fa";
import { UserMenu, VisitorMenu } from "../config";
import { config } from "@/config";

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
// 操作映射
const action = {
  language: () => (showModal.value = true),
  logout: () => {
    userStore.logout();
    router.replace("/login");
  },
};
// 选择的回调
const onHandleSelect = (key: string) => {
  if (key.includes("/")) {
    // 路由导航
    console.log("路由导航");
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
