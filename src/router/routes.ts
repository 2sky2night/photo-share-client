import type { RouteRecordRaw } from "vue-router";

/**
 * 初始路由
 */
export const initRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Regiter',
    component: () => import("@/views/register/index.vue"),
    meta: {
      title: '注册'
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
    redirect: '/404'
  }
]
