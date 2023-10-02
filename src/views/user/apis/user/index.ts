import { request } from "@/utils";
import { UserInfoResponse } from "./types";

/**
 * 通过路径参数获取User信息
 * @param uid 用户id
 * @returns 获取User信息
 */
export const getUserInfoByParamAPI = (uid: number) => {
  return request.get<UserInfoResponse>(`/user/info/${uid}`);
};
