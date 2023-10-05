<template>
  <tabs-panel
    :active-name="route.path"
    :tab-list="tabList"
    @update:active-name="onHandleChangeValue">
    <router-view></router-view>
  </tabs-panel>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import TabsPanel from "@User/components/public/tabs-panel/index.vue";
import { i18n } from "@/config";

// 路由元信息
const route = useRoute();
// 路由对象
const router = useRouter();
// tab栏
const tabList = computed(() => [
  {
    // 发布的照片
    name: "/my/published",
    label: i18n.global.t("photoIPost"),
  },
  {
    // 喜欢的照片
    name: "/my/liked",
    label: i18n.global.t("photoILiked"),
  },
]);
// tab栏更新的回调
const onHandleChangeValue = (v: string) => {
  router.push(v);
};
</script>
