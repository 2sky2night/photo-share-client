import { request } from "@/utils"
import { PhotoListResponse, RandomPicResponse, UserGetPhotoParams } from "./types"

/**
 * 随机获取审核通过的图片
 * @param limit 获取的数量
 * @returns 
 */
export const randomPicAPI = (limit = 20) => {
  return request.get<RandomPicResponse>('/photo/random/pic', { limit })
}

/**
 * 用户获取照片
 * @param param 
 * @returns 
 */
export const userGetPhotoAPI = (param: UserGetPhotoParams) => {

  const query: any = {
    limit: param.pageSize,
    offset: (param.page - 1) * param.pageSize,
    desc: param.desc === undefined ? true : param.desc
  }

  if (param.status !== undefined) {
    query.status = param.status
  }

  if (param.uid !== undefined) {
    query.uid = param.uid
  }

  return request.get<PhotoListResponse>('/photo/user/list', query)
}