<template>
  <div
    ref="pureOptions"
    class="pure-options"
  >
    <div v-for="(e, i) in items" :key="i" class="item" @click="onItemClick(e, i)">
      <div :class="isSelect(e) ? 'icon-select' : 'icon'"></div>
      <div class="label">{{ e.label }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';

export interface Item {
  label: string;
  value: number | string;
}

export default defineComponent({
  name: 'PureOptions',
  props: {
    items: {
      type: Array as PropType<Item[]>,
      default: () => [],
    },
    isMultiple: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Array as PropType<(number | string)[]>,
      default: () => [],
    },
  },
  emits: [
    'change',
    'update:value',
  ],
  methods: {
    isSelect(item: Item) {
      for (const e of this.value) {
        if (e === item.value) {
          return true;
        }
      }
      return false;
    },
    onItemClick(item: Item, i: number) {
      const arr = this.value;
      if (this.isMultiple) {
        let thereIs = false;
        for (let i = 0; i < arr.length; i ++) {
          if (arr[i] === item.value) {
            arr.splice(i, 1);
            thereIs = true;
            break;
          }
        }
        if (!thereIs) {
          arr.push(item.value);
        }
      } else {
        let thereIs = false;
        for (let i = 0; i < arr.length; i ++) {
          if (arr[i] === item.value) {
            arr.splice(i, 1);
            thereIs = true;
          } else {
            arr.splice(i, 1);
          }
        }
        if (!thereIs) {
          arr.push(item.value);
        }
      }
      this.$emit('update:value', arr);
      this.$emit('change', arr);
    },
  },
});
</script>

<style lang="scss">
@import '../global.scss';

.pure-options {
  cursor: pointer;
  // .item {
  //   .icon {
  //   }
  //   .icon-select {
  //   }
  //   .label {
  //   }
  // }
}
</style>
