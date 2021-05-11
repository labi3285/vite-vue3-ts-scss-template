<template>
  <div ref="pureToast" class="pure-toast" :class="[cls, cls + '-position-' + position]" @click="onClickBackground($event)">
    <div class="space-top"></div>
    <div class="message-box" @click.stop.prevent>
      <svg v-if="type === 'loading'" class="icon-loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
        <path fill="#ffffff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(275.098 25 25)">
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
        </path>
      </svg>
      <div v-if="type !== null && type !== undefined && type !== 'default' && type !== 'loading'" class="icon" :class="'icon-' + type"></div>      
      <div v-if="type !== null && type !== undefined && type !== 'default'" class="space"></div>
      <div v-if="message !== undefined && message !== null" class="message">{{ message }}</div>
    </div>
    <div class="space-bottom"></div>
  </div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import { PureToast, ToastType, Options } from './index';

export default defineComponent({
  name: 'PureToast',
  props: {
    model: {
      type: Object as PropType<PureToast>,
      required: true,
    },
    options: {
      type: Object as PropType<Options>,
      default: null,
    },
    onClean: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    return {
      cls: computed(() => props.options?.cls || 'pure-toast-default' ),
      position: computed(() => props.options?.position || 'auto' ),
      message: ref<string | null>(null),
      type: ref<ToastType>('default'),
    };
  },
  mounted() {
    this.type = this.model.type;
    this.message = this.model.message;
    // eslint-disable-next-line vue/no-mutating-props
    this.model.__updater = (msg: string | null) => {
      this.message = msg;
    };
  },
  methods: {
    onClickBackground() {
      if (this.type !== 'loading') {
        this.onClean();
      }
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-toast {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>