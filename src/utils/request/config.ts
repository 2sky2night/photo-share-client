/**
 * axios基础配置
 */
export const AxiosConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
};

/**
 * 哪些请求路径不会被因为404状态而跳转到404页面
 */
export const Path404 = ["/auth/login"];
