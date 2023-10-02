import { useRoute, onBeforeRouteUpdate } from "vue-router";

/**
 * 解析路由params参数为数值型
 * @param cb 校验成功的回调
 * @param cbError 校验失败的回调
 * @param paramsOut 哪些参数不需要校验?
 */
export function useParams<R = any>(
  cb: (result: R) => void,
  cbError: (errorKeys: string[]) => void,
  paramsOut: string[] = []
) {
  const route = useRoute();

  // 校验路由路径参数
  const checkParams = (currteRoute = route) => {
    const params = currteRoute.params;
    const keys = Object.keys(params);
    // 结果
    const result: Record<keyof typeof params, number | string> = {};
    // 错误的参数
    const errorKeys: string[] = [];
    // 遍历每个参数
    keys.forEach((key) => {
      if (paramsOut.includes(key)) {
        // 不需要校验的参数
        result[key] = params[key] as string;
      } else {
        // 需要校验的参数
        const value = +params[key];
        if (isNaN(value)) {
          // 参数不合法!保存不合法的
          errorKeys.push(key);
        } else {
          result[key] = value;
        }
      }
    });
    if (errorKeys.length) {
      // 参数不合法
      cbError(errorKeys);
    } else {
      // 参数合法
      // @ts-ignore
      cb(result);
    }
  };

  // 立即执行一次进行校验
  checkParams();

  // 路由更新时进行校验
  onBeforeRouteUpdate((to) => {
    checkParams(to);
  });
}
