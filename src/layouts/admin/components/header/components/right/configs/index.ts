import { computed, h } from "vue";
import { useUserStore } from "@/store";
import Avatar from "@/components/public/avatar/index.vue";
import { NIcon } from "naive-ui";
import { LogInOutline } from "@vicons/ionicons5";
import { ApprovalsApp32Filled } from "@vicons/fluent";
import { UserEdit } from "@vicons/fa";
import { i18n } from "@/config";
import type { Component, StyleValue } from "vue";
import type { DropdownOption } from "naive-ui";

function renderIcon(icon: Component) {
  return () => h(NIcon, { size: 20 }, { default: () => h(icon) });
}

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
        `晚上好,${userInfo.role} 🙂!`
      ),
    ]
  );
}

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
    icon: renderIcon(ApprovalsApp32Filled),
  },
  {
    label: "修改个人信息",
    key: "/edit",
    icon: renderIcon(UserEdit),
  },
  {
    key: "route-divider",
    type: "divider",
  },
  {
    label: i18n.global.t("logout"),
    key: "logout",
    icon: renderIcon(LogInOutline),
  },
]);
