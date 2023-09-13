import type { RouteRecordRaw } from "vue-router";
import { Roles } from "@/types/auth";

/**
 * 初始路由
 */
export const initRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'reToLogin',
    redirect: '/login',
    meta: {
      noNeedForAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: '登录',
      noNeedForAuth: true
    }
  },
  {
    path: '/register',
    name: 'Regiter',
    component: () => import("@/views/register/index.vue"),
    meta: {
      title: '注册',
      noNeedForAuth: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'any',
    redirect: '/404'
  }
]

/**
 * 后台管理路由表
 */
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Admin',
    component: () => import('@/layouts/admin/index.vue'),
    children: [
      {
        path: '/test1',
        name: 'Test1',
        component: () => import('@/layouts/user/index.vue'),
        children: [
          {
            path: '/test11',
            name: 'Test11',
            component: () => import('@/layouts/user/index.vue'),
          },
          {
            path: '/test12',
            name: 'Test12',
            component: () => import('@/layouts/user/index.vue'),
            meta: {
              roles: [Roles.SuperAdmin]
            },
            children: [
              {
                path: '/test121',
                name: 'Test121',
                component: () => import('@/layouts/user/index.vue'),
              }
            ]
          }
        ]
      }
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'any',
    redirect: '/404'
  }
]

/**
 * 前台路由表
 */
export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'User',
    component: () => import('@/layouts/user/index.vue'),
    children: [
      {
        path: '/test1',
        name: 'Test1',
        component: () => import('@/layouts/user/index.vue'),
        children: [
          {
            path: '/test11',
            name: 'Test11',
            component: () => import('@/layouts/user/index.vue'),
          },
          {
            path: '/test12',
            name: 'Test12',
            component: () => import('@/layouts/user/index.vue'),
            meta: {
              needAuth: true
            },
            children: [
              {
                path: '/test121',
                name: 'Test121',
                component: () => import('@/layouts/user/index.vue'),
              }
            ]
          }
        ]
      }
    ],
  }
]