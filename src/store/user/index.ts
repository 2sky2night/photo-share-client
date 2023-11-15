import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import { usePhotoStore } from "@User/store";
import { useRouteHistoryStore } from "@Admin/store";
import { loginAPI } from "@/apis/auth";
import { userInfoAPI, userEditInfoAPI, userEditPasswordAPI } from "@/apis/user";
import {
  registerUserRoutes,
  registerAdminRoutes,
  removeAllRoutes,
  registerInitRoutes,
} from "@/router/auth";
import { type Role, Roles } from "@/types/auth";
import type { UserInfo } from "./types";
import type { EditInfoBody, EditPasswordBody } from "@/apis/user/types";
import { startSSE, endSSE, es } from "@/utils/events";

export const useUserStore = defineStore(
  "user",
  () => {
    // 是游客登录?
    const isVisitor = ref(false);
    // 用户信息
    const userInfo = reactive<UserInfo>({
      uid: undefined,
      username: undefined,
      avatar: undefined,
      accessToken: undefined,
      role: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      refreshToken: undefined,
    });
    // 照片历史记录仓库
    const photoStore = usePhotoStore();
    // 后台项目浏览的页面历史记录仓库
    const routeHistoryStore = useRouteHistoryStore();

    /**
     * 登录
     * @param username 用户名
     * @param password 密码
     */
    const login = async (username: string, password: string) => {
      isVisitor.value = false;
      const res = await loginAPI({ username, password });
      // 获取用户的at
      userInfo.accessToken = res.data.access_token;
      // 获取用户的rt
      userInfo.refreshToken = res.data.refresh_token;
      // 获取用户信息（角色）
      await getUserInfo();
      // 卸载所有路由
      removeAllRoutes();
      // 重新注册初始路由
      registerInitRoutes();
      // 根据角色注册路由
      regiterRoutes(userInfo.role);
      if (userInfo.role === Roles.User) {
        if (es === null) startSSE();
      }
    };
    /**
     * 获取用户数据
     */
    const getUserInfo = async () => {
      const res = await userInfoAPI();
      userInfo.avatar = res.data.avatar;
      userInfo.uid = res.data.uid;
      userInfo.username = res.data.username;
      userInfo.role = res.data.role;
      userInfo.createdAt = res.data.createdAt;
      userInfo.updatedAt = res.data.updatedAt;
    };
    /**
     * 注销
     */
    const logout = async () => {
      if (userInfo.role === Roles.User) {
        // 删除所有历史记录
        photoStore.removeAll();
        // 断开SSE连接
        await endSSE();
      } else {
        // 管理员
        // 删除所有浏览的历史记录
        routeHistoryStore.deleteAllHistroy();
      }
      Reflect.ownKeys(userInfo).forEach((ele) => {
        const key = ele as keyof UserInfo;
        userInfo[key] = undefined;
      });
      // 卸载所有路由
      removeAllRoutes();
      // 注册初始路由
      registerInitRoutes();
    };
    /**
     * 根据角色注册路由
     * @param role
     */
    const regiterRoutes = (role?: Role) => {
      if (role === undefined || role === Roles.User) {
        if (isVisitor.value === true) {
          // 游客已经注册过路由了，阻止重复注册路由
          return;
        } else {
          registerUserRoutes(role ? false : true);
          if (!role) {
            // 游客首次进入前台，记录下
            isVisitor.value = true;
          }
        }
      } else {
        registerAdminRoutes(role);
      }
    };
    /**
     * 更新用户信息
     * @param body
     */
    const updateUserInfo = async (body: EditInfoBody) => {
      const {
        data: { avatar, username },
      } = await userEditInfoAPI(body);
      if (avatar) userInfo.avatar = avatar;
      if (username) userInfo.username = username;
    };
    /**
     * 更新用户的密码
     * @param body
     */
    const updateUserPassword = async (body: EditPasswordBody) => {
      await userEditPasswordAPI(body);
      // 注销并重新登录
      logout();
    };

    /**
     * 是否登录?
     */
    const isLogin = computed(() => {
      return (
        userInfo.avatar !== undefined &&
        userInfo.uid !== undefined &&
        userInfo.accessToken !== undefined &&
        userInfo.role !== undefined &&
        userInfo.username !== undefined
      );
    });

    /**
     * token
     */
    const token = computed(() => {
      if (isLogin.value) {
        return userInfo.accessToken as string;
      } else {
        return null;
      }
    });

    return {
      /**
       * 用户信息
       */
      userInfo,
      /**
       * 登录
       */
      login,
      /**
       * 获取并设置用户信息
       */
      getUserInfo,
      /**
       * 登出
       */
      logout,
      /**
       * 注册路由
       */
      regiterRoutes,
      /**
       * 更新用户信息
       */
      updateUserInfo,
      /**
       * 更新用户密码
       */
      updateUserPassword,
      /**
       * 是否登录
       */
      isLogin,
      /**
       * 用户token
       */
      token,
    };
  },
  {
    persist: true,
  }
);
