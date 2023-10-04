<template>
  <div class="user-tabs-container">
    <tabs-panel
      v-model:active-name="activeName"
      :tab-list="tabList">
      <component :is="comp"></component>
    </tabs-panel>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import LikedPhoto from "./components/liked-photo.vue";
import PublishedPhoto from "./components/published-photo.vue";
import TabsPanel from "@User/components/public/tabs-panel/index.vue";
import i18n from "@/config/i18n";

// route
const route = useRoute();
// router
const router = useRouter();
// props
const props = defineProps<{
  uid: number;
}>();
// 标签栏
const tabList = computed(() => [
  {
    // 他发布的照片
    name: "published",
    label: i18n.global.t("someonePostedPhoto"),
  },
  {
    // 喜欢的照片
    name: "liked",
    label: i18n.global.t("someoneLikedPhoto"),
  },
]);
// 选择的标签
const activeName = ref(tabList.value[0].name);
// 映射表
const tables = {
  [tabList.value[0].name]: () => h(PublishedPhoto, { uid: props.uid }),
  [tabList.value[1].name]: () => h(LikedPhoto, { uid: props.uid }),
};
// 当前渲染的组件
const comp = computed(() => {
  const render = Reflect.get(tables, activeName.value);
  return render && render();
});


// 未完待续，tabs与路由查询参数绑定


defineOptions({
  name: "UserTabs",
});
</script>