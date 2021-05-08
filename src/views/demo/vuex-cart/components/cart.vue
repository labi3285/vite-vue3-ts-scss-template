<template>
  <div class="wrap">
    <p class="title">- CART -</p>
    <p v-show="!items.length" class="empty-tip">Add from products</p>
    <ul>
      <li
        v-for="item in items"
        :key="item.model.id"
      >
        <span class="title">{{ item.model.name }} - {{ item.model.price }}</span>
        <pure-button class="pure-button-default" :disabled="item.count === 0" @click="stepMinus(item.model.id)">-</pure-button>
        <span class="count">{{ item.count }}</span>
        <pure-button class="pure-button-default" :disabled="item.model.stock === 0" @click="stepAdd(item.model.id)">+</pure-button>
      </li>
    </ul>
    <p class="total">Total: {{ totalPrice }}</p>
    <pure-button :disabled="!items.length" class="pure-button-confirm confirm-button" @click="buy(items)">BUY</pure-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { Store } from 'vuex';
import { State, useStore } from '@/store';
import PureUI from '@/components/pure-ui';
import { Product } from '@/models/Product';
import { ModelCount } from '@/models/ModelCount';

export default defineComponent({
  name: 'Cart',
  components: {
    ...PureUI,
  },
  setup() {
    const store = useStore();
    return {
      store: reactive<Store<State>>(store),
      items: computed(() => store.state.cart.list),
      totalPrice: computed(() => store.getters['cart/totalPrice']),
      addToCart: (e: Product) => store.dispatch('cart/addToCart', e),
      stepMinus: (id: string) => store.dispatch('cart/stepMinus', id),
      stepAdd: (id: string) => store.dispatch('cart/stepAdd', id),
    };
  },
  methods: {
    async buy(products: Product[]) {
      try {
        this.store.dispatch('cart/buy', products);
      } catch (err) {

      }
    },
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  margin: 20px 15px;
  text-align: center;
  .title {
    color: #333333;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .count {
    color: #333333;
    font-size: 15px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .empty-tip {
    color: #999999;
    text-align: center;
    font-size: 16px;
    line-height: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .total {
    color: orange;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .confirm-button {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  ul {
    width: 100%;
    text-align: center;
    li {
      padding: 10px 15px 10px 15px;
      .title {
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
</style>
