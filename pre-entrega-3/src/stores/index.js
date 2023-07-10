import { createStore } from "vuex";
import { cartModule } from './modules/cart';
import { productsModule } from './modules/products';

const store = createStore({
  modules: {
    cartModule,
    productsModule,
  }
});

export { store };