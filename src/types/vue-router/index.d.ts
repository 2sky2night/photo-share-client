// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  /**
   * 路由元信息
   */
  interface RouteMeta {
    /**
     * 页面标题
     */
    title: string;
  }
}