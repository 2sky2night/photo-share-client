// typings.d.ts or router.ts
import "vue-router";
import { Role } from "../auth";

declare module "vue-router" {
  /**
   * 路由元信息
   */
  interface RouteMeta {
    /**
     * 页面标题
     * @see 后台必须加，用来渲染菜单的标题
     */
    title?: string;
    /**
     * 需要登录
     * @scope 前台项目
     */
    needAuth?: boolean;
    /**
     * 登录用户不需要的路由
     * @scope 前台项目
     */
    noNeedForAuth?: boolean;
    /**
     * 哪些角色可以访问?
     * @scope 后台项目
     */
    roles?: Role[];
    /**
     * 菜单图标
     * @see 后台项目必须加，用来渲染菜单项的图标
     */
    icon?: string;
  }
}
