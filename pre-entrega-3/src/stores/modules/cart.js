const cartModule = {
  namespaced: true,
  state: {
    productsInCart: [],
  },
  mutations: {
    addProductToCart(state, product, isSelected) {
      // const isSelected = state.productsInCart.some((Eproduct) => Eproduct.id === product.id);
      if (!isSelected) {
        const subtotal = product.price * (product.quantity || 1);
        state.productsInCart.push({ ...product, quantity: product.quantity || 1, subtotal });
      }
    },
    deleteProductFromCart(state, index) {
      state.productsInCart.splice(index, 1);
    },
    addProductQuantity(state, index) {
      // Stock validation
      if (state.productsInCart[index].quantity >= state.productsInCart[index].stock) {
        return;
      }
      state.productsInCart[index].quantity += 1;
      // subTotalCalc(index);
      state.productsInCart[index].subtotal = state.productsInCart[index].price * state.productsInCart[index].quantity;
    },
    subtractProductQuantity(state, index) {
      if (state.productsInCart[index].quantity > 1) {
        state.productsInCart[index].quantity -= 1;
        // subTotalCalc(index);
        state.productsInCart[index].subtotal = state.productsInCart[index].price * state.productsInCart[index].quantity;
      }
    },
    clearCart(state) {
      state.productsInCart = [];
    },
    // subTotalCalc(state, index) {
    //   state.productsInCart[index].subtotal = state.productsInCart[index].price * state.productsInCart[index].quantity;
    // },
  },
  actions: {
    addProductToCart({ commit, getters }, product) {
      const isSelected = getters.getIsSelectedProduct(product);
      commit('addProductToCart', product, isSelected);
    },
    deleteProductFromCart({ commit, getters }, id) {
      const index = getters.getIndexOfProduct(id);
      commit('deleteProductFromCart', index);
    },
    addProductQuantity({ commit, getters }, id) {
      const index = getters.getIndexOfProduct(id);
      commit('addProductQuantity', index);
    },
    subtractProductQuantity({ commit, getters }, id) {
      const index = getters.getIndexOfProduct(id);
      commit('subtractProductQuantity', index);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
  },
  getters: {
    getProductsInCart(state) {
      return state.productsInCart;
    },
    getIndexOfProduct(state) {
      return function (id) {
        return state.productsInCart.findIndex((Eproduct) => Eproduct.id === id);
      };
    },
    getProductCount(state) {
      return state.productsInCart.reduce((acc, product) => acc + product.quantity, 0);
    },
    getGrandTotal(state) {
      return state.productsInCart.reduce((acc, product) => acc + product.subtotal, 0);
    },
    getIsSelectedProduct(state) {
      return function (id) {
        return state.productsInCart.some((Eproduct) => Eproduct.id === id);
      };
    },
    getSingleProductFromCart(state){
      return function (id) {
        return state.productsInCart.find((Eproduct) => Eproduct.id === id);        
      }
    }
  }
};


export { cartModule };
