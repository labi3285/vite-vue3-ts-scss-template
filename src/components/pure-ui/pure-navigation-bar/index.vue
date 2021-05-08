<template>
  <div
    ref="pureNavigationBar"
    class="pure-navigation-bar"
    :style="{
      paddingTop: statusBarHeight + 'px',
      height: navigationBarHeight + 'px'
    }"
  >
    <div class="left">
      <slot name="left">
        <svg-arrow-back v-if="canGoBack" style="width: 24px; height: 24px" @click="goBack" />
      </slot>
    </div>
    <div class="center">
      <slot />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import { queryFloat } from '../utils/query';
import SvgArrowBack from './arrow-back.svg';

const kStatusBarDefaultHeight = 20;
const kNavigationBarDefaultHeight = 44;

export default defineComponent({
  name: 'PureNavigationBar',
  components: {
    SvgArrowBack,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isForceCanNotGoBack: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      statusBarHeight: ref<number>(kStatusBarDefaultHeight),
      navigationBarHeight: ref<number>(kNavigationBarDefaultHeight),
    };
  },
  computed: {
    height(): number {
      return this.statusBarHeight + this.navigationBarHeight;
    },
    canGoBack(): boolean {
      return !this.isFirstPage && !this.isForceCanNotGoBack;
    },
    isFirstPage() {
      return window.history.length === 1;
    },
  },
  mounted() {
    this.statusBarHeight = queryFloat('statusBarHeight') ?? kStatusBarDefaultHeight;
    this.navigationBarHeight = queryFloat('navigationBarHeight') ?? kNavigationBarDefaultHeight;
    this.$forceUpdate();
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';

.pure-navigation-bar {
  position: relative;
  width: 100%;
  display: flex;
  border-bottom: 1px solid $pure-color-line;
  background-color: #ffffff;
  .left {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .back {
      padding-left: $pure-margin-left-right;
      padding-right: $pure-margin-inner / 2;
      .icon {
        width: 20px;
        height: 20px;
      }
    }
  }
  .center {
    height: 100%;
    flex: 1;
    font-size: $pure-font-size-20;
    color: $pure-color-t3;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: $pure-margin-inner / 2;
    padding-right: $pure-margin-inner / 2;
  }
  .right {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: $pure-margin-inner / 2;
    padding-right: $pure-margin-left-right;
  }
}
</style>
