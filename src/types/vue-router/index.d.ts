// typings.d.ts or router.ts
import 'vue-router'
import { Role } from '../auth';

declare module 'vue-router' {
  /**
   * 路由元信息
   */
  interface RouteMeta {
    /**
     * 页面标题
     */
    title?: string;
    /**
     * 需要登录
     * @scope 前台项目
     */
    needAuth?: boolean;
    /**
     * 登录用户不需要的路由
     */
    noNeedForAuth?: boolean;
    /**
     * 哪些角色可以访问?
     * @scope 后台项目
     */
    roles?: Role[];
  }
}