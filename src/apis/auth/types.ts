/**
 * 登录的请求体
 */
export interface LoginBody {
  username: string;
  password: string;
}

/**
 * 注册的请求体
 */
export interface RegisterBody extends LoginBody {
}

/**
 * 登录成功的响应结果
 */
export interface LoginResponse {
  access_token: string;
}

/**
 * 注册成功的响应结果
 */
export type RegisterResponse = null;