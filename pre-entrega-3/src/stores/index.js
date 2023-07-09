import { createStore } from "vuex";
import { cartModule } from './modules/cart';

const store = createStore({
  modules: {
    cartModule,
  }
});

export { store };