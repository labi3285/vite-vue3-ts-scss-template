<template>
  <div ref="baseLoad" class="pure-load">
    <slot />
    <slot v-if="isLoading" name="loading">
      <div class="slot-default-loading">
        <pure-loading />
      </div>
    </slot>
    <slot v-if="!isLoading && empty !== undefined && empty !== null" name="empty">
      <div class="slot-default-empty">
        <div class="message">{{ empty.message }}</div>
      </div>
    </slot>
    <slot v-if="!isLoading && error !== undefined && error !== null" name="error">
      <div class="slot-default-error">
        <div class="message">{{ error.message }}</div>
        <pure-button class="button" @click="loadData">重试</pure-button>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import PureLoading from '../pure-loading/index.vue';
import PureButton from '../pure-button/index.vue';

export default defineComponent({
  name: 'PureLoad',
  components: {
    PureLoading,
    PureButton,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Object,
      default: null,
    },
    error: {
      type: Object,
      default: null,
    },
    isLoadOnMounted: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'load',
    'update:isLoading',
  ],
  mounted() {
    if (this.isLoadOnMounted) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      this.$emit('update:isLoading', true);
      this.$emit('load');
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';
@import '../pure-button/mixins.scss';

.pure-load {
  .slot-default-loading {
    width: calc(100% - #{$pure-margin-left-right * 2});
    padding: $pure-margin-top-bottm $pure-margin-left-right;
    text-align: center;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $pure-color-t9;
  }
  .slot-default-empty {
    width: calc(100% - #{$pure-margin-left-right * 2});
    padding: $pure-margin-top-bottm $pure-margin-left-right;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $pure-color-t9;
    .message {
      margin-bottom: $pure-margin-inner / 2;
      text-align: center;
      color: $pure-color-t9;
    }
  }
  .slot-default-error {
    width: calc(100% - #{$pure-margin-left-right * 2});
    padding: $pure-margin-top-bottm $pure-margin-left-right;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $pure-color-t9;
    .message {
      margin-bottom: $pure-margin-inner / 2;
      text-align: center;
      color: $pure-color-t9;
    }
    .button {      
      @include --pure-button-size-normal();
      margin-top: $pure-margin-inner / 2;
      border: 1px solid $pure-color-border;
      outline: none;
      color: $pure-color-t9;
      background-color: transparent;
    }
  }
}
</style>
