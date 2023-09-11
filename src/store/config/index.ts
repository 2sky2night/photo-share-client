import { defineStore } from "pinia";
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'config',
  () => {

    // 主题
    const isDark = ref(false)

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
          body.setAttribute('theme','dark')
        } else {
          body.setAttribute('theme', 'light')
        }
      }
    }

    return {
      isDark,
      toggleTheme
    }

  }
)