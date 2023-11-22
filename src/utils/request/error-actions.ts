// 错误处理
import { i18n } from "@/config";
import router from "@/router";
import { useUserStore } from "@/store";
import { refreshTokenAPI } from "@/apis/jwt";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { http } from "./";
import { Path404 } from "./config";
import type { BaseResponse } from "./types";

/**
 * 处理401错误
 */
export const handle401 = async (config?: InternalAxiosRequestConfig) => {
  const userStore = useUserStore();
  if (userStore.isLogin && userStore.userInfo?.refreshToken && config) {
    // 用户登录了
    try {
      // 通过rt获取at
      const {
        data: { data },
      } = await refreshTokenAPI(userStore.userInfo.refreshToken);
      // 更新用户的token数据
      userStore.userInfo.accessToken = data;
      // 重新发送上次失败的请求
      return http(config);
    } catch (error) {
      userStore.logout();
      window.$message.error(i18n.global.t("authorizationError"));
      router.replace("/login");
    }
  } else {
    // 未登录用户，注销用户信息
    userStore.logout();
    window.$message.error(i18n.global.t("authorizationError"));
    router.replace("/login");
  }
};

/**
 * 处理404错误
 */
export const handle404 = (error: AxiosError<BaseResponse>) => {
  if (error?.response?.data) window.$message.error(error.response.data.msg);
  if (error.config?.url && Path404.includes(error.config.url)) {
    // 白名单不跳转404
  } else {
    // 非白名单的请求路径需要跳转到404
    router.replace("/404");
  }
};

/**
 * 处理500错误
 */
export const handle500 = (error: AxiosError<BaseResponse>) => {
  if (error?.response?.data) window.$message.error(error.response.data.msg);
  router.replace("/500");
};
