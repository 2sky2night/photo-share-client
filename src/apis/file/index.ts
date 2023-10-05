import { request } from "@/utils";
import type { UploadPhotoResponse, UploadAvatarResponse } from "./types";

/**
 * 上传头像
 * @param data
 * @returns
 */
export const uploadAvatarAPI = (data: FormData) => {
  return request.post<UploadAvatarResponse>("/file/upload/avatar", data);
};

/**
 * 上传照片
 * @param data
 * @returns
 */
export const uploadPhotoAPI = (data: FormData) => {
  return request.post<UploadPhotoResponse>("/file/upload/photo", data);
};