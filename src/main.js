import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './vuetify';
import VueTheMask from 'vue-the-mask';

const app = createApp(App)
  app
    .use(vuetify)
    .use(VueTheMask)
    .mount('#app')
