import { computed, h } from "vue";
import { useUserStore } from "@/store";
import Avatar from "@/components/public/avatar/index.vue";
import { NIcon } from "naive-ui";
import { LogInOutline as LogoutIcon } from "@vicons/ionicons5";
import { ApprovalsApp32Filled as AuditIcon } from "@vicons/fluent";
import { UserEdit as EditIcon } from "@vicons/fa";
import { i18n } from "@/config";
import {
  Comment28Filled as CommentIcon,
  TagMultiple24Filled as TagsIcon,
  Info28Filled as InfoIcon
} from "@vicons/fluent";
import { getWelcome } from "@/utils";
import type { Component, StyleValue } from "vue";
import type { DropdownOption } from "naive-ui";

/**
 * 渲染图标
 * @param icon
 * @returns
 */
function renderIcon(icon: Component) {
  return () => h(NIcon, { size: 20 }, { default: () => h(icon) });
}

/**
 * 渲染下拉菜单顶部的信息
 * @returns
 */
function renderHeader() {
  const { userInfo } = useUserStore();
  return h(
    "div",
    {
      style: {
        padding: "5px",
      } as StyleValue,
    },
    [
      h(
        "div",
        {
          style: {
            width: "150px",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          } as StyleValue,
        },
        [
          h(Avatar, { class: "mr-5", src: userInfo.avatar as any, size: 30 }),
          userInfo.username,
        ]
      ),
      h(
        "span",
        {
          style: {
            fontSize: "13px",
          } as StyleValue,
        },
        `${getWelcome()},${userInfo.role} 🙂!`
      ),
    ]
  );
}

/**
 * 下拉菜单项目
 */
export const options = computed<DropdownOption[]>(() => [
  {
    key: "header",
    type: "render",
    render: renderHeader,
  },
  {
    key: "header-divider",
    type: "divider",
  },
  {
    label: i18n.global.t("audit"),
    key: "/audit",
    icon: renderIcon(AuditIcon),
  },
  {
    label: i18n.global.t("comment"),
    key: "/manage/comment",
    icon: renderIcon(CommentIcon),
  },
  {
    label: i18n.global.t("tags"),
    key: "/manage/tags",
    icon: renderIcon(TagsIcon),
  },
  {
    label: i18n.global.t("editPofile"),
    key: "/edit",
    icon: renderIcon(EditIcon),
  },
  {
    key: "route-divider",
    type: "divider",
  },
  {
    label: i18n.global.t("logout"),
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
  {
    label: i18n.global.t("about"),
    key: "about",
    icon: renderIcon(InfoIcon),
  },
]);
