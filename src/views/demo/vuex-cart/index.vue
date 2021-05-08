<template>
  <div class="wrap">
    <pure-navigation-bar>Vuex Cart</pure-navigation-bar>
    <pure-better-scroll class="content">
      <products />
      <pure-break :isTopLine="true" :isBottomLine="true" />
      <cart />
    </pure-better-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PureUI from '@/components/pure-ui';
import TitleArrowCell from '@/components/title-arrow-cell/index.vue';
import Products from './components/products.vue';
import Cart from './components/cart.vue';

export default defineComponent({
  name: 'DemoCart',
  components: {
    ...PureUI,
    TitleArrowCell,
    Products,
    Cart,
  },
});
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
  }
}
</style>

