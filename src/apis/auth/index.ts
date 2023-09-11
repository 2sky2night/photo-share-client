import { request } from "@/utils";
import type { LoginBody, LoginResponse, RegisterBody, RegisterResponse } from './types'

/**
 * 登录
 * @param bodyDto 请求体  
 * @returns token
 */
export const loginAPI = (bodyDto: LoginBody) => {
  return request.post<LoginResponse>('/auth/login', bodyDto)
}

/**
 * 注册
 * @param bodyDto 请求体 
 * @returns null
 */
export const reigterAPI = (bodyDto: RegisterBody) => {
  return request.post<RegisterResponse>('/auth/register', bodyDto)
}