import type { RouteRecordRaw } from "vue-router";
import { Roles } from "@/types/auth";
import { useUserStore } from "@/store";

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
    name: 'Any',
    redirect(to) {
      // 若访问的是用户表中的路由地址
      if (isUserPath(to.path)) {
        console.log('直接访问前台')
        const userStore = useUserStore()
        // 根据用户是否登录来注册路由
        userStore.regiterRoutes(userStore.isLogin ? userStore.userInfo.role : undefined)
        return to.path
      } else {
        // 非用户路由表返回404
        return '/404'
      }
    }
  }
]

/**
 * 是否为前台路由表中的路径
 * @param path 路径
 */
const isUserPath = (path: string, routes = userRoutes) => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (route.path === path) {
      return true
    } else if (route.path.includes('/:')) {
      // 参数路径
      // 只能校验有一个路径参数的，若有多个路径参数需要把路径参数都去除掉再做检验
      // 截取出真实路径
      const route_path = route.path.substring(0, route.path.indexOf('/:'))
      // 将路径中的参数路径解析出来
      const _path = path.split('/')
      // 把末尾的路径参数解析出来
      _path.pop()
      // 校验路径参数和真实路径
      // console.log(route_path, _path.join('/'));
      if (route_path === _path.join('/')) {
        return true
      }
    }
    if (route.children && route.children.length) {
      const res = isUserPath(path, route.children)
      if (res) {
        return true
      }
    }
  }
}

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
    name: 'Any',
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
        path: '',
        name: "UserHome",
        component: () => import('@/views/user/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/photo/detail/:pid',
        name: 'UserPhotoDetail',
        component: () => import("@/views/user/views/photo-detail/index.vue"),
        meta: {
          title: '详情'
        }
      },
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