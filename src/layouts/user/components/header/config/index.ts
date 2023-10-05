import { type Component, h, computed } from "vue";
import { useConfigStore, useUserStore } from "@/store";
import { NAvatar, NIcon } from "naive-ui";
import type { DropdownOption } from "naive-ui";
import { i18n } from "@/config";
import Avatar from "@/components/public/avatar/index.vue";
import { MdPhotos, IosShareAlt } from "@vicons/ionicons4";
import { UserOutlined, HeartFilled, HistoryOutlined } from "@vicons/antd";
import {
  Sunny,
  Moon,
  LogInOutline,
  Language,
  LogOutOutline,
} from "@vicons/ionicons5";
import { config } from "@/config";

/**
 * 渲染图片
 */
const renderIcon = (icon: Component) => {
  return () =>
    h(NIcon, null, {
      default: () => h(icon),
    });
};

/**
 * 切换主题
 */
const toggleTheme = () => {
  const configStore = useConfigStore();
  configStore.toggleTheme();
};

/**
 * 登录后的导航
 */
export const UserNav = computed(() => [
  {
    path: "/",
    title: i18n.global.t("home"),
  },
  {
    path: "/search",
    title: i18n.global.t("search"),
  },
  {
    path: "/my",
    title: i18n.global.t("my"),
  },
]);
/**
 * 游客导航
 */
export const VisitorNav = computed(() => [
  {
    path: "/",
    title: i18n.global.t("home"),
  },
  {
    path: "/search",
    title: i18n.global.t("search"),
  },
  {
    path: "/login",
    title: i18n.global.t("login"),
  },
]);
/**
 * 登录后的菜单
 */
export const UserMenu = computed<DropdownOption[]>(() => [
  {
    type: "render",
    render() {
      const { userInfo } = useUserStore();
      return h(
        "div",
        {
          class: "flex-v-center",
          style: {
            padding: "5px",
            margin: "0 3px",
          },
        },
        [
          h(Avatar, {
            src: userInfo.avatar as any,
          }),
          h("span", { class: "ml-10 text" }, userInfo.username),
        ]
      );
    },
  },
  {
    key: "header-divider",
    type: "divider",
  },
  {
    label: i18n.global.t("my"),
    key: "/my",
    icon: renderIcon(UserOutlined),
  },
  {
    label: i18n.global.t("history"),
    key: "/history",
    icon: renderIcon(HistoryOutlined),
  },
  {
    label: i18n.global.t("myLikePhoto"),
    key: "/my/liked",
    icon: renderIcon(HeartFilled),
  },
  {
    label: i18n.global.t("myPhoto"),
    key: "/my/published",
    icon: renderIcon(MdPhotos),
  },
  {
    label: i18n.global.t("postPhoto"),
    key: "/photo/post",
    icon: renderIcon(IosShareAlt),
  },
  {
    label: i18n.global.t("language"),
    key: "language",
    icon: renderIcon(Language),
  },
  {
    key: "theme",
    type: "render",
    render() {
      const { isDark } = useConfigStore();
      return h(
        "div",
        {
          class: "p-btn flex-v-center",
          style: { margin: "0 3px" },
          onClick: toggleTheme,
        },
        isDark
          ? [
              h(NIcon, { size: 15 }, { default: () => h(Sunny) }),
              h(
                "span",
                { style: { marginLeft: "8px" } },
                i18n.global.t("lightTheme")
              ),
            ]
          : [
              h(NIcon, { size: 15 }, { default: () => h(Moon) }),
              h(
                "span",
                { style: { marginLeft: "8px" } },
                i18n.global.t("darkTheme")
              ),
            ]
      );
    },
  },
  {
    label: i18n.global.t("logout"),
    key: "logout",
    icon: renderIcon(LogOutOutline),
  },
]);
/**
 * 游客菜单
 */
export const VisitorMenu = computed<DropdownOption[]>(() => [
  {
    label: i18n.global.t("login"),
    key: "/login",
    icon: renderIcon(LogInOutline),
  },
  {
    label: i18n.global.t("history"),
    key: "/history",
    icon: renderIcon(HistoryOutlined),
  },
  {
    label: i18n.global.t("language"),
    key: "language",
    icon: renderIcon(Language),
  },
  {
    key: "theme",
    type: "render",
    render() {
      const { isDark } = useConfigStore();
      return h(
        "div",
        {
          class: "p-btn flex-v-center",
          style: { margin: "0 3px" },
          onClick: toggleTheme,
        },
        isDark
          ? [
              h(NIcon, { size: 15 }, { default: () => h(Sunny) }),
              h(
                "span",
                { style: { marginLeft: "8px" } },
                i18n.global.t("lightTheme")
              ),
            ]
          : [
              h(NIcon, { size: 15 }, { default: () => h(Moon) }),
              h(
                "span",
                { style: { marginLeft: "8px" } },
                i18n.global.t("darkTheme")
              ),
            ]
      );
    },
  },
]);
