<template>
  <ul class="xxx">
    <li
      v-for="e in products"
      :key="e.id"
    >
      {{ e.name }} - {{ e.price }} x {{ e.stock }}
      <br>
      <button
        :disabled="!e.stock"
        @click="addToCart(e)"
      >
        添加到购物车
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { Product } from '@/models/Product';
import { ModelCount } from '@/models/ModelCount';

export default defineComponent({
  name: 'Products',
  components: {
  },
  setup() {
    const store = useStore();
    store.dispatch('products/getProducts');
    return {
      products: computed(() => store.state.products.list),
      addToCart: (e: Product) => store.dispatch('cart/addToCart', e),
    };
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>
$color: red ;
.xxx { color : $color ;}


</style>
