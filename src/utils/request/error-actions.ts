// 错误处理
import { i18n } from "@/config";
import router from "@/router";
import { useUserStore } from "@/store";

/**
 * 处理401错误
 */
export const handle401 = () => {
  const userStore = useUserStore();
  // 注销用户信息
  userStore.logout();
  window.$message.error(i18n.global.t("authorizationError"));
  router.replace("/login");
};

/**
 * 处理404错误
 */
export const handle404 = () => {
  router.replace("/404");
};

/**
 * 处理500错误
 */
export const handle500 = () => {
  router.replace("/500");
};
