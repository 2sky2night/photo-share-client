<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-if="route.path !== '/'"
      @click="() => onHandleNavi('/')">
      <n-icon :component="icons.HomeIcon" />
      <span class="ml-5">{{ $t("home") }}</span>
    </n-breadcrumb-item>
    <n-breadcrumb-item
      v-for="item in breadList"
      @click="() => onHandleNavi(item.path)">
      <n-icon :component="item.icon" />
      <span class="ml-5">{{ $t(item.title as string) }}</span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
import { h, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MdPhotos as PhotoIcon } from "@vicons/ionicons4";
import { BookOutline as BookIcon } from "@vicons/ionicons5";
import { UserOutlined as UserIcon } from "@vicons/antd";
import {
  Home32Filled as HomeIcon,
  ApprovalsApp24Regular as AuditIcon,
  CalendarEdit24Regular as EditIcon,
  Comment28Filled as CommentIcon,
  Settings32Filled as ManageIcon,
  TagMultiple24Filled as TagsIcon,
} from "@vicons/fluent";
import type { VNode } from "vue";

// 路由对象
const router = useRouter();
// 路由元信息
const route = useRoute();
// 路由icon映射表
const icons = {
  BookIcon: () => h(BookIcon),
  HomeIcon: () => h(HomeIcon),
  AuditIcon: () => h(AuditIcon),
  UserIcon: () => h(UserIcon),
  EditIcon: () => h(EditIcon),
  PhotoIcon: () => h(PhotoIcon),
  CommentIcon: () => h(CommentIcon),
  ManageIcon: () => h(ManageIcon),
  TagsIcon: () => h(TagsIcon),
};
// 面包屑列表
const breadList = computed(() => {
  // 拷贝一份，因为后台项目为二级路由，需要剔除一级路由
  const list = [...route.matched];
  list.shift();
  return list.map((item) => {
    let icon: (() => VNode) | null = null;
    if (item.meta && item.meta.icon) {
      const render = icons[item.meta.icon as keyof typeof icons];
      if (render) {
        icon = render;
      } else {
        icon = icons.BookIcon;
      }
    } else {
      icon = icons.BookIcon;
    }
    return {
      title: item.meta?.title ? item.meta.title : "unkown title",
      path: item.path,
      icon,
    };
  });
});

// 点击面包屑的回调
const onHandleNavi = (path: string) => {
  router.push(path);
};
</script>
