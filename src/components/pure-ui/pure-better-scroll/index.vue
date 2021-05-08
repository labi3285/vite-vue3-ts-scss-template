<template>
  <div ref="scroll" class="pure-better-scroll">
    <div ref="content" v-frameChange="onFrameChange" class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import BScroll from 'better-scroll';
import frameChange from '../utils/directives/frameChange';

export default defineComponent({
  name: 'PureBetterScroll',
  directives: {
    frameChange,
  },
  props: {
  },
  setup() {
    return {
      betterScroll: ref<BScroll | null>(null),
    };
  },
  mounted() {
    this.onFrameChange();
  },
  methods: {
    checkOrRefreshScroll() {
      if (this.betterScroll === undefined || this.betterScroll === null) {
        const el = this.$refs.scroll as HTMLDivElement;
        const scroll = new BScroll(el, {
          click: true,
          probeType: 3,
          bounce: false,
          momentum: true,
        });
        // @ts-ignore
        el.__vue_BScroll_scrollPosition__ = { x: 0, y: 0 };
        scroll.on('scroll', (pos: any) => {
          // @ts-ignore
          el.__vue_BScroll_scrollPosition__ = pos;
        });
        this.betterScroll = scroll;
      } else {
        this.betterScroll.refresh();
      }
    },
    onFrameChange() {
      this.checkOrRefreshScroll();
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-better-scroll {
  width: 100%;
  overflow: hidden;
}
</style>
