import { Module } from 'vuex';
import { BaseState } from '../index';
import * as shop from '@/api/shop';
const isDebug = import.meta.env.NODE_ENV !== 'production';
import { Product } from '@/models/Product';
import { ModelCount } from '@/models/ModelCount';

export interface State {
  list: ModelCount<Product>[];
}
const cart: Module<State, BaseState> = {
  namespaced: isDebug,
  state: {
    list: [],
  },
  getters: {
    totalPrice: (state, getters) => {
      return state.list.reduce((total, item) => {
        return total + item.model.price * item.count;
      }, 0);
    },
  },
  actions: {
    async buy({ commit, state }, products) {
      await shop.buyProducts(products);
      commit('setList', []);
    },
    async addToCart({ state, commit }, product: Product) {
      if (product.stock > 0) {
        const item = state.list.find(e => e.model.id === product.id);
        if (!item) {
          commit('setList', state.list.concat([{
            model: product,
            count: 1,
          }]));
        } else {
          commit('updateCount', { id: product.id, count: 1 });
        }
        commit('products/updateStock', { id: product.id, count: -1 }, { root: true });
      }
    },
    async stepAdd({ state, commit }, id: string) {
      const item = state.list.find(e => e.model.id === id);
      if (item) {
        commit('updateCount', { id, count: 1 });
        commit('products/updateStock', { id, count: -1 }, { root: true });
      }
    },
    async stepMinus({ state, commit }, id: string) {
      const item = state.list.find(e => e.model.id === id);
      if (item && item.count > 0) {
        commit('updateCount', { id, count: -1 });
        commit('products/updateStock', { id, count: 1 }, { root: true });
      }
    },
  },
  mutations: {
    setList(state, data: ModelCount<Product>[]) {
      state.list = data;
    },
    updateCount(state, { id, count }) {
      const item = state.list.find(e => e.model.id === id);
      if (item) {
        item.count += count;
      }
    },
  },
};
export default cart;
