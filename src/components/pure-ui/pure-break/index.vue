<template>
  <div ref="pureBreak" class="pure-break" :class="cls"></div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from 'vue';
export default defineComponent({
  name: 'PureBreak',
  props: {
    isTopLine: {
      type: Boolean,
      default: false,
    },
    isBottomLine: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      cls: computed(() => {
        if (props.isTopLine || props.isBottomLine) {
          return 'pure-break-line-top pure-break-line-bottom';
        } else if (props.isTopLine) {
          return 'pure-break-line-top';
        }  else if (props.isBottomLine) {
          return 'pure-break-line-bottom';
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
.pure-break {
  background-color: $pure-color-back;
  height: $pure-margin-break;
  &-line-top {
    border-top: 1px solid $pure-color-line;
  }
  &-line-bottom {
    border-bottom: 1px solid $pure-color-line;
  }
}
</style>
