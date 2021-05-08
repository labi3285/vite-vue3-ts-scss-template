<template>
  <img
    ref="pureImage"
    class="pure-image"
    @click.stop="onClick"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from 'vue';

export default defineComponent({
  name: 'PureImage',
  props: {
    local: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  watch: {
    local(val: string) {
      (this.$refs.pureImage as HTMLImageElement).src = val;
      console.warn(val);
    },
    url(val: string) {
      (this.$refs.pureImage as HTMLImageElement).src = val;
      console.warn(val);
    },    
  },
  mounted() {
    if (this.url !== undefined && this.url !== null) {
      (this.$refs.pureImage as HTMLImageElement).src = this.url;
    } else if (this.local !== undefined && this.local !== null) {
      (this.$refs.pureImage as HTMLImageElement).src = this.local;
    }
  },
});
</script>

<style lang="scss">
@import '../global.scss';
.pure-image {
  /* */
}
</style>

