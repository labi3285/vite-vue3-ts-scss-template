<template>
  <Vue3Demo prop-required="propRequired" :prop-object="{ name: 'Jack' }" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Vue3Demo from './Vue3Demo.vue';

export default defineComponent({
  name: 'DemoVue3',
  components: {
    Vue3Demo,
  },
});
</script>

