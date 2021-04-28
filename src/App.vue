<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import routerMixin from '@/components/pure-ui/utils/mixins/router';

export default defineComponent({
  name: 'App',
  mixins: [
    routerMixin,
  ],
});
</script>

<style lang="scss">
@import '@/components/pure-ui/index.scss';

html, body, 
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  width: 100%;
  height: 100%;
}
</style>
