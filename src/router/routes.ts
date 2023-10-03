import type { RouteRecordRaw } from "vue-router";
import { Roles } from "@/types/auth";
import { useUserStore } from "@/store";
import { isUserPath, registerUserRoutes } from "./auth";

/**
 * 初始路由
 */
export const initRoutes: RouteRecordRaw[] = [
  // {
  // 访问该路径直接进入首页
  //   path: '/',
  //   name: 'ReToLogin',
  //   redirect: '/login',
  //   meta: {
  //     noNeedForAuth: true
  //   }
  // },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      noNeedForAuth: true,
    },
  },
  {
    path: "/register",
    name: "Regiter",
    component: () => import("@/views/register/index.vue"),
    meta: {
      title: "注册",
      noNeedForAuth: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "Any",
    // redirect:'/404'
    redirect(to) {
      // 若访问的是用户表中的路由地址
      const { isLogin } = useUserStore();
      const flag = isUserPath(!isLogin, to.path);
      console.log(`${isLogin ? "登录用户" : "游客"}---访问结果为：${flag}`);
      switch (flag) {
        case 0:
          return "/404";
        case 1:
          // 匹配成功，注册并进入前台项目
          registerUserRoutes(!isLogin);
          return to.path;
        case 2:
          return "/404";
      }
    },
  },
];

/**
 * 后台管理路由表
 */
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Admin",
    component: () => import("@/layouts/admin/index.vue"),
    children: [
      {
        path: "/test1",
        name: "Test1",
        component: () => import("@/layouts/user/index.vue"),
        children: [
          {
            path: "/test11",
            name: "Test11",
            component: () => import("@/layouts/user/index.vue"),
          },
          {
            path: "/test12",
            name: "Test12",
            component: () => import("@/layouts/user/index.vue"),
            meta: {
              roles: [Roles.SuperAdmin],
            },
            children: [
              {
                path: "/test121",
                name: "Test121",
                component: () => import("@/layouts/user/index.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "Any",
    redirect: "/404",
  },
];

/**
 * 前台路由表
 */
export const userRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "User",
    component: () => import("@/layouts/user/index.vue"),
    children: [
      {
        path: "",
        name: "UserHome",
        component: () => import("@User/views/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/photo/detail/:pid",
        name: "UserPhotoDetail",
        component: () => import("@User/views/photo-detail/index.vue"),
        meta: {
          title: "详情",
        },
      },
      {
        path: "/my",
        name: "UserMy",
        component: () => import("@User/views/my/index.vue"),
        meta: {
          title: "我的",
          needAuth: true,
        },
        redirect: "/my/published",
        children: [
          {
            path: "/my/published",
            name: "UserMyPublished",
            component: () =>
              import("@User/views/my/children/published-photo/index.vue"),
            meta: {
              title: "发布的照片",
            },
          },
          {
            path: "/my/liked",
            name: "UserMyLiked",
            component: () =>
              import("@User/views/my/children/liked-photo/index.vue"),
            meta: {
              title: "喜欢的照片",
            },
          },
        ],
      },
      {
        path: "/user/:uid",
        name: "UserUser",
        component: () => import("@User/views/user/index.vue"),
        meta: {
          title: "用户",
        },
      },
      {
        path: "/test1",
        name: "Test1",
        component: () => import("@/layouts/user/index.vue"),
        children: [
          {
            path: "/test11",
            name: "Test11",
            component: () => import("@/layouts/user/index.vue"),
          },
          {
            path: "/test12",
            name: "Test12",
            component: () => import("@/layouts/user/index.vue"),
            meta: {
              needAuth: true,
            },
            children: [
              {
                path: "/test121",
                name: "Test121",
                component: () => import("@/layouts/user/index.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
];
