<template>
  <div class="wrap">
    <p class="title">- PRODUCTS -</p>
    <pure-load v-model:isLoading="isLoading" :isLoadOnMounted="true" :empty="empty" :error="error" @load="loadData">
      <ul>
        <li v-for="(e, i) in products" :key="i">
          <span class="title">{{ e.name }}({{ e.price }}) x {{ e.stock }}</span>
          <pure-button class="pure-button-confirm" :disabled="!e.stock" @click="addToCart(e)">
            Add To Cart
          </pure-button>
        </li>
      </ul>
    </pure-load>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { Store } from 'vuex';
import { State, useStore } from '@/store';
import PureUI from '@/components/pure-ui';
import { Product } from '@/models/Product';
import { ModelCount } from '@/models/ModelCount';

export default defineComponent({
  name: 'Products',
  components: {
    ...PureUI,
  },
  setup() {
    const store = useStore();
    return {
      store: reactive<Store<State>>(store),
      isLoading: ref<boolean>(false),
      error: ref<{ message: string } | null>(null),
      empty: ref<{ message: string } | null>(null),
      products: computed(() => store.state.products.list),
      addToCart: (e: Product) => store.dispatch('cart/addToCart', e),
    };
  },
  methods: {
    async loadData() {
      try {
        await this.store.dispatch('products/getProducts');
        this.error = null;
        this.empty = this.products.length === 0 ? { message: '暂无商品' } : null;
      } catch (err) {
        console.error(err);
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  margin: 20px 15px;
  text-align: center;
  .title {
    color: #333333;
    font-size: 15px;
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
      .pure-button {
        margin-left: 10px;
      }
    }
  }
  .pure-load {
    :deep(.slot-default-loading) {
      height: 100px;
    }
    :deep(.slot-default-empty) {
      height: 100px;
    }
    :deep(.slot-default-error) {
      height: 100px;
    }
  }
}
</style>
