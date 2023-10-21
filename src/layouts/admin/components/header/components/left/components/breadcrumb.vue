<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-if="route.path !== '/'"
      @click="() => onHandleNavi('/')">
      <n-icon :component="MdCash" />
      <span class="ml-5">{{ $t("home") }}</span>
    </n-breadcrumb-item>
    <n-breadcrumb-item
      v-for="item in breadList"
      @click="() => onHandleNavi(item.path)">
      <n-icon :component="MdCash" />
      <span class="ml-5">{{ $t(item.title as string) }}</span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MdCash } from "@vicons/ionicons4";

// 路由对象
const router = useRouter();
// 路由元信息
const route = useRoute();
// 面包屑列表
const breadList = computed(() => {
  // 拷贝一份，因为后台项目为二级路由
  const list = [...route.matched];
  list.shift();
  return list.map((item) => {
    return {
      title: item.meta.title,
      path: item.path,
    };
  });
});

// 点击面包屑的回调
const onHandleNavi = (path: string) => {
  router.push(path);
};

</script>
