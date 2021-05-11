<template>
  <div
    class="pure-step-count"
  >
    <pure-button class="button-minus" :disabled="!canMinus" @click="onMinus($event)">-</pure-button>
    <input
      ref="input"
      v-model="text"
      type="tel"
      pattern="[0-9]*"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
      @keydown="onKeydown($event)"
      @keyup="onKeyup($event)"
      @keyup.enter="onEnter($event)"
      @input="onInput($event)"
    />
    <pure-button class="button-add" :disabled="!canAdd" @click="onAdd($event)">+</pure-button>
  </div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import PureButton from '../pure-button/index.vue';

export default defineComponent({
  name: 'PureStepCount',
  components: {
    PureButton,
  },
  props: {
    value: {
      type: Number,
      default: null,
    },
    defaultValue: {
      type: Number,
      default: 0,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 5,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  emits: [
    'minus',
    'add',
    'focus',
    'blur',
    'keydown',
    'keyup',
    'enter',
    'input',
    'update:value',
  ],
  setup() {
    return {
      text: ref<string | null>(null),
    };
  },
  computed: {
    canMinus(): boolean {
      if (this.minValue !== undefined && this.minValue !== null) {
        return this.value > this.minValue;
      }
      return true;
    },
    canAdd(): boolean {
      if (this.maxValue !== undefined && this.maxValue !== null) {
        return this.value < this.maxValue;
      }
      return true;
    },
  },
  watch: {
    value(val: string | null) {
      this.text = this._filte(val);
    },
  },
  mounted() {
    this.text = this._filte(this.value);
  },
  methods: {
    filte() {
      this.text = this._filte(this.text);
    },
    onFocus(event: Event) {
      this.$emit('focus', event);
    },
    onBlur(event: Event) {
      this.$emit('blur', event);
    },
    onKeydown(event: Event) {
      this.$emit('keydown', event);
    },
    onKeyup(event: Event) {
      this.text = this._filte(this.text);
      this.$emit('update:value', parseFloat(this._filte(this.text)));
      this.$emit('keyup', event);
    },
    onEnter(event: Event) {
      this.$emit('enter', event);
    },
    onMinus(event: Event) {
      let f = parseFloat(this.text ?? '0');
      f -= this.step;
      if (this.minValue !== undefined || this.minValue !== null) { f = Math.max(f, this.minValue); }
      this.text = `${f}`;
      this.$emit('update:value', parseFloat(this.text ?? '0'));
    },
    onAdd(event: Event) {
      let f = parseFloat(this.text ?? '0');
      f += this.step;
      if (this.maxValue !== undefined || this.maxValue !== null) { f = Math.min(f, this.maxValue); }
      this.text = `${f}`;
      this.$emit('update:value', parseFloat(this.text ?? '0'));
    },
    onInput(event: Event) {
      this.text = this._filte(this.text);
      this.$emit('update:value', parseFloat(this._filte(this.text)));
      this.$emit('input', event, this.text);
    },
    _filte(t: string | number | null): string {
      if (t === null || t === '') {
        return '0';
      }
      t = `${t}`.replace(/[^\d]/g, '');
      let f = parseFloat(t);
      if (this.minValue !== undefined || this.minValue !== null) { f = Math.max(f, this.minValue); }
      if (this.maxValue !== undefined || this.maxValue !== null) { f = Math.min(f, this.maxValue); }
      return `${f}`;
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';

.pure-step-count {
  input {
    width: 0;
    text-align: center;
    -webkit-tap-highlight-color:rgba(0,0,0,0); 
    outline: none;
    &::-webkit-search-cancel-button {
      display: none;
    }
    &:focus {
      outline: none;
    }
    -webkit-appearance: none;
    border: none;
    background-color: transparent;
  }
}
</style>
