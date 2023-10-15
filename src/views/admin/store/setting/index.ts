import { defineStore } from "pinia";
import { ref, onBeforeUnmount, onMounted } from "vue";

/**
 * 后台项目:设置仓库
 */
export const useSettingStore = defineStore(
  "admin:setting",
  () => {
    // 设置相关数据
    const settingData = ref({
      /**
       * 是否展开侧边栏
       */
      isExpand: false,
      /**
       * 是否全屏?
       */
      isFullScreen: false,
    });

    // 侧边栏展开切换
    const toggleSider = () => {
      settingData.value.isExpand = !settingData.value.isExpand;
    };

    // 全屏切换
    const toggleFullScreen = () => {
      settingData.value.isFullScreen = !settingData.value.isFullScreen;
      if (document.fullscreenEnabled) {
        settingData.value.isFullScreen
          ? document.documentElement.requestFullscreen()
          : document.fullscreenElement !== null
          ? document.exitFullscreen()
          : null;
      }
    };

    return {
      /**
       * 设置的相关数据
       */
      settingData,
      /**
       * 侧边栏展开切换
       */
      toggleSider,
      /**
       * 全屏切换
       */
      toggleFullScreen,
    };
  },
  {
    persist: true,
  }
);
