<template>
  <div class="not-found">
    <p class="title">404</p>
    <p class="message">Not Found</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PureUI from '@/components/pure-ui';

export default defineComponent({
  name: 'NotFound',
  components: {
    ...PureUI,
  },
});
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  .title {
    margin-top: 50px;
    font-size: 60px;
    line-height: 100px;
    font-weight: bolder;
    color: #333333;
  }
  .message {
    font: 14px;
    color: #666666;
  }
}
</style>
