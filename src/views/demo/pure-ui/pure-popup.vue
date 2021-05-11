<template>
  <div class="wrap">
    <pure-navigation-bar>pure-popup</pure-navigation-bar>
    <pure-better-scroll class="content">
      <title-arrow-cell v-for="(e, i) in list" :key="i" :index="i" :title="e.name" @click="e.todo()" />
    </pure-better-scroll>
    <pure-popup ref="popup" :popupStartRect="popupStartRect" :popupRect="popupRect" class="pure-popup-default">
      <h1>This is a popup view</h1>
    </pure-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PureUI from '@/components/pure-ui';
import PurePopup from '@/components/pure-ui/pure-popup.vue';
import { PureRect } from '@/components/pure-ui/models';

import TitleArrowCell from '@/components/title-arrow-cell/index.vue';
import PureToast from '@/components/pure-ui/pure-toast/index';

function ROW(name: string, todo: () => void): { name: string, todo: () => void } {
  return { name, todo };
}

export default defineComponent({
  components: {
    ...PureUI,
    TitleArrowCell,
  },
  setup() {
    return {
      list: ref<{ name: string, todo: () => void }[]>([]),
    };
  },
  mounted() {
    this.list = [
      ROW('展示', () => {
        this.$refs.popup.show();
      }),
    ];
  },
  methods: {
    popupStartRect(rect: PureRect) {
      const w = rect.w * 0.7;
      const h = rect.h;
      const x = rect.x + rect.w;
      const y = 0;
      return { x, y, w, h };
    },
    popupRect(rect: PureRect) {
      // alert(1);
      const w = rect.w * 0.7;
      const h = rect.h;
      const x = rect.x + rect.w - w;
      const y = 0;
      return { x, y, w, h };
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
  }
  .popup {  
    background-color: black;
    :deep(.popup-box) {
      background-color: #ffffff;
    }
  }
}
</style>
