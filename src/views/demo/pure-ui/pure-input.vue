<template>
  <div class="wrap">
    <pure-navigation-bar>pure-input</pure-navigation-bar>
    <pure-better-scroll class="content">
      <pure-input v-model:value="text" class="pure-input-default field" @blur="onBlur" @enter="onEnter" @input="onInput" />
      <pure-input v-model:value="text" class="pure-input-border-small field" />
      <pure-input v-model:value="text" class="pure-input-border field" />
      <pure-input v-model:value="text" class="pure-input-border-big field" />
    </pure-better-scroll>
  </div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, ref } from 'vue';
import PureUI from '@/components/pure-ui';

export default defineComponent({
  components: {
    ...PureUI,
  },
  setup() {
    return {
      text: ref<string | null>(null),
    };
  },
  methods: {
    onBlur(event: Event) {
      jsc.log(event);
    },
    onEnter(event: Event) {
      jsc.log(event);
    },
    onInput(event: Event, value: string | null) {
      jsc.log(event);
      jsc.log(value);
    },
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    .field {
      width: 200px;
    }
  }
}
</style>
