<template>
  <pure-button class="pure-button-confirm-small">按钮</pure-button>
  <pure-button class="pure-button-confirm">按钮</pure-button>
  <pure-button class="pure-button-confirm-big">按钮</pure-button>

  <pure-button class="pure-button-alert-small">按钮</pure-button>
  <pure-button class="pure-button-alert">按钮</pure-button>
  <pure-button class="pure-button-alert-big">按钮</pure-button>

  
  <!-- <pure-button class="pure-button-confirm">按钮</pure-button>
  <pure-button class="pure-button-confirm">按钮</pure-button>
  <pure-button class="pure-button-alert">按钮</pure-button> -->

  <!-- <Refresh v-model:isLoading="isLoading" @load="loadData(true)" />
  <div v-for="(e, i) in list" :key="i" :class="i % 2 === 0 ? 'item' : 'item gray'">
    <div class="name">{{ e }}</div>
    <Button />
  </div>
  <LoadMore v-model:isLoading="isLoading" :isThereMore="isThereMore" @load="loadData(false)" />     -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseUI from '@/components/pure-ui';
import request from '@/utils/request';

export default defineComponent({
  name: 'Playground',
  components: {
    ...BaseUI,
  },
  directives: {

  },
  setup() {
    return {
      isLoading: ref(false),
      isThereMore: ref(true),
      count: ref(0),
      list: ref([] as string[]),
    };
  },
  async mounted() {
  },
  methods: {
    loadData(isRefresh: boolean) {
      if (isRefresh) {
        this.isThereMore = true;
        this.count = 0;
      }
      setTimeout(() => {
        const arr = [];
        for (let i = this.count; i < this.count + 20; i ++) {
          arr.push(`item-${i}`);
        }
        this.list = isRefresh ? arr : this.list.concat(arr);
        this.isLoading = false;
        this.count += 20;
        if (this.count >= 100) {
          this.isThereMore = false;
        }
      }, 1000);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/components/pure-ui/pure-button/styles.scss';
.item {
  height: 50px;
  line-height: 50px;
  position: relative;
  .name {
    position: absolute;
    left: 15px;
    top: 0px;
    line-height: 50px;
    font-weight: bold;
  }
}
.gray {
  background-color: #f5f5f5;
}
</style>
