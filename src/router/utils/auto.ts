import * as jsc from 'qx-js-core';
import { RouteRecordRaw } from 'vue-router';

/**
 * 自动将路径下的.vue文件映射为路由
 * records 为采用 import.meta.glob或者 globEager 引入的对象
 * basePath 为路径的前缀
 * 映射规则：
 * foo/bar/index.vue  +  basePath  ->   /basePath/foo/bar
 * foo/bar/abc.vue  +  basePath    ->   /basePath/foo/bar/abc
 */
export function autoRoutes(records: Record<string, { [key: string]: any }>, basePath: string): RouteRecordRaw[] {
  const arr: RouteRecordRaw[] = [];
  for (const key of Object.keys(records)) {
    const match = key.match(/[\x00-\x7F]+\/(.+)\.vue/);
    if (match && match.length === 2) {
      let name = match[1];
      let path = basePath;
      if (!path.startsWith('/')) {
        path = '/' + path;
      }
      if (name !== 'index') {
        if (path.length > 1 && !path.endsWith('/')) {
          path = path + '/';
        }
        path = path + name;
      }
      name = (basePath + '-' + name).replace(/\//, '-');
      arr.push({ path, name, component: records[key] });
      jsc.log(`[AUTO ROUTE] ${path}`);
    }
  }
  return arr;
}
