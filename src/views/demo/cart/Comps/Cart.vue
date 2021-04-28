<template>
  <div class="cart">
    <h2>购物车</h2>
    <p v-show="!items.length"><i>添加商品到购物车</i></p>
    <ul>
      <li
        v-for="item in items"
        :key="item.model.id"
      >
        {{ item.model.name }} - {{ item.model.price }}
        <button :disabled="item.count === 0" @click="stepMinus(item.model.id)">-</button>
        {{ item.count }}
        <button :disabled="item.model.stock === 0" @click="stepAdd(item.model.id)">+</button>
      </li>
    </ul>
    <p>总计: {{ totalPrice }}</p>
    <p><button :disabled="!items.length" @click="buy(items)">购 买</button></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { Product } from '@/models/Product';
import { ModelCount } from '@/models/ModelCount';

export default defineComponent({
  name: 'Cart',
  components: {
    // HellowVue3,
  },
  setup() {
    const store = useStore();
    return {
      items: computed(() => store.state.cart.list),
      totalPrice: computed(() => store.getters['cart/totalPrice']),
      addToCart: (e: Product) => store.dispatch('cart/addToCart', e),
      buy: (products: Product[]) => store.dispatch('cart/buy', products),
      stepMinus: (id: string) => store.dispatch('cart/stepMinus', id),
      stepAdd: (id: string) => store.dispatch('cart/stepAdd', id),
    };
  },
  methods: {
  },
});
</script>

<style scoped>
</style>
