<template>
  <div
    class="auth-action-container"
    @click.capture="onHandleClick">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { useMessage } from "naive-ui";
import { i18n } from "@/config";

const { isLogin } = storeToRefs(useUserStore());
const message = useMessage();

const onHandleClick = (e: Event) => {
  if (!isLogin.value) {
    // 未登录
    message.info(i18n.global.t("pleaseLogin"));
    e.stopPropagation();
  }
};

defineSlots<{
  default: () => any;
}>();
defineOptions({
  name: "AuthAction",
});
</script>
