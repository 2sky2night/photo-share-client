import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/auth'
import { userInfoAPI } from '@/apis/user'
import { reactive } from 'vue'
import { UserInfo } from '@/types/auth'
export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = reactive<UserInfo>({
      uid: undefined,
      username: undefined,
      avatar: undefined,
      token: undefined
    })
    // 用户登录
    const login = async (username: string, password: string) => {
      const res = await loginAPI({ username, password })
      userInfo.token = res.data.access_token
      getUserInfo()
    }
    // 获取用户信息
    const getUserInfo = async () => {
      const res = await userInfoAPI()
      userInfo.avatar = res.data.avatar
      userInfo.uid = res.data.uid
      userInfo.username = res.data.username
    }
    // 注销
    const logout = () => {
      Reflect.ownKeys(userInfo).forEach((ele) => {
        const key = ele as keyof UserInfo
        userInfo[key] = undefined
      })
    }
    return {
      userInfo,
      login,
      getUserInfo,
      logout
    }
  }
)
