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
import SvgArrowBack from '../resources/svg/arrow-back.svg';

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

<style lang="scss" scoped>
</style>