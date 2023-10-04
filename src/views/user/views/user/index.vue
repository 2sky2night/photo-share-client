<template>
  <div class="user-page">
    <template v-if="uid !== null">
      <user-info :uid="uid"></user-info>
      <user-tabs :uid="uid"></user-tabs>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useParams } from "@/hooks";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import UserInfo from "./components/user-info/index.vue";
import UserTabs from './components/user-tabs/index.vue'
import i18n from "@/config/i18n";

// 用户id
const uid = ref<number | null>(null);
// 消息框API
const message = useMessage();
// 路由
const router = useRouter();

// 参数校验和解析
useParams<{ uid: number }>(
  (result) => {
    const { userInfo, isLogin } = useUserStore();
    if (isLogin && userInfo.uid === result.uid) {
      // 不能访问自己，重定向到my页面
      router.replace("/my");
    }
    uid.value = result.uid;
  },
  ([key]) => {
    message.warning(i18n.global.t("paramsError_", { title: key }));
    router.replace("/");
  }
);

defineOptions({ name: "UserPage" });
</script>

<style scoped lang="scss">
.user-page {
  padding: 10px;
}
</style>
