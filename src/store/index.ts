import { InjectionKey } from '@vue/runtime-core';
import { createStore, createLogger, Store, useStore as _useStore } from 'vuex';
const isDebug = import.meta.env.NODE_ENV !== 'production';

import products, { State as ProductsState } from '@/views/demo/vuex-cart/store-modules/products';
import cart, { State as CartState } from '@/views/demo/vuex-cart/store-modules/cart';

export interface BaseState {
}
export interface State extends BaseState {
  products: ProductsState;
  cart: CartState;
}
export default createStore<BaseState>({
  strict: isDebug,
  modules: {
    products,
    cart,
  },
  plugins: isDebug ? [
    createLogger(),
  ] : [],
});

export const key: InjectionKey<Store<BaseState>> = Symbol('vue-store');
export function useStore<T = State>() {
  return _useStore<T>(key);
}