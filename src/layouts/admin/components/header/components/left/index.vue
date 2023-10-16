<template>
  <div class="left-container">
    <n-icon
      size="25"
      @click="onHandleExpand">
      <MenuUnfoldOutlined />
    </n-icon>
    <n-breadcrumb class="ml-10">
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
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSettingStore } from "@Admin/store";
import { MdCash } from "@vicons/ionicons4";
import { MenuUnfoldOutlined } from "@vicons/antd";

// 路由对象
const router = useRouter();
// 路由元信息
const route = useRoute();
// setting仓库
const settingStore = useSettingStore();
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

// 点击展开菜单的回调
const onHandleExpand = () => {
  settingStore.toggleSider();
};

defineOptions({
  name: "Left",
});
</script>

<style scoped lang="scss">
.left-container {
  display: flex;
  .n-icon {
    cursor: pointer;
  }
}
</style>
