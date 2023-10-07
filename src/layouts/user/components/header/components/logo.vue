<template>
  <div class="logo-container">
    <div class="logo">PhotoShare</div>
    <div class="menu">
      <n-dropdown
        show-arrow
        :options="menuOptions"
        @select="onHandleSelect">
        <div class="trigger">
          <n-icon
            class="text"
            size="30"
            ><menu-icon></menu-icon
          ></n-icon>
        </div>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { i18n } from "@/config";
import type { DropdownOption } from "naive-ui";
import { Menu as MenuIcon } from "@vicons/ionicons5";

const router = useRouter();

// 是否登录
const { isLogin } = storeToRefs(useUserStore());

// 导航菜单
const menuOptions = computed(() => {
  return isLogin.value ? userNav.value : visitorNav.value;
});

// 用户导航
const userNav = computed<DropdownOption[]>(() => [
  {
    label: i18n.global.t("home"),
    key: "/",
  },
  {
    label: i18n.global.t("search"),
    key: "/search",
  },
  {
    label: i18n.global.t("my"),
    key: "/my",
  },
]);

// 游客导航
const visitorNav = computed<DropdownOption[]>(() => [
  {
    label: i18n.global.t("home"),
    key: "/",
  },
  {
    label: i18n.global.t("search"),
    key: "/search",
  },
  {
    label: i18n.global.t("login"),
    key: "/login",
  },
]);

// 选择的回调
const onHandleSelect = (path: string) => {
  router.push(path);
};
</script>

<style scoped lang="scss">
.logo-container {
  position: relative;

  .logo {
    position: absolute;
    font-size: 30px;
    font-weight: 600;
    top: -22px;
    color: var(--primary-color);
  }

  .menu {
    display: none;
  }
}

@media screen and (max-width: 650px) {
  .logo-container {
    .logo {
      display: none;
    }

    .menu {
      display: block;

      .trigger {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
