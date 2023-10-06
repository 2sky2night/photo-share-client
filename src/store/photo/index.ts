import { ref } from "vue";
import { defineStore } from "pinia";

export const usePhotoStore = defineStore(
  "photo",
  () => {
    const historyPids = ref<number[]>([]);

    // 添加照片历史记录
    const addPhotoHistory = (pid: number) => {
      const index = getHistoryIndex(pid);
      if (index !== -1) {
        // 存在
        historyPids.value.splice(index, 1);
      }
      historyPids.value.unshift(pid);
    };

    // 删除照片历史记录
    const removePhotoHistory = (pid: number) => {
      const index = getHistoryIndex(pid);
      if (index !== -1) {
        historyPids.value.splice(index, -1);
      }
    };

    // 此pid是否在照片历史中
    const getHistoryIndex = (pid: number) => {
      return historyPids.value.findIndex((id) => id === pid);
    };

    return {
      /**
       *浏览过的照片列表
       */
      historyPids,
      /**
       * 添加照片历史记录
       */
      addPhotoHistory,
      /**
       * 移除照片历史记录
       */
      removePhotoHistory,
    };
  },
  { persist: true }
);
