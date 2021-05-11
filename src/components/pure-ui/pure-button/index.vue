<template>
  <button
    class="pure-button"
    @click.stop="onClick"
  >
    <slot>{{ title }}</slot>
  </button>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';

export default defineComponent({
  name: 'PureButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Button',
    },
  },
  emits: [
    'click',
    'update:isLoading',
  ],
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-button {
  text-align: center;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0); 
  &:disabled {
    opacity: 0.3;
  }
  &:active {
    opacity: 0.7;
  }
}
</style>
