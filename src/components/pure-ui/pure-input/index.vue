<template>
  <div
    class="pure-input"
  >
    <input
      ref="input"
      v-model="text"
      :type="type"
      :autofocus="autofocus"
      :placeholder="placeholder"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
      @keydown="onKeydown($event)"
      @keyup="onKeyup($event)"
      @keyup.enter="onEnter($event)"
      @input="onInput($event)"
    />
  </div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';

export default defineComponent({
  name: 'PureInput',
  props: {
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    type: {
      type: String,
      default: 'text',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Function,
      default: null,
    },
    regex: {
      type: RegExp,
      default: /[^\d]/g,
    },
  },
  emits: [
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
      this.filte();
      this.$emit('keyup', event);
    },
    onEnter(event: Event) {
      this.$emit('enter', event);
    },
    onInput(event: Event) {
      this.$emit('update:value', this.text);
      this.$emit('input', event, this.text);
    },
    _filte(t: string | null): string | null {
      if (t === null) {
        return null;
      }
      if (this.regex) {
        t = t.replace(this.regex, '');
      }
      if (this.filter !== null) {
        t = this.filter(t);
      }
      if (t === '') {
        t = null;
      }
      return t;
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-input {
  input {
    width: 0;
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
