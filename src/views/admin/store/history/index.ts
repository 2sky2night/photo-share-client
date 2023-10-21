import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteHistoryItem } from "./types";

/**
 * 后台项目，页面浏览的历史记录仓库
 */
export const useRouteHistoryStore = defineStore(
  "admin:route-history",
  () => {
    const history = ref<RouteHistoryItem[]>([
      {
        path: "/",
        title: "home",
      },
    ]);

    const addHistory = (item: RouteHistoryItem) => {
      if (getHistoryIndex(item.path) === -1) {
        history.value.push(item);
      }
    };

    const deleteHistory = (path: string) => {
      const index = getHistoryIndex(path);
      if (index !== -1) {
        history.value.splice(index, 1);
      }
    };

    const deleteAllHistroy = () => {
      history.value.splice(1, history.value.length - 1);
    };

    // 获取该路径在历史记录中的索引
    const getHistoryIndex = (path: string) => {
      return history.value.findIndex((route) => route.path === path);
    };

    const deleteOtherHistroy = (path: string) => {
      const index = getHistoryIndex(path);
      if (path === "/") {
        history.value = [history.value[0]];
      } else {
        history.value = [history.value[0], history.value[index]];
      }
    };

    return {
      /**
       * 路由浏览的历史记录
       */
      history,
      /**
       * 添加历史记录
       */
      addHistory,
      /**
       * 删除历史记录
       */
      deleteHistory,
      /**
       * 删除所有历史记录
       */
      deleteAllHistroy,
      /**
       * 删除其他历史记录（保留当前历史记录）
       */
      deleteOtherHistroy,
    };
  },
  {
    persist: true,
  }
);
