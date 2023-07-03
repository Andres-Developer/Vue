import { deleteRequest, getRequest } from '../services/httpRequests';
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
  async deleteProduct(id) {
    console.log("entró a deleteProduct");
    const response = await this.deleteProductFromAPI(id);
    console.log("respone es: ", response);
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
  }

};

export default productsStore;