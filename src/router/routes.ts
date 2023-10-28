import type { RouteRecordRaw } from "vue-router";
import { Roles } from "@/types/auth";
import { useUserStore } from "@/store";
import {
  addAdminRoutes,
  isAdminPath,
  isUserPath,
  registerUserRoutes,
} from "./auth";

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
      title: "signin",
      noNeedForAuth: true,
    },
  },
  {
    path: "/register",
    name: "Regiter",
    component: () => import("@/views/register/index.vue"),
    meta: {
      title: "signup",
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
      // 根据用户登录态和信息来定向和注册路由

      const { isLogin, userInfo } = useUserStore();
      if (isLogin) {
        //  若是登录用户，根据用户角色来注册不同路由表
        if (userInfo.role === Roles.User) {
          // 是User,注册并进入前台项目
          return toUser();
        } else {
          // 管理员，注册并进入后台项目
          return toAdmin();
        }
      } else {
        // 未登录，只能进入前台项目
        return toUser();
      }

      // 匹配并注册前台路径
      function toUser() {
        const flag = isUserPath(!isLogin, to.path);
        console.log(
          `前台项目---Role:${isLogin ? "User" : "游客"}---访问结果为：${flag}`
        );
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
      }

      function toAdmin() {
        const flag = isAdminPath(to.path, userInfo.role as any);
        console.log(`后台项目---Role:${userInfo.role}---访问结果为：${flag}`);
        switch (flag) {
          case 0:
            return "/404";
          case 1:
            // 匹配成功，注册并进入后台项目
            addAdminRoutes(userInfo.role as any);
            return to.path;
          case 2:
            return "/404";
        }
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
        path: "/",
        name: "Home",
        component: () => import("@Admin/views/home/index.vue"),
        meta: {
          title: "home",
          icon: "HomeIcon",
        },
      },
      {
        path: "/audit",
        name: "audit",
        redirect: "/audit/photo",
        meta: {
          title: "audit",
          icon: "AuditIcon",
        },
        children: [
          {
            path: "/audit/photo",
            name: "AuditPhoto",
            component: () =>
              import("@Admin/views/audit/children/photo/index.vue"),
            meta: {
              title: "photo",
              icon: "PhotoIcon",
            },
          },
        ],
      },
      {
        path: "/manage",
        name: "Manage",
        redirect: "/manage/comment",
        meta: {
          title: "manage",
          icon: "ManageIcon",
        },
        children: [
          {
            path: "/manage/comment",
            name: "ManageComment",
            component: () =>
              import("@Admin/views/manage/children/comment/index.vue"),
            meta: {
              title: "comment",
              icon: "CommentIcon",
            },
          },
          {
            path: "/manage/tags",
            name: "ManageTags",
            component: () =>
              import("@Admin/views/manage/children/tags/index.vue"),
            meta: {
              title: "tags",
              icon: "TagsIcon",
            },
          },
        ],
      },
      {
        path: "/account",
        name: "account",
        component: () => import("@Admin/views/account/index.vue"),
        meta: {
          roles: [Roles.SuperAdmin],
          title: "account",
          icon: "UserIcon",
        },
      },
      {
        path: "/edit",
        name: "Edit",
        component: () => import("@Admin/views/edit/index.vue"),
        meta: {
          title: "titleEdit",
          icon: "EditIcon",
        },
      },
      // {
      //   path: "/test1",
      //   name: "Test1",
      //   component: () => import("@/layouts/admin/index.vue"),
      //   meta: {
      //     title: "test1",
      //     icon: "BookIcon",
      //   },
      //   children: [
      //     {
      //       path: "/test11",
      //       name: "Test11",
      //       component: () => import("@/layouts/admin/index.vue"),
      //       meta: {
      //         title: "test11",
      //         icon: "BookIcon",
      //       },
      //     },
      //     {
      //       path: "/test12",
      //       name: "Test12",
      //       component: () => import("@/layouts/admin/index.vue"),
      //       meta: {
      //         roles: [Roles.SuperAdmin],
      //         title: "test12",
      //         icon: "BookIcon",
      //       },
      //       children: [
      //         {
      //           path: "/test121",
      //           name: "Test121",
      //           component: () => import("@/layouts/admin/index.vue"),
      //           meta: {
      //             title: "test11",
      //             icon: "BookIcon",
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
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
          title: "home",
        },
      },
      {
        path: "/photo/detail/:pid",
        name: "UserPhotoDetail",
        component: () => import("@User/views/photo-detail/index.vue"),
        meta: {
          title: "photoDetail",
        },
      },
      {
        path: "/my",
        name: "UserMy",
        component: () => import("@User/views/my/index.vue"),
        meta: {
          title: "my",
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
              title: "photoIPost",
            },
          },
          {
            path: "/my/liked",
            name: "UserMyLiked",
            component: () =>
              import("@User/views/my/children/liked-photo/index.vue"),
            meta: {
              title: "photoILiked",
            },
          },
        ],
      },
      {
        path: "/user/:uid",
        name: "UserUser",
        component: () => import("@User/views/user/index.vue"),
        meta: {
          title: "user",
        },
      },
      {
        path: "/edit",
        name: "UserEdit",
        component: () => import("@User/views/edit/index.vue"),
        meta: {
          needAuth: true,
        },
        redirect: "/edit/info",
        children: [
          {
            path: "/edit/info",
            name: "UserEditInfo",
            component: () => import("@User/views/edit/children/info/index.vue"),
            meta: {
              title: "editPofile",
            },
          },
          {
            path: "/edit/password",
            name: "UserEditPassword",
            component: () =>
              import("@User/views/edit/children/password/index.vue"),
            meta: {
              title: "editPassword",
            },
          },
        ],
      },
      {
        path: "/history",
        name: "UserHistory",
        component: () => import("@User/views/history/index.vue"),
        meta: {
          title: "history",
        },
      },
      {
        path: "/search",
        name: "UserSearch",
        component: () => import("@User/views/search/index.vue"),
        meta: {
          title: "search",
        },
      },
      {
        path: "/photo/post",
        name: "UserPhotoPost",
        component: () => import("@User/views/photo-post/index.vue"),
        meta: {
          needAuth: true,
          title: "postPhoto",
        },
      },
    ],
  },
];
