import { useRoute, onBeforeRouteUpdate } from "vue-router";

/**
 * 将路由查询参数中的数据解析成number型数据
 * @param cb 成功的回调
 * @param catchCb 失败的回调
 * @param excludes 哪些字段不需要校验?
 */
export function useQuery<R = Record<any, any>>(
  cb: (result: R) => void,
  catchCb: (errorKeys: string[]) => void,
  excludes: (keyof R)[] = []
) {
  // route
  const route = useRoute();

  // 校验参数
  function checkQuery(currentRoute = route) {
    const keyValues = Object.entries(currentRoute.query);
    const result: Partial<R> = {};
    const errorKeys: string[] = [];
    keyValues.forEach(([key, _value]) => {
      // @ts-ignore
      if (excludes.includes(key)) {
        // 不需要校验的参数
        Reflect.set(result, key, _value);
      } else {
        // 需要校验的参数
        const value = +(_value as string);
        if (isNaN(value)) {
          // 非法参数
          errorKeys.push(key);
        } else {
          // 参数合法
          Reflect.set(result, key, value);
        }
      }
    });
    if (errorKeys.length) {
      // 有错误的参数
      catchCb(errorKeys);
    } else {
      cb(result as R);
    }
  }
  // 立即校验
  checkQuery();

  onBeforeRouteUpdate((to) => checkQuery(to));
}
