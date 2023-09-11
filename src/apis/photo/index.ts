import { request } from "@/utils"
import { RandomPicResponse } from "./types"

/**
 * 随机获取审核通过的图片
 * @param limit 获取的数量
 * @returns 
 */
export const randomPicAPI = (limit = 20) => {
  return request.get<RandomPicResponse>('/photo/random/pic', { limit })
}