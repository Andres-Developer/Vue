import { deleteRequest, getRequest, postRequest, putRequest } from '../services/httpRequests';
import { loadingWithTimeout } from '../utils/loadingTools';

const productsStore = {

  products: [],
  loading: false,

  async getProducts() {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = '/products';
    this.loading = true;
    this.products = await getRequest(BASE_URL + ENDPOINT);
    this.loading = await loadingWithTimeout(50);
  },
  async getProduct(id) {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/products/${id}`;
    this.loading = true;
    const product = await getRequest(BASE_URL + ENDPOINT);
    this.loading = await loadingWithTimeout(50);
    return product;
  },
  async deleteProduct(id) {
    const response = await this.deleteProductFromAPI(id);
    const index = this.getIndexOfProduct(id);
    this.products.splice(index, 1);
    return response;
  },
  getIndexOfProduct(id) {
    return this.products.findIndex((Eproduct) => Eproduct.id === id);
  },

  async deleteProductFromAPI(id) {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/products/${id}`;
    this.loading = true;
    const response = await deleteRequest(BASE_URL + ENDPOINT);
    this.loading = await loadingWithTimeout(50);
    return response;
  },
  async updateStock(id, stock) {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/products/${id}`;
    this.loading = true;
    const response = await putRequest(BASE_URL + ENDPOINT, { stock });
    this.loading = await loadingWithTimeout(50);
    return response;
  },
  async createProduct(product) {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/products`;
    this.loading = true;
    const response = await postRequest(BASE_URL + ENDPOINT, product);
    this.loading = await loadingWithTimeout(50);
    return response;
  },
  async updateProduct(id, product) {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/products/${id}`;
    this.loading = true;
    const response = await putRequest(BASE_URL + ENDPOINT, product);
    this.loading = await loadingWithTimeout(50);
    return response;
  }
};

export default productsStore;