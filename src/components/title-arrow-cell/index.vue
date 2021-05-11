<template>
  <div
    class="title-arrow-cell"
    :style="{ backgroundColor: index % 2 === 0 ? 'transparent' : '#f5f5f5' }"
  >
    <div class="title">{{ title }}</div>
    <div class="flex-space" />
    <div class="subTitle">{{ subTitle }}</div>
    <svg-arrow style="width: 16px; height: 16px;" />
  </div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import SvgArrow from './arrow.svg';

export default defineComponent({
  name: 'TitleArrowCell',
  components: {
    SvgArrow,
  },
  props: {
    title: {
      type: String,
      default: 'Button',
    },
    subTitle: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.title-arrow-cell {
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 15px;
  padding-right: 10px;
  .title {
    font-size: 15px;
    color: #333333;
  }
  .flex-space {
    flex: 1;
  }
  .subTitle {
    font-size: 15px;
    color: #999999;
  }
}
</style>