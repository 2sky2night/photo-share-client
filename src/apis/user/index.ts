import { request } from "@/utils"
import { UserInfoResponse } from "./types"

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const userInfoAPI = () => {
  return request.get<UserInfoResponse>('/user/info')
}

/**
 * 路径参数获取用户信息
 * @param uid 用户id
 * @returns 
 */
export const getUserInfoAPI = (uid: number) => {
  return request.get<UserInfoResponse>(`/user/info/${uid}`)
}