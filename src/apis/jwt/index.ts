import { Response } from "@/utils/request/types";
import { RefreshTokenResponse } from "./types";
import { axiosIns } from "@/utils/request";

/**
 * 刷新token
 * @param token 身份令牌
 * @returns
 */
export const refreshTokenAPI = (token: string) => {
  return axiosIns.get<Response<RefreshTokenResponse>>("/jwt/refresh", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
