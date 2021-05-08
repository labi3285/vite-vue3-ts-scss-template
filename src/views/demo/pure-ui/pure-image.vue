<template>
  <div class="wrap">
    <pure-navigation-bar>pure-button</pure-navigation-bar>
    <pure-better-scroll class="content">
      <pure-image class="pic" :local="local" />
      <pure-image class="pure-image-default pic" :url="url" />
    </pure-better-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PureUI from '@/components/pure-ui';
import imgUrl from './res/pic.png';

export default defineComponent({
  components: {
    ...PureUI,
  },
  setup() {
    return {
      local: ref(imgUrl),
      url: ref('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201811%2F18%2F20181118142953_yaktg.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622947342&t=87db7f845ebcbfcc4464e2395d430eba'),
    };
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
    .pic {
      width: 100px;
      height: 100px;
      overflow: hidden;
    }
  }
}
</style>
