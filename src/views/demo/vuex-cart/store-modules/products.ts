import { InjectionKey } from 'vue';
import { Store, Module } from 'vuex';
import { BaseState } from '@/store/index';
import * as shop from '@/api/shop';
const isDebug = import.meta.env.NODE_ENV !== 'production';
import { Product } from '@/models/Product';

export interface State {
  list: Product[];
}
const products: Module<State, BaseState> = {
  namespaced: isDebug,
  state: {
    list: [],
  },
  getters: {
  },
  actions: {
    async getProducts({ commit, state }) {
      const arr = await shop.getProducts();
      commit('setList', arr);
    },
  },
  mutations: {
    setList(state, data: Product[]) {
      state.list = data;
    },
    updateStock(state, { id, count }) {
      const product = state.list.find(e => e.id === id);
      if (product) {
        product.stock += count;
      }
    },
  },
};
export default products;
