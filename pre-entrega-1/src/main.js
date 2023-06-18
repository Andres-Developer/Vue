import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createMetaManager, plugin as vueMetaPlugin } from 'vue-meta';


import BootstrapVueNext from 'bootstrap-vue-next';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

createApp(App)
  .use(createMetaManager())
  .use(vueMetaPlugin)
  .use(router)
  .use(BootstrapVueNext)
  .mount('#app');
