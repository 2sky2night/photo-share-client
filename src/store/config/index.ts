import { LOCALE_VALUE } from "@/config/i18n";
import { defineStore } from "pinia";
import { ref } from 'vue'
import i18n from "@/config/i18n";

export const useConfigStore = defineStore(
  'config',
  () => {

    // 主题
    const isDark = ref(false)

    // 当前语言
    const locale = ref<LOCALE_VALUE>(LOCALE_VALUE.ZH)

    /**
     * 切换语言
     * @param value 
     */
    const toggleLocale = (value: LOCALE_VALUE) => {
      locale.value = value
      i18n.global.locale = value
    }

    /**
     * 切换主题
     * @param flag 
     */
    const toggleTheme = (flag?: boolean) => {
      const body = document.body
      if (flag === undefined) {
        isDark.value = !isDark.value
      } else {
        isDark.value = flag
      }
      // 设置body的主题
      if (body.getAttribute('theme')) {
        if (isDark.value) {
          body.setAttribute('theme', 'dark')
        } else {
          body.setAttribute('theme', 'light')
        }
      }
    }

    return {
      isDark,
      toggleTheme,
      toggleLocale
    }

  }
)