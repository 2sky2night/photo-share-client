import { Role } from "@/types/auth";
import router from ".";
import { adminRoutes, initRoutes, userRoutes } from "./routes";

/**
 * 注册初始路由
 */
export const registerInitRoutes = () => {
  initRoutes.forEach((route) => {
    router.addRoute(route);
  });
};

/**
 * 卸载所有路由
 */
export const removeAllRoutes = () => {
  router.getRoutes().forEach((route) => {
    if (route.name) {
      router.removeRoute(route.name);
    }
  });
};

/**
 * 注册前台路由
 * @param visitor 是否为游客访问前台系统
 * 游客保留登录注册页面
 */
export const registerUserRoutes = (visitor: boolean) => {
  if (visitor) {
    // 游客
    // 移除重定向login路由 现在 / 为前台首页了
    // router.removeRoute('ReToLogin')
    // 根据元信息递归注册路由表
    addVisitorRoutes();
  } else {
    // user
    // 1.移除登录和注册
    router.getRoutes().forEach((route) => {
      if (route.name && route.meta?.noNeedForAuth) {
        router.removeRoute(route.name);
      }
    });
    // 2.注册所有user路由,由于User可以使用所有User路由表，所有直接注册就可以了
    userRoutes.forEach((route) => {
      if (route.name) {
        router.addRoute(route);
      }
    });
  }
};

/**
 * 根据用户表中记录的权限，给游客注册路由
 */
const addVisitorRoutes = (parentName?: string, routes = userRoutes) => {
  routes.forEach((route) => {
    if (route.name) {
      if (!route.meta?.needAuth) {
        // 不需要登录
        if (route.children) {
          // 有孩子
          parentName
            ? router.addRoute(parentName, { ...route, children: [] })
            : router.addRoute({ ...route, children: [] });
          if (route.children.length) {
            // 注册子路由
            addVisitorRoutes(route.name as string, route.children);
          }
        } else {
          // 无孩子
          parentName
            ? router.addRoute(parentName, route)
            : router.addRoute(route);
        }
      }
    } else {
      console.log(route.path + "没有name属性");
    }
  });
};

/**
 * 注册后台路由
 * @param role 用户角色
 */
export const registerAdminRoutes = (role: Role) => {
  // 1.移除所有路由
  removeAllRoutes();
  // 2.注册后台路由
  addAdminRoutes(role);
};

/**
 * 根据账户权限注册后台路由
 */
export const addAdminRoutes = (
  role: Role,
  parentName?: string,
  routes = adminRoutes
) => {
  routes.forEach((route) => {
    if (route.name) {
      if (route.meta?.roles) {
        if (adminHasPermisson(route.meta.roles, role)) {
          // 有权限
          if (route.children && route.children.length) {
            // 有子孩子
            parentName
              ? router.addRoute(parentName, { ...route, children: [] })
              : router.addRoute({ ...route, children: [] });
            // 递归注册子孩子
            addAdminRoutes(role, route.name as string, route.children);
          } else {
            // 无子孩子
            parentName
              ? router.addRoute(parentName, route)
              : router.addRoute(route);
          }
        }
      } else {
        // 无元信息或无roles属性
        if (route.children && route.children.length) {
          // 有子孩子
          parentName
            ? router.addRoute(parentName, { ...route, children: [] })
            : router.addRoute({ ...route, children: [] });
          // 递归注册子孩子
          addAdminRoutes(role, route.name as string, route.children);
        } else {
          // 无子孩子
          parentName
            ? router.addRoute(parentName, route)
            : router.addRoute(route);
        }
      }
    } else {
      console.log(`路由${route.path}没有name属性`);
    }
  });
};

/**
 * 管理员是否有权限访问路由？
 * @param roles 路由所需要的角色
 * @param role 当前用户的角色
 * @returns
 */
export const adminHasPermisson = (roles: Role[], role: Role) => {
  return roles.includes(role);
};

/**
 * 是否为前台路由表中的路径
 * @param path 路径
 * @returns 0未命中 1允许访问 2禁止访问
 */
export const isUserPath = (
  isVisitor: boolean,
  path: string,
  routes = userRoutes
): 0 | 1 | 2 => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route.path === path) {
      // 正常路径
      if (route.meta?.needAuth && isVisitor) {
        return 2;
      } else {
        return 1;
      }
    } else if (route.path.includes("/:")) {
      // 参数路径
      // 只能校验有一个路径参数的，若有多个路径参数需要把路径参数都去除掉再做检验
      // 截取出真实路径
      const route_path = route.path.substring(0, route.path.indexOf("/:"));
      // 将路径中的参数路径解析出来
      const _path = path.split("/");
      // 把末尾的路径参数解析出来
      _path.pop();
      // 校验路径参数和真实路径
      if (route_path === _path.join("/")) {
        if (route.meta?.needAuth && isVisitor) {
          return 2;
        } else {
          return 1;
        }
      }
    }
    if (route.children && route.children.length) {
      const res = isUserPath(isVisitor, path, route.children);
      return res;
    }
  }
  // 未命中
  return 0;
};


/**
 * 前台
 * 1.登录用户：移除登录注册，注册所有前台页面
 * 2.游客：注册前台页面时，需要过滤掉需要登陆的页面
 */

/**
 * 后台：只能登录用户访问，根据角色身份，注册路由表
 */

/**
 * 注销：清除所有路由，注册登录注册路由
 */
