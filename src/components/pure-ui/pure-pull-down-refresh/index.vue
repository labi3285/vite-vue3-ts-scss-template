<template>
  <div ref="baseRefresh" class="pure-pull-down-refresh">
    <slot>
      <div class="slot-default">{{ isLoading ? '刷新中...' : isNeedRefresh ? '松开刷新' : '下拉刷新' }}</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from 'vue';

export default defineComponent({
  name: 'PurePullDownRefresh',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    heightToRefresh: {
      type: Number,
      default: 50,
    },
  },
  emits: [
    'load',
    'update:isLoading',
  ],
  setup() {
    return {
      isNeedRefresh: ref<boolean>(false),
      startY: ref<number>(0),
      endY: ref<number>(0),
    };
  },
  watch: {
    isLoading(newVal: boolean) {
      if (!newVal) {
        const el = this.$refs.baseRefresh as HTMLElement;
        if (el.style.display !== 'none') {
          this.animate(el, 0, 300, () => {
            el.style.display = 'none';
          });
        }
      }
    },
  },
  mounted() {    
    const el = this.$refs.baseRefresh as HTMLElement;
    document.addEventListener('touchstart', (event: TouchEvent) => {
      const touch = event.touches[0];
      this.startY = touch.pageY;
    });
    document.addEventListener('touchmove', (event: TouchEvent) => {
      if (this.isLoading) {
        return;
      }
      const touch = event.touches[0];
      this.endY = touch.pageY - this.startY; 
      el.style.display = 'none';
      if (this.endY > 5) {
        el.style.display = 'block';
        el.style.height = this.endY + 'px';
      }
    });
    document.addEventListener('touchend', (event: TouchEvent) => {
      if (this.isLoading) {
        return;
      }
      const touch = event.touches[0];
      if (this.endY > this.heightToRefresh) {
        el.style.display = 'block';
        this.animate(el, 50, 1000, () => {
          this.loadData();
        });
      } else {
        this.animate(el, 0, 300, () => {
          el.style.display = 'none';
        });
      }
    });
  },
  unmounted() {
    document.removeEventListener('touchstart', (event: TouchEvent) => {});
    document.removeEventListener('touchmove', (event: TouchEvent) => {});
    document.removeEventListener('touchend', (event: TouchEvent) => {});
  },
  methods: {
    loadData() {
      this.$emit('update:isLoading', true);
      this.$emit('load');
    },
    animate(el: HTMLElement, toHeight: number, pxInOneSec: number, done: any) {
      const _from_height = el.offsetHeight;
      const _px_in_one_sec = pxInOneSec;
      const _total_height = Math.abs(toHeight - _from_height);
      const _total_t = _total_height / _px_in_one_sec;
      const _frame_t = 1 / 30;
      const _delta_height =  _total_height / (_total_t / _frame_t);
      let _height = _from_height;
      function _interpolator_loop(done: any) {
        setTimeout(() => {
          if (_from_height > toHeight) {
            if (_height - _delta_height > toHeight) {
              _height -= _delta_height;
              el.style.height = _height + 'px';
              _interpolator_loop(done);
            } else {
              el.style.height = toHeight + 'px';
              done();
            }
          } else {
            if (_height + _delta_height > toHeight) {
              _height += _delta_height;
              el.style.height = _height + 'px';
              _interpolator_loop(done);
            } else {
              el.style.height = toHeight + 'px';
              done();
            }
          }
        }, _frame_t * 1000);
      }
      _interpolator_loop(done);
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';

.pure-pull-down-refresh {
  width: 100%;
  text-align: center;
  display: none;
  overflow: hidden;
  .slot-default {
    font-size: 14px;
    color: #999999;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
