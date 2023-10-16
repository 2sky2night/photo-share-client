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
       * 是否展开侧边栏,真展开，假不展开
       */
      isExpand: true,
      /**
       * 是否全屏?
       */
      isFullScreen: false,
    });

    // 侧边栏展开切换
    const toggleSider = () => {
      settingData.value.isExpand = !settingData.value.isExpand;
      // 通过修改css变量实现侧边栏的展开和缩放
      document.body.style.setProperty(
        "--admin-sider-width",
        settingData.value.isExpand ? "200px" : "65px"
      );
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

    // 同步css侧边栏宽度初始值
    onMounted(() => {
      document.body.style.setProperty(
        "--admin-sider-width",
        settingData.value.isExpand ? "200px" : "65px"
      );
    });

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
