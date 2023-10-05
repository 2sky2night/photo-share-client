import { request } from "@/utils";
import type {
  EditInfoBody,
  EditInfoResponse,
  EditPasswordBody,
  EditPasswordResponse,
  UserInfoResponse,
} from "./types";

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const userInfoAPI = () => {
  return request.get<UserInfoResponse>("/user/info");
};

/**
 * 更新用户密码
 * @param body
 * @returns
 */
export const userEditPasswordAPI = (body: EditPasswordBody) => {
  return request.put<EditPasswordResponse>("/user/password", body);
};

/**
 * 更新用户信息
 * @param body
 * @returns
 */
export const userEditInfoAPI = (body: EditInfoBody) => {
  return request.put<EditInfoResponse>("/user/update", body);
};
