import { DataParamP } from "./types";

/**
 * 处理数据模块的参数
 * @param days 
 * @param limit 
 */
export const resolveDataParam = (days?: number, limit?: number) => {
   const query: DataParamP = {};
   if (days !== undefined) {
     query.days = days;
   }
   if (limit !== undefined) {
     query.limit = limit;
  }
  return query
}