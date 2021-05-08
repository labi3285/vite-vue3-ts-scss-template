<template>
  <div class="wrap">
    <pure-navigation-bar>pure-step-count</pure-navigation-bar>
    <pure-better-scroll class="content">
      <pure-step-count v-model:value="count" class="pure-step-count-default-small field" />
      <pure-step-count v-model:value="count" class="pure-step-count-default field" @blur="onBlur" @enter="onEnter" @input="onInput" />
      <pure-step-count v-model:value="count" class="pure-step-count-default-big field" />
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
      count: ref<string | null>(null),
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
      width: 100px;
    }
  }
}
</style>
