import { deleteRequest, getRequest, postRequest, putRequest } from '../../services/httpRequests';
import { loadingWithTimeout } from '../../utils/loadingTools';
const PRODUCTS_ENDPOINT = `/products`;

const productsModule = {
  namespaced: true,
  state: {
    products: [],
    product: null,
    deletedProduct: null,
    loading: false
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setDeletedProduct(state, deletedProduct) {
      state.deletedProduct = deletedProduct;
    },
    deleteProduct(state, index) {
      state.products.splice(index, 1);
    }
  },
  actions: {
    async createProduct({ commit }, product) {
      commit('setLoading', true);
      const newProduct = await postRequest(PRODUCTS_ENDPOINT, product);
      commit('setProduct', newProduct);
      await loadingWithTimeout(50);
      commit('setLoading', false);
    },
    async updateProduct({ commit }, { id, product }) {
      commit('setLoading', true);
      const updatedProduct = await putRequest(PRODUCTS_ENDPOINT + `/${id}`, product);
      commit('setProduct', updatedProduct);
      await loadingWithTimeout(50);
      commit('setLoading', false);
    },
    async getProductsFromAPI({ commit }) {
      commit('setLoading', true);
      const products = await getRequest(PRODUCTS_ENDPOINT);
      commit('setProducts', products);
      commit('setLoading', false);
    },
    async getProductFromAPI({ commit }, id) {
      commit('setLoading', true);
      const product = await getRequest(PRODUCTS_ENDPOINT + `/${id}`);
      commit('setProduct', product);
      await loadingWithTimeout(50);
      commit('setLoading', false);
    },
    async deleteProductFromAPI({ commit, getters }, id) {
      commit('setLoading', true);
      const deletedProduct = await deleteRequest(PRODUCTS_ENDPOINT + `/${id}`);
      commit('setDeletedProduct', deletedProduct);
      const index = getters.getIndexOfProduct(id);
      commit('deleteProduct', index);
      await loadingWithTimeout(50);
      commit('setLoading', false);
    },
    async updateAllProductsStock({ commit }, productsInCart) {
      async function updateSingleStock(id, stock) {
        await putRequest(PRODUCTS_ENDPOINT + `/${id}`, { stock });
      }
      const promises = productsInCart.map(async (product) => {
        const newStock = product.stock - product.quantity;
        const response = await updateSingleStock(product.id, newStock);
        return response;
      });
      commit('setLoading', true);
      await Promise.all(promises);
      commit('setLoading', false);
    },
    async clearProduct({ commit }) {
      commit('setProduct', null);
    }
  },
  getters: {
    getIndexOfProduct(state) {
      return function (id) {
        return state.products.findIndex((Eproduct) => Eproduct.id === id);
      };
    },
    getProducts(state) { return state.products; },
    getProduct(state) { return state.product; },
    getNewProduct(state) { return state.newProduct; },
    getUpdatedProduct(state) { return state.updatedProduct; },
    getDeletedProduct(state) { return state.deletedProduct; },
    getLoading(state) { return state.loading; },
  },
};

export { productsModule };

