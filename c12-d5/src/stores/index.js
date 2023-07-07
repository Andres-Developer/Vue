import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { studentsModule } from './studentModule';

const store = new Vuex.Store({
  modules: {
    studentsModule,
  }
});

export { store };