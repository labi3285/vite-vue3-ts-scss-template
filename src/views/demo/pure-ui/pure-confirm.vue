<template>
  <div class="wrap">
    <pure-navigation-bar>pure-confirm</pure-navigation-bar>
    <pure-better-scroll class="content">
      <title-arrow-cell v-for="(e, i) in list" :key="i" :index="i" :title="e.name" @click="e.todo()" />
    </pure-better-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PureUI from '@/components/pure-ui';
import TitleArrowCell from '@/components/title-arrow-cell/index.vue';
import PureToast from '@/components/pure-ui/pure-toast/index';
import PureConfirm, { ButtonAction } from '@/components/pure-ui/pure-confirm/index';

function ROW(name: string, todo: () => void): { name: string, todo: () => void } {
  return { name, todo };
}

export default defineComponent({
  components: {
    ...PureUI,
    TitleArrowCell,
  },
  setup() {
    return {
      list: ref<{ name: string, todo: () => void }[]>([
        ROW('PureConfirm.show', () => {
          const confirm = PureConfirm.show('标题', '这是个对话框', [
            {
              type: 'cancel',
              title: '取消',
            },
            {
              type: 'default',
              title: '确定',
              disabled: false,
              isAutoClose: false,
              todo: () => {
                PureToast.show('未完成操作');
                // confirm.close();
              },
            },
          ]);
        }),
      ]),
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
  }
}
</style>
