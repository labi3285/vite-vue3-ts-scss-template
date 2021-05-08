<template>
  <div class="wrap">
    <pure-navigation-bar>pure-ui</pure-navigation-bar>
    <pure-better-scroll class="content">
      <title-arrow-cell v-for="(e, i) in list" :key="i" :index="i" :title="e.name" @click="listItemClick(e)" />
    </pure-better-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PureUI from '@/components/pure-ui';
import TitleArrowCell from '@/components/title-arrow-cell/index.vue';
import routerMixin from '@/components/pure-ui/utils/mixins/router';

export default defineComponent({
  components: {
    ...PureUI,
    TitleArrowCell,
  },
  mixins: [
    routerMixin,
  ],
  setup() {
    return {
      list: ref<{ name: string }[]>([
        { name: 'pure-button' },
        { name: 'pure-options' },
        { name: 'pure-button' },
      ]),
    };
  },
  methods: {
    listItemClick(e: { name: string }) {
      this.routerPush('/demo/pure-ui/' + e.name);
    },
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
    .list-item {
      height: 50px;
      line-height: 50px;
      position: relative;
      .name {
        position: absolute;
        left: 15px;
        top: 0px;
        line-height: 50px;
      }
    }
    .list-item-gray {
      background-color: #f5f5f5;
    }
  }
}
</style>
