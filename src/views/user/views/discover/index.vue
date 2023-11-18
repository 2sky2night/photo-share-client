<template>
  <div class="discover-page">
    <tags-selector
      v-model:tid="tid"
      @update:tid="onHandleUpdateTid" />
    <photo-result :tid="tid" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useMessage } from "naive-ui";
import PhotoResult from "./components/photo-result/index.vue";
import TagsSelector from "./components/tags-selector/index.vue";
import { i18n } from "@/config";
// 1.布局
//  侧边触发器，以模态框形式打开标签筛选器
//  结果
// 2.状态
// 无tid查询参数，结果展示首页的接口（降序获取照片）
// 有tid查询参数，结果展示对应标签下的照片列表

// route
const route = useRoute();
// router
const router = useRouter();
// 当前的tid
const tid = ref<number | null>(null);
// message
const message = useMessage();

// 校验路由查询参数
const handleCheckTid = (currentRoute = route) => {
  const _tid = currentRoute.query.tid;
  if (typeof _tid !== "string") {
    // 无tid参数
    tid.value = null;
  } else {
    // 有tid参数
    const _tidNum = +_tid;
    if (isNaN(_tidNum)) {
      message.warning(i18n.global.t("paramsError"));
      router.replace("/");
    } else {
      tid.value = _tidNum;
    }
  }
};

// 选择的标签更新的回调
const onHandleUpdateTid = (value: number | null) => {
  router.push({
    path: route.path,
    query: value !== null ? { tid: value } : {},
  });
};

// 路由更新时校验tid参数
onBeforeRouteUpdate((to) => handleCheckTid(to));

// 立即校验路由查询参数
handleCheckTid();

defineOptions({
  name: "DiscoverPage",
});
</script>

<style scoped lang="scss">
.discover-page {
  padding: 15px;
  padding-top:50px;
}
@media screen and (max-width:650px){
  .discover-page{
    padding-top: 20px;
  }
}
</style>
