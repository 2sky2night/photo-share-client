<template>
  <div class="sider-container">
    <n-scrollbar style="max-height: 100vh">
      <logo></logo>
      <n-menu
        v-model:value="activeKey"
        :root-indent="36"
        :indent="12"
        :options="menuOptions" />
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, Component } from "vue";
import { NIcon } from "naive-ui";
import Logo from "./components/logo/index.vue";
import type { MenuOption } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from "@vicons/ionicons5";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const activeKey = ref<string | null>(null);

const menuOptions: MenuOption[] = [
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    icon: renderIcon(BookIcon),
  },
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "鼠",
        key: "rat",
      },
    ],
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    icon: renderIcon(BookIcon),
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon(WineIcon),
        children: [
          {
            label: "威士忌",
            key: "whisky",
          },
        ],
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich",
          },
        ],
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
  {
    label: "舞，舞，舞，舞",
    key: "dance-dance-dance-dance",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon(WineIcon),
        children: [
          {
            label: "威士忌",
            key: "whisky",
          },
        ],
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich",
          },
        ],
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
];

defineOptions({
  name: "Sider",
});
</script>

<style scoped lang="scss">
.sider-container {
  height: 100%;
  width: var(--admin-sider-width);
  padding: 5px 0;
  box-sizing: border-box;
  // background-color: var(--sider-color);
}
</style>
