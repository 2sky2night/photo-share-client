import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { nprogress } from "..";
import { useUserStore } from "@/store";
import type { BaseResponse, Response } from "./types";
import { i18n } from "@/config";
import { handle401, handle500, handle404 } from "./error-actions";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

//  请求拦截器
http.interceptors.request.use(
  (config) => {
    const {
      userInfo: { token },
    } = useUserStore();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    nprogress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    nprogress.end();
    return response.data;
  },
  (error: AxiosError<BaseResponse>) => {
    nprogress.end();
    // 错误处理
    if (error.response) {
      // 可以获取服务端的错误信息
      const { status } = error.response;
      if (status === 401) {
        handle401();
        return;
      } else if (status === 500) {
        handle500();
        return;
      } else if (status === 404) {
        handle404();
        return;
      }
      // 业务错误
      if (error.response.data.msg) {
        window.$message.error(error.response.data.msg);
      } else {
        window.$message.error(i18n.global.t("requestError"));
      }
    } else {
      // 其他错误
      window.$message.error(i18n.global.t("requestError"));
    }
    return Promise.reject(error);
  }
);

export const request = {
  get<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {}
  ): Promise<Response<T>> {
    return http.get(url, {
      ...config,
      params,
    });
  },
  post<T>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {}
  ): Promise<Response<T>> {
    return http.post(url, data, config);
  },
  delete<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {}
  ): Promise<Response<T>> {
    return http.delete(url, {
      ...config,
      params,
    });
  },
  put<T>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {}
  ): Promise<Response<T>> {
    return http.put(url, data, config);
  },
};
