import { getRequest } from "@/services/httpRequests";
import { loadingWithTimeout } from "@/utils/loadingTools";

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
      this.user = null; // no user found
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

  logoutUser() {
    this.user = null;
    localStorage.removeItem("user");
  }
};

export default userStore;