<template>
  <n-menu
    :value="route.path"
    :root-indent="36"
    :indent="12"
    :options="menuOption"
    :collapsed="!settingData.isExpand"
    :collapsed-width="65"
    :collapsed-icon-size="22"
    :inverted="true"
    @update:value="onHandleNavi" />
</template>

<script lang="ts" setup>
import { h, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore, useConfigStore } from "@/store";
import { useSettingStore } from "@Admin/store";
import { NIcon } from "naive-ui";
import { adminRoutes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import type { MenuOption } from "naive-ui";
import type { RouteRecordRaw } from "vue-router";
import { MdPhotos as PhotoIcon } from "@vicons/ionicons4";
import { BookOutline as BookIcon } from "@vicons/ionicons5";
import { UserOutlined as UserIcon } from "@vicons/antd";
import {
  Home24Regular as HomeIcon,
  ApprovalsApp24Regular as AuditIcon,
  CalendarEdit24Regular as EditIcon,
  Comment28Filled as CommentIcon,
} from "@vicons/fluent";
import { Roles } from "@/types/auth";
import { i18n } from "@/config";

// 路由元信息
const route = useRoute();
// 路由对象
const router = useRouter();
// 当前的语言
const { locale } = storeToRefs(useConfigStore());
// 当前用户的信息
const { userInfo } = storeToRefs(useUserStore());
// 是否展开菜单栏
const { settingData } = storeToRefs(useSettingStore());
// 路由icon映射表
const icons = {
  BookIcon: () => h(BookIcon),
  HomeIcon: () => h(HomeIcon),
  AuditIcon: () => h(AuditIcon),
  UserIcon: () => h(UserIcon),
  EditIcon: () => h(EditIcon),
  PhotoIcon: () => h(PhotoIcon),
  CommentIcon: () => h(CommentIcon),
};
// 菜单栏
const menuOption = ref<MenuOption[]>(
  adminRoutes[0]?.children ? generateMenuOptions(adminRoutes[0].children) : []
);

// 菜单栏路由导航
const onHandleNavi = (value: string) => {
  router.push(value);
};

// 将路由表生成为导航菜单
function generateMenuOptions(routes: RouteRecordRaw[]) {
  const menuList: MenuOption[] = [];

  function addOption(route: RouteRecordRaw) {
    const item: MenuOption = {
      label: i18n.global.t(
        route.meta?.title ? route.meta.title : "unkown tilte"
      ),
      key: route.path,
      icon: renderIcon(route.meta?.icon as string),
    };
    if (route.children && route.children.length) {
      //  有子孩子
      item.children = generateMenuOptions(route.children);
    }
    menuList.push(item);
  }

  // 遍历当前层级的路由
  routes.forEach((route) => {
    if (route.meta?.roles) {
      // 对角色访问有限制的路由
      if (route.meta.roles.includes(userInfo.value.role as Roles)) {
        // 有权限
        addOption(route);
      }
    } else {
      // 对角色访问无限制的路由
      addOption(route);
    }
  });
  return menuList;
}

// 渲染icon的工厂函数
function renderIcon(icon: string) {
  const iconRender = Reflect.get(icons, icon);
  return () =>
    h(
      NIcon,
      { color: "#fff" },
      { default: iconRender ? iconRender : icons.BookIcon }
    );
}

// 监听语言变化,重新渲染菜单栏
watch(locale, () => {
  menuOption.value = adminRoutes[0]?.children
    ? generateMenuOptions(adminRoutes[0].children)
    : [];
});

defineOptions({
  name: "SiderMenu",
});
</script>
