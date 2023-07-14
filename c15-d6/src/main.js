import { createApp } from 'vue';
import App from './App.vue';
import { store } from './stores';

import BootstrapVueNext from 'bootstrap-vue-next';
import { plugin, defaultConfig } from "@formkit/vue";
import "@formkit/themes/genesis";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

createApp(App)
  .use(store)
  .use(BootstrapVueNext)
  .use(plugin, defaultConfig({
    config: {
      classes: {
        wrapper: {
          'my-wrapper': true,
        },
        fieldset: {
          'my-fieldset': true,
        },
        label: {
          'my-label': true
        },
        help: {
          'my-help': true
        },
        legend: {
          'my-legend': true,
          'float-none': true,
        },
      }
    }
  }))
  .mount('#app');
