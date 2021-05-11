<template>
  <div v-show="isMaskShow" ref="purePopup" :class="isMaskShow ? 'pure-popup pure-popup-show' : 'pure-popup pure-popup-hide'" @click="onClickBackground($event)">
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-show="isPopupShow" class="popup-box" @click.stop.prevent>
        <slot />
      </div>
    </transition>
    <!-- // :style="{ left, top, width, height }" -->
  </div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import { PureRect } from '../models';

export default defineComponent({
  name: 'PurePopup',
  props: {
    popupStartRect: {
      type: Function as PropType<(maskRect: PureRect) => PureRect>,
      default: null,
    },
    popupRect: {
      type: Function as PropType<(maskRect: PureRect) => PureRect>,
      required: true,
    },
    popupShowSecs: {
      type: Number,
      default: 0.3,
    },
    popupHideSecs: {
      type: Number,
      default: 0.3,
    },
    isHideOnTapBankground: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {
      isMounted: ref<boolean>(false),
      isMaskShow: ref<boolean>(false),
      isPopupShow: ref<boolean>(false),
    };
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    show() {
      this.isMaskShow = true;
      this.$nextTick(() => {
        this.isPopupShow = true;
      });
    },
    hide() {
      this.isPopupShow = false;
    },
    onClickBackground() {
      if (this.isHideOnTapBankground === true) {
        this.hide(); 
      }
    },
    beforeEnter(el: HTMLElement) {
      const mask = this.$refs.purePopup as HTMLElement;
      mask.style.opacity = '0';
      const r = (this.$refs.purePopup as HTMLDivElement).getBoundingClientRect();
      let rect: PureRect;
      if (this.popupStartRect !== undefined && this.popupStartRect !== null) {
        rect = this.popupStartRect({ x: r.x, y: r.y, w: r.width, h: r.height });
      } else {
        rect = this.popupRect({ x: r.x, y: r.y, w: r.width, h: r.height });
      }
      el.style.left = rect.x + 'px';
      el.style.top = rect.y + 'px';
      el.style.width = rect.w + 'px';
      el.style.height = rect.h + 'px';
    },
    enter(el: HTMLElement, done: () => void) {
      const mask = this.$refs.purePopup as HTMLElement;
      const r = (this.$refs.purePopup as HTMLDivElement).getBoundingClientRect();
      const to = this.popupRect({ x: r.x, y: r.y, w: r.width, h: r.height });
      let from = to;
      if (this.popupStartRect !== undefined && this.popupStartRect !== null) {
        from = this.popupStartRect({ x: r.x, y: r.y, w: r.width, h: r.height });
      }
      this.__animatePopup(el, from, to, this.popupShowSecs, done);
      this.__animateMask(mask, 0, 1, this.popupHideSecs, () => {});
    },
    leave(el: HTMLElement, done: () => void) {
      const mask = this.$refs.purePopup as HTMLElement;
      const r = el.getBoundingClientRect();
      const from = this.popupRect({ x: r.x, y: r.y, w: r.width, h: r.height });
      let to = from;
      if (this.popupStartRect !== undefined && this.popupStartRect !== null) {
        to = this.popupStartRect({ x: r.x, y: r.y, w: r.width, h: r.height });
      }
      this.__animatePopup(el, from, to, this.popupHideSecs, () => {
        done();
      });
      this.__animateMask(mask, 1, 0, this.popupHideSecs + 0.1, () => {
        this.isMaskShow = false;
      });
    },

    __animateMask(el: HTMLElement, from: number, to: number, secs: number, done: () => void) {
      let alpha = from;
      this.__animatePoints([from], [to], secs, (frame: number, deltas: number[], isDone: boolean) => {
        alpha += deltas[0];
        el.style.opacity = alpha.toString();
        if (isDone) {
          done();
        }
      });
    },
    __animatePopup(el: HTMLElement, from: PureRect, to: PureRect, secs: number, done: () => void) {
      let x = from.x;
      let y = from.y;
      let w = from.w;
      let h = from.h;
      this.__animatePoints([from.x, from.y, from.w, from.h], [to.x, to.y, to.w, to.h], secs, (frame: number, deltas: number[], isDone: boolean) => {
        x += deltas[0];
        y += deltas[1];
        w += deltas[2];
        h += deltas[3];
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.width = w + 'px';
        el.style.height = h + 'px';
        if (isDone) {
          done();
        }
      });
    },
    __animatePoints(froms: number[], tos: number[], secs: number, todo: (frame: number, deltas: number[], isDone: boolean) => void) {
      const ds: number[] = [];
      let count = froms.length;
      for (let i = 0; i < count; i ++) {
        const from = froms[i];
        const to = tos[i];
        const s = to - from;
        const d = s / (60 * secs);
        ds.push(d);
      }
      const frames = 60 * secs;
      let frame = 0;
      let timer: number | null = null;
      function __frameDo() {
        const isEnd = frame === frames - 1;
        todo(frame, ds, isEnd);
        if (isEnd) {
          if (timer !== null) {
            cancelAnimationFrame(timer);
          }
        } else {
          timer = requestAnimationFrame(() => {
            __frameDo();
          });
        }
        frame += 1;
      }
      __frameDo();
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .popup-box {
    position: fixed;
    
  }
}
// popup-box-transition-enter {
//   left: 100%;
//   width: 70%;
//   top: 0;
//   height: 100vh;
// }
// popup-box-transition-enter-to {
//   left: 30%;
//   width: 70%;
//   top: 0;
//   height: 100vh;
// }
</style>