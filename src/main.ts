import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store, { key } from '@/store';

const app = createApp(App);

import Vconsole from 'vconsole';
new Vconsole();

app.use(router);
app.use(store, key);
app.mount('#app');


  