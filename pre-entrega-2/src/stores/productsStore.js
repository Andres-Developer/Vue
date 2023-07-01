import { getRequest }  from '../services/httpRequests';
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
  }

};

export default productsStore;