<template>
  <div class="user-tabs-container">
    <tabs-panel
      v-model:active-name="activeName"
      :tab-list="tabList"
      @update:active-name="onHandleChange">
      <component :is="comp"></component>
    </tabs-panel>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@/hooks";
import LikedPhoto from "./components/liked-photo.vue";
import PublishedPhoto from "./components/published-photo.vue";
import TabsPanel from "@User/components/public/tabs-panel/index.vue";
import { i18n } from "@/config";

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

// tabs栏更新的回调
const onHandleChange = () => {
  const index = tabList.value.findIndex((ele) => ele.name === activeName.value);
  router.push({
    name: "UserUser",
    params: route.params,
    query: { ...route.query, tabs: index },
  });
};

// 重置tabs栏
const onHandleErrorTabs = () => {
  // tabs参数错误，恢复默认参数
  router.replace({
    name: "UserUser",
    params: route.params,
    query: { ...route.query, tabs: 0 },
  });
};

// 解析路由查询参数tabs
useQuery<{ tabs: number }>(({ tabs }) => {
  if (tabs >= 0 && tabs < tabList.value.length)
    activeName.value = tabList.value[tabs].name;
  else onHandleErrorTabs();
}, onHandleErrorTabs);

// 根据路由查询参数.tabs初始化选择的tabs
(() => {
  const _value = route.query.tabs;
  if (_value === undefined || _value === null) {
    // 未携带tabs参数，重置tabs
    onHandleErrorTabs();
  } else {
    const value = +_value;
    if (isNaN(value) || !(value >= 0 && value < tabList.value.length)) {
      // 参数错误，重置tabs
      onHandleErrorTabs();
    } else {
      activeName.value = tabList.value[value].name;
    }
  }
})();

defineOptions({
  name: "UserTabs",
});
</script>
