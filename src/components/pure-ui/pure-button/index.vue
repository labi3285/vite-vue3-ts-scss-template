<template>
  <button
    class="pure-button"
    @click="click"
  >
    <slot>{{ title }}</slot>
  </button>
</template>

<script lang="ts">
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
    click() {
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss" scoped>

</style>