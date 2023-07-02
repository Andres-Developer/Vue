import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./views/HomePage.vue";
import CartContentVue from "./views/CartContent.vue";
import ProductDetail from "./views/ProductDetail.vue";
import LoginUser from "./views/LoginUser.vue";
import RegisterUser from "./views/RegisterUser.vue";
import userStore from "./stores/userStore";
import AdminDashboard from "./views/AdminDashboard.vue";
import ClientDashboard from "./views/ClientDashboard.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  { path: '/', component: HomePage, name: "home" },
  { path: "/cart", component: CartContentVue, name: "cart-content" },
  { path: "/product/:id", component: ProductDetail, name: "product-detail-id" },
  { path: "/register", component: RegisterUser, name: "register-user" },
  { path: "/login", component: LoginUser, name: "login-user" },
  { path: "/admin", component: AdminDashboard, name: "admin", meta: { isAuth: true } },
  { path: "/client", component: ClientDashboard, name: "client", meta: { isAuth: true } },
  { path: "/:pathMatch(.*)*", component: NotFound, name: "not-found" },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {

  const isUserAuthenticated = userStore.checkUserAuthenticated();
  // console.log("isUserAuthenticated before each: ", isUserAuthenticated);
  // console.log("user before each: ", userStore.user);

  if (to.matched.some(record => record.meta.isAuth)) {
    if (!isUserAuthenticated) {
      next('/login');
    }
  }
  if (isUserAuthenticated && (to.path === '/login' || to.path === '/register' || to.path === '/admin')) {
    if (userStore.user.isAdmin) {
      next('/admin');
    }
    next('/client');
  }
  next();
});

export default router;