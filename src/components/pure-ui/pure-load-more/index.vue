<template>
  <div ref="baseLoadMore" v-frameChange="onViewChange" v-offsetChange="onViewChange" class="pure-load-more">
    <slot>
      <div class="slot-default">{{ isLoading ? '加载中...' : isThereMore ? '已加载' : '没有更多' }}</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import frameChange from '../utils/directives/frameChange';
import offsetChange from '../utils/directives/offsetChange';

export default defineComponent({
  name: 'PureLoadMore',
  directives: {
    frameChange,
    offsetChange,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isLoadOnMounted: {
      type: Boolean,
      default: false,
    },
    isThereMore: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'load',
    'update:isLoading',
  ],
  setup() {
    return {
    };
  },
  mounted() {
    if (this.isLoadOnMounted && this.isThereMore) {
      this.loadData();
    }
  },
  methods: {
    async loadData() {
      this.$emit('update:isLoading', true);
      this.$emit('load');
    },
    onViewChange() {
      const el = this.$refs.baseLoadMore as HTMLDivElement;
      let _offsetTop = el.offsetTop;
      let _next = el.parentElement;
      while (_next) {
          // @ts-ignore
          if (_next.__vue_BScroll_scrollPosition__) {
              // @ts-ignore
              _offsetTop = _next.__vue_BScroll_scrollPosition__.y + _offsetTop;
              break;
          } else {
              _offsetTop += _next.offsetTop;
          }
          _next = _next.parentElement;
      }
      let isShow = false;
      if (_next) {
        const _scroll = _next;
        const _centerY = _offsetTop + el.offsetHeight / 2;
        const _visibleBottom = _scroll.offsetHeight;
        isShow = _centerY > 0 && _centerY < _visibleBottom;
      } else {
        const _tolerance = 50; // 部分浏览器在滚动页面的时候会隐藏导航栏从而导致滚动出现误差
        const _visibleBottom = window.scrollY + document.documentElement.clientHeight + _tolerance;
        const _visibleTop = window.scrollY;
        const _offsetTop = el.offsetTop;
        isShow = _offsetTop > _visibleTop && _offsetTop < _visibleBottom; 
      }
      if (this.isLoading === false && this.isThereMore && isShow) {
        this.loadData();
      }
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-load-more {
  width: 100%;
  text-align: center;
  .slot-default {
    font-size: 14px;
    color: #999999;
    padding-top: 8px;
    padding-bottom: 8px;
  }
}
</style>
