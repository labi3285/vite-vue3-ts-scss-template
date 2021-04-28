<template>
  <div class="page-wrap">
    <pure-navigation-bar>pure-button</pure-navigation-bar>
    <pure-better-scroll class="content">
      <pure-button class="pure-button-text-default-small">按钮</pure-button>
      <pure-button class="pure-button-text-default">按钮</pure-button>
      <pure-button class="pure-button-text-default-big">按钮</pure-button>
      <br>
      <pure-button class="pure-button-text-warning-small">警告</pure-button>
      <pure-button class="pure-button-text-warning">警告</pure-button>
      <pure-button class="pure-button-text-warning-big">警告</pure-button>
      <br>
      <pure-button class="pure-button-text-success-small">成功</pure-button>
      <pure-button class="pure-button-text-success">成功</pure-button>
      <pure-button class="pure-button-text-success-big">成功</pure-button>
      <br>
      <pure-button class="pure-button-text-confirm-small">确定</pure-button>
      <pure-button class="pure-button-text-confirm">确定</pure-button>
      <pure-button class="pure-button-text-confirm-big">确定</pure-button>
      <br>
      <pure-button class="pure-button-text-alert-small">删除</pure-button>
      <pure-button class="pure-button-text-alert">删除</pure-button>
      <pure-button class="pure-button-text-alert-big">删除</pure-button>
      <br>
      <pure-button class="pure-button-link-small">超链接</pure-button>
      <pure-button class="pure-button-link">超链接</pure-button>
      <pure-button class="pure-button-link-big">超链接</pure-button>
      <br>
      <pure-button class="pure-button-default-small">按钮</pure-button>
      <pure-button class="pure-button-default">按钮</pure-button>
      <pure-button class="pure-button-default-big">按钮</pure-button>
      <br>
      <pure-button class="pure-button-confirm-small">确定</pure-button>
      <pure-button class="pure-button-confirm">确定</pure-button>
      <pure-button class="pure-button-confirm-big">确定</pure-button>
      <br>
      <pure-button class="pure-button-warning-small">警告</pure-button>
      <pure-button class="pure-button-warning">警告</pure-button>
      <pure-button class="pure-button-warning-big">警告</pure-button>
      <br>
      <pure-button class="pure-button-success-small">成功</pure-button>
      <pure-button class="pure-button-success">成功</pure-button>
      <pure-button class="pure-button-success-big">成功</pure-button>
      <br>
      <pure-button class="pure-button-alert-small">删除</pure-button>
      <pure-button class="pure-button-alert">删除</pure-button>
      <pure-button class="pure-button-alert-big">删除</pure-button>
    </pure-better-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseUI from '@/components/pure-ui';

export default defineComponent({
  components: {
    ...BaseUI,
  },
});
</script>

<style lang="scss" scoped>
.page-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
  }
}
</style>
