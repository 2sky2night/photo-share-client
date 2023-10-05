<template>
  <div class="edit-page">
    <div class="header">
      <n-h2 align-text>
        <n-text type="primary">{{ $t("edit") }}</n-text>
      </n-h2>
      <n-tabs
        :value="route.path"
        @update:value="onHandleTabs"
        type="card">
        <n-tab
          v-for="item in tabList"
          :name="item.name"
          :label="item.label" />
      </n-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { i18n } from "@/config";

// route
const route = useRoute();
// router
const router = useRouter();
// tabs
const tabList = computed(() => [
  {
    name: "/edit/info",
    label: i18n.global.t("profile"),
  },
  {
    name: "/edit/password",
    label: i18n.global.t("password"),
  },
]);

// 标签栏更新的回调
const onHandleTabs = (path: string) => router.push(path);

defineOptions({ name: "EditPage" });
</script>

<style scoped lang="scss">
.edit-page {
  height: 100%;
  position: relative;
  padding: 10px 20px;
  .header {
    .n-h2 {
      margin: 0;
      margin-bottom: 8px;
    }
  }
}
@media screen and (max-width:650px) {
  .edit-page{
    padding: 10px;
  }
}
</style>
