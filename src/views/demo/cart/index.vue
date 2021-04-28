<template>
  <Products />
  <Cart />
  <LoadMore />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Products from './Comps/Products.vue';
import Cart from './Comps/Cart.vue';

export default defineComponent({
  name: 'DemoCart',
  components: {
    Products,
    Cart,
  },
});
</script>

