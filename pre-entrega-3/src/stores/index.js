import { createStore } from "vuex";
import { cartModule } from './modules/cart';
import { productsModule } from './modules/products';
import { userModule } from './modules/user';

const store = createStore({
  modules: {
    cartModule,
    productsModule,
    userModule,
  }
});

export { store };