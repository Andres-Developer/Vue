import { createStore } from 'vuex';
import {studentsModule} from './modules/students';

const store = createStore({
  modules: {
    studentsModule,
  }
});

export {store};