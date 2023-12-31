import { LOCALE_VALUE } from "@/config/i18n";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { i18n } from "@/config";

export const useConfigStore = defineStore(
  "config",
  () => {
    // 主题
    const isDark = ref(false);
    // 路由元信息(为了获得当前激活的路由元信息)
    const route = useRoute();
    // 当前语言
    const locale = ref<LOCALE_VALUE>(LOCALE_VALUE.EN);

    /**
     * 切换语言
     * @param value
     */
    const toggleLocale = (value: LOCALE_VALUE) => {
      locale.value = value;
      i18n.global.locale = value;
      route.meta?.title
        ? (document.title = `${i18n.global.t(route.meta.title)} | Photo Share`)
        : (document.title = "Photo Share");
    };

    /**
     * 切换主题
     * @param flag
     */
    const toggleTheme = (flag?: boolean) => {
      const body = document.body;
      if (flag === undefined) {
        isDark.value = !isDark.value;
      } else {
        isDark.value = flag;
      }
      // 设置body的主题
      if (body.getAttribute("theme")) {
        if (isDark.value) {
          body.setAttribute("theme", "dark");
        } else {
          body.setAttribute("theme", "light");
        }
      }
    };

    // 异步初始化设置
    setTimeout(() => {
      toggleTheme(isDark.value);
      toggleLocale(locale.value);
    });

    return {
      isDark,
      locale,
      toggleTheme,
      toggleLocale,
    };
  },
  {
    persist: true,
  }
);
