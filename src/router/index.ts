import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { autoRoutes } from './utils/auto'; 

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('@/views/index.vue') },
  { path: '/playground', name: 'playground', component: () => import('@/views/playground.vue') },
  { path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@/views/other/404.vue') },
  ...autoRoutes(import.meta.glob('../views/demo/vue3/*.vue'), '/demo/vue3'),
  ...autoRoutes(import.meta.glob('../views/demo/cart/*.vue'), '/demo/cart'),
  ...autoRoutes(import.meta.glob('../views/demo/pure-ui/*.vue'), '/demo/pure-ui'),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: async (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.matched.every((record, i) => from.matched[i] !== record)) {
        return { left: 0, top: 0 };
      }
      return false;
    }
  },
});

export default router;
