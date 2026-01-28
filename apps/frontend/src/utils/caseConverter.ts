// utils/caseConverter.ts
import humps from "humps";

// 将对象的 key 从 camelCase 转为 snake_case（递归）
export const camelizeKeys = (obj: any) => humps.camelizeKeys(obj);
export const decamelizeKeys = (obj: any) => humps.decamelizeKeys(obj);
