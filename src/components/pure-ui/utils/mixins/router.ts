import { ComponentOptionsMixin } from 'vue';

export default {
  methods: {
    routerPush(path: string) {
      console.assert(path.startsWith('/'), 'router path must start with "/"');
      const query = Object.assign({}, this.$route.query);
      this.$router.push({
        path,
        query,
      });
    },
  },
} as ComponentOptionsMixin;
