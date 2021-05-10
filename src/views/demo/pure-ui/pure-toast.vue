<template>
  <div class="wrap">
    <pure-navigation-bar>pure-toast</pure-navigation-bar>
    <pure-better-scroll class="content">
      <title-arrow-cell v-for="(e, i) in list" :key="i" :index="i" :title="e.name" @click="listItemClick(e)" />
    </pure-better-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PureUI from '@/components/pure-ui';
import TitleArrowCell from '@/components/title-arrow-cell/index.vue';

import PureToast from '@/components/pure-ui/pure-toast/index';

export default defineComponent({
  components: {
    ...PureUI,
    TitleArrowCell,
  },
  setup() {
    return {
      list: ref<{ name: string }[]>([
        { name: 'PureToast.show' },
        { name: 'PureToast.success' },
        { name: 'PureToast.warning' },
        { name: 'PureToast.error' },
        { name: 'PureToast.loading' },

        { name: '上部' },
        { name: '中间' },
        { name: '下部' },

        { name: '很多内容' },
        { name: '内容变更' },
      ]),
    };
  },
  methods: {
    listItemClick(e: { name: string }) {
      if (e.name === 'PureToast.show') {
        PureToast.show('一个提示');
      } else if (e.name === 'PureToast.success') {
        PureToast.success('成功');
      } else if (e.name === 'PureToast.warning') {
        PureToast.warning('警告');
      } else if (e.name === 'PureToast.error') {
        PureToast.error('失败');
      } else if (e.name === '中间') {
        PureToast.show('中间', { possiton: 'center' });
      } else if (e.name === '上部') {
        PureToast.show('上部', { possiton: 'top' });
      }  else if (e.name === '下部') {
        PureToast.show('下部', { possiton: 'bottom' });
      } else if (e.name === 'PureToast.loading') {
        const toast = PureToast.loading('加载中...');
        setTimeout(() => {
          toast.clean();
        }, 1000);
      } else if (e.name === '很多内容') {
        PureToast.show('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis felis purus, volutpat at odio non, convallis maximus velit. Curabitur vel eros dolor. Nulla at vestibulum velit. Nunc nec nisi vestibulum, vestibulum libero nec, efficitur risus. Donec consequat, velit quis interdum efficitur, massa ex consequat nibh, id consequat libero ipsum at erat. Suspendisse rhoncus imperdiet urna, sit amet viverra diam egestas vitae. Proin tincidunt molestie tempus.\nPraesent orci ligula, molestie non lobortis at, ornare sit amet est. Ut sed dolor sit amet est rutrum dapibus. Cras interdum gravida urna, sed pulvinar nulla condimentum vel. Vivamus malesuada augue nunc, ac eleifend quam dapibus ut. Nunc scelerisque condimentum vehicula. Suspendisse fermentum massa gravida magna congue, quis eleifend mauris commodo. Maecenas sed dolor et augue posuere faucibus. Suspendisse bibendum sagittis magna et faucibus. Duis eu nunc pretium, lacinia dui sit amet, mollis libero. Phasellus finibus quis nisi at tristique. Nulla tincidunt augue ut fermentum tempus.\nUt quis libero in mi dignissim malesuada vel sed tellus. Fusce tempus eu lectus eget tincidunt. Vivamus elementum aliquet mauris, id egestas magna vestibulum eu. In convallis, arcu sed tempor pretium, justo diam varius augue, ac sodales felis neque ut augue.');
      } else if (e.name === '内容变更') {
        const toast = PureToast.loading('加载进度0%');
        setTimeout(() => {
          toast.update('加载进度30%');
          setTimeout(() => {
            toast.update('加载进度60%');
            setTimeout(() => {
              toast.update('加载进度90%');
              setTimeout(() => {
                toast.clean();
                PureToast.success('加载完成');
              }, 700);
            }, 700);
          }, 700);
        }, 700);
      }
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
  }
}
</style>
