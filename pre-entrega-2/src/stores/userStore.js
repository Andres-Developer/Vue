import { getRequest, postRequest, putRequest } from "@/services/httpRequests";
import { loadingWithTimeout } from "@/utils/loadingTools";
import cartStore from '@/stores/cartStore';
import productsStore from '@/stores/productsStore';

const userStore = {

  user: null,
  loading: false,

  get isUserAuthenticated() {
    return !!this?.user;
  },

  setUser(user) {
    this.user = user;
  },
  getUser() {
    return this.user;
  },

  checkUserAuthenticated() {
    this.loadUserFromLocalStorage();
    return this.isUserAuthenticated;
  },

  loadUserFromLocalStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },

  async loginUser({ email, password }) {

    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/users?email=${email}`;

    this.loading = true;
    const user = await getRequest(BASE_URL + ENDPOINT);
    this.loading = await loadingWithTimeout(1000);

    if (user.length === 0) {
      this.user = null;
      return false;
    }
    if (user[0].password !== password) {  // user found but password doesn't match
      this.user = null;
      return false;
    }

    delete user[0].password; // remove password from user object
    delete user[0].createdAt; // remove createdAt from user object

    this.user = user[0]; // set user object   

    localStorage.setItem("user", JSON.stringify(this.user));
  },

  async registerUser(formData) {

    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/users?email=${formData.email}`;

    this.loading = true;
    const user = await getRequest(BASE_URL + ENDPOINT);
    this.loading = await loadingWithTimeout(1000);

    if (user.length !== 0) {
      return false; // User already exists
    }
    const newUser = await postRequest(BASE_URL + "/users", formData);

    delete newUser.password; // remove password from user object
    delete newUser.createdAt; // remove createdAt from user object

    this.user = newUser;

    localStorage.setItem("user", JSON.stringify(this.user));

    return newUser;
  },

  logoutUser() {
    this.user = null;
    localStorage.removeItem("user");
  },

  async addOrder() {
    const order = {};
    order.products = cartStore.productsInCart;
    order.grandTotal = cartStore.grandTotal;
    order.dateOfPurchase = new Date();
    order.id = this.user.orders.length + 1;
    this.user.orders.push(order);

    const user = await this.editUser(this.user);
    await productsStore.updateAllProductsStock(order.products);

    localStorage.setItem("user", JSON.stringify(this.user));

    return user;
  },

  async editUser(userData) {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/users/${this.user.id}`;
    this.loading = true;
    const user = await putRequest(BASE_URL + ENDPOINT, userData);
    this.loading = await loadingWithTimeout(1000);
    return user;
  },

  async getClientOrders() {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/users`;
    this.loading = true;
    const users = await getRequest(BASE_URL + ENDPOINT);

    const userWithOrders = users.filter(user => user.orders.length !== 0);

    this.loading = await loadingWithTimeout(1000);


    return userWithOrders;
  },

  async getSingleUser(id) {
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    const ENDPOINT = `/users/${id}`;
    this.loading = true;
    const user = await getRequest(BASE_URL + ENDPOINT);
    this.loading = await loadingWithTimeout(1000);
    return user;
  }
};

export default userStore;