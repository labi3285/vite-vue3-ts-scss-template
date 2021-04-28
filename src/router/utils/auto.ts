import * as jsc from 'qx-js-core';

import { RouteRecordRaw } from 'vue-router';

// import.meta.globEager('../views/*.vue');
export function autoRoutes(records: Record<string, { [key: string]: any }>, basePath: string): RouteRecordRaw[] {
  const arr: RouteRecordRaw[] = [];
  for (const key of Object.keys(records)) {
    const match = key.match(/[\x00-\x7F]+\/(.+)\.vue/);
    if (match && match.length === 2) {
      const name = match[1];
      let path = basePath;
      if (!path.startsWith('/')) {
        path = '/' + path;
      }
      if (name !== 'index') {
        if (!path.endsWith('/')) {
          path = path + '/';
        }
        path = path + name;
      }
      arr.push({ path, name, component: records[key] });
      jsc.log(`[AUTO ROUTE] path:${path}`);
    }
  }
  return arr;
}
