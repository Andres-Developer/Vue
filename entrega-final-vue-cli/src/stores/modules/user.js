import { getRequest, postRequest, putRequest } from '../../services/httpRequests';
import { loadingWithTimeout } from '../../utils/loadingTools';

const USERS_ENDPOINT = '/users';

const userModule = {
  namespaced: true,
  state: {
    user: null,
    client: null,
    users: null,
    usersWithOrders: null,
    loading: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setClient(state, client) {
      state.client = client;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setUsersWithOrders(state, usersWithOrders) {
      state.usersWithOrders = usersWithOrders;
    },
    setUserOrder(state, order) {
      state.user.orders.push(order);
    },
    setLoading(state, value) {
      state.loading = value;
    }


  },
  actions: {
    async loginUser({ commit, getters }, { email, password }) {

      commit('setLoading', true);
      const user = await getRequest(USERS_ENDPOINT + `?email=${email}`);
      commit('setUser', user);
      await loadingWithTimeout(1000);
      commit('setLoading', false);

      if (user.length === 0) {
        commit('setUser', null);
        return false;
      }
      if (user[0].password !== password) {  // user found but password doesn't match
        commit('setUser', null);
        return false;
      }
      delete user[0].password; // remove password from user object
      delete user[0].createdAt; // remove createdAt from user object

      commit('setUser', user[0]);
      localStorage.setItem("user", JSON.stringify(getters.getUser));
    },
    async registerUser({ commit, getters }, { formData }) {

      commit('setLoading', true);
      const user = await getRequest(USERS_ENDPOINT + `?email=${formData.email}`);
      commit('setLoading', false);

      if (user.length !== 0) {
        return false; // User already exists
      }
      const newUser = await postRequest(USERS_ENDPOINT, formData);

      delete newUser.password; // remove password from user object
      delete newUser.createdAt; // remove createdAt from user object

      commit('setUser', newUser);

      localStorage.setItem("user", JSON.stringify(getters.getUser));
    },
    logoutUser({ commit }) {
      commit('setUser', null);
      localStorage.removeItem("user");
    },
    loadUserFromLocalStorage({ commit }) {
      const userLoaded = JSON.parse(localStorage.getItem('user'));
      commit('setUser', userLoaded);
    },
    async addOrder({ commit, getters, dispatch, rootState }, billingDetails) {
      const order = {};
      order.billingDetails = billingDetails;
      order.products = rootState.cartModule.productsInCart;
      order.grandTotal = rootState.cartModule.productsInCart.reduce((acc, product) => acc + product.subtotal, 0);
      order.dateOfPurchase = new Date();
      order.id = getters.getUser.orders.length + 1;

      commit('setUserOrder', order);

      commit('setLoading', true);
      await dispatch('editUser', getters.getUser); // Pendiente verificar
      await dispatch('productsModule/updateAllProductsStock', order.products, { root: true }); // Pendiente verificar
      commit('setLoading', false);

      localStorage.setItem("user", JSON.stringify(getters.getUser));
    },
    async editUser({ commit, getters }, userData) {
      const editedUser = await putRequest(USERS_ENDPOINT + `/${getters.getUser.id}`, userData);
      commit('setUser', editedUser);
    },
    async getClientFromAPI({ commit }, id) {
      commit('setLoading', true);
      const client = await getRequest(USERS_ENDPOINT + `/${id}`);
      commit('setClient', client);
      await loadingWithTimeout(1000);
      commit('setLoading', false);
    },
    async getUsersFromAPI({ commit }) {
      commit('setLoading', true);
      const users = await getRequest(USERS_ENDPOINT);
      commit('setUsers', users);
      await loadingWithTimeout(1000);
      commit('setLoading', false);
    },
    async getClientOrders({ commit, getters }) {
      const usersWithOrders = getters.getUsers.filter(user => user.orders.length !== 0);
      commit('setUsersWithOrders', usersWithOrders);
    },
  },
  getters: {
    getUser(state) { return state.user; },
    getClient(state) { return state.client; },
    getUsers(state) { return state.users; },
    getUsersWithOrders(state) { return state.usersWithOrders; },
    getIsUserAuthenticate(state) { return !!state.user; },
    getLoading(state) { return state.loading; }
  },
};

export { userModule };