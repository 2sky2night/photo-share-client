import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import { loginAPI } from '@/apis/auth'
import { userInfoAPI } from '@/apis/user'
import { Role, Roles, UserInfo } from '@/types/auth'
import { registerUserRoutes, registerAdminRoutes, removeAllRoutes, registerInitRoutes } from '@/router/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    // 是游客登录?
    const isVisitor = ref(false)
    // 用户信息
    const userInfo = reactive<UserInfo>({
      uid: undefined,
      username: undefined,
      avatar: undefined,
      token: undefined,
      role: undefined,
    })
    /**
     * 登录
     * @param username 
     * @param password 
     */
    const login = async (username: string, password: string) => {
      isVisitor.value = false
      const res = await loginAPI({ username, password })
      userInfo.token = res.data.access_token
      // 获取用户信息（角色）
      await getUserInfo()
      // 根据角色注册路由
      regiterRoutes(userInfo.role)
    }
    /**
     * 获取用户数据
     */
    const getUserInfo = async () => {
      const res = await userInfoAPI()
      userInfo.avatar = res.data.avatar
      userInfo.uid = res.data.uid
      userInfo.username = res.data.username
      userInfo.role = res.data.role
    }
    /**
     * 注销
     */
    const logout = () => {
      Reflect.ownKeys(userInfo).forEach((ele) => {
        const key = ele as keyof UserInfo
        userInfo[key] = undefined
      })
      // 卸载所有路由
      removeAllRoutes()
      // 注册初始路由
      registerInitRoutes()
    }
    /**
     * 根据角色注册路由
     * @param role 
     */
    const regiterRoutes = (role?: Role) => {
      if (role === undefined || role === Roles.User) {
        if (isVisitor.value === true) {
          // 游客已经注册过路由了，阻止重复注册路由
          return
        } else {
          registerUserRoutes(role ? false : true)
          if (!role) {
            // 游客首次进入前台，记录下
            isVisitor.value = true
          }
        }
      } else {
        registerAdminRoutes(role)
      }
    }

    /**
     * 是否登录?
     */
    const isLogin = computed(() => {
      return (
        userInfo.avatar !== undefined &&
        userInfo.uid !== undefined &&
        userInfo.token !== undefined &&
        userInfo.role !== undefined &&
        userInfo.username !== undefined
      )
    })

    return {
      userInfo,
      login,
      getUserInfo,
      logout,
      regiterRoutes,
      isLogin
    }
  }
)
