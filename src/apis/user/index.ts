import { request } from "@/utils";
import { UserInfoResponse } from "./types";

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const userInfoAPI = () => {
  return request.get<UserInfoResponse>("/user/info");
};