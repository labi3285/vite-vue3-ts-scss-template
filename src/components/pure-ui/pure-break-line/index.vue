<template>
  <div ref="pureBreakLine" class="pure-break-line" :class="cls"></div>
</template>

<script lang="ts">
import * as jsc from 'qx-js-core';
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
export default defineComponent({
  name: 'PureBreakLine',
  props: {
    isLeftMargin: {
      type: Boolean,
      default: false,
    },
    isRightMargin: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      cls: computed(() => {
        if (props.isLeftMargin || props.isRightMargin) {
          return 'pure-break-line-margin-left pure-break-line-margin-right';
        } else if (props.isLeftMargin) {
          return 'pure-break-line-margin-left';
        }  else if (props.isRightMargin) {
          return 'pure-break-line-margin-right';
        } else {
          return '';
        }
      }),
    };
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-break-line {
  background-color: $pure-color-line;
  height: 1px;
  &-margin-left {
    margin-left: $pure-margin-left-right;
  }
  &-margin-right {
    margin-right: $pure-margin-left-right;
  }
}
</style>

