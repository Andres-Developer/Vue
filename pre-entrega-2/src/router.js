import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./views/HomePage.vue";
import CartContentVue from "./views/CartContent.vue";
import ProductDetail from "./views/ProductDetail.vue";
import LoginUser from "./views/LoginUser.vue";
import RegisterUser from "./views/RegisterUser.vue";
import userStore from "./stores/userStore";
import AdminDashboard from "./views/AdminDashboard.vue";
import ProductsManagement from "./views/ProductsManagement.vue";
import ClientOrders from "./views/ClientOrders.vue";
import ClientOrdersList from "./views/ClientOrdersList.vue";
import ProductCreateEdit from "./views/ProductCreateEdit.vue";
import ClientDashboard from "./views/ClientDashboard.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  { path: '/', component: HomePage, name: "home" },
  { path: "/cart", component: CartContentVue, name: "cart-content" },
  { path: "/product/:id", component: ProductDetail, name: "product-detail-id" },
  { path: "/register", component: RegisterUser, name: "register-user" },
  { path: "/login", component: LoginUser, name: "login-user" },
  { path: "/admin", component: AdminDashboard, name: "admin", meta: { isAuth: true, onlyAdmin: true } },
  { path: "/admin/products-management", component: ProductsManagement, name: "products-management", meta: { isAuth: true, onlyAdmin: true } },
  { path: "/admin/product/:param", component: ProductCreateEdit, name: "admin-create-product", meta: { isAuth: true, onlyAdmin: true } },
  { path: "/admin/product/edit/:id*", component: ProductCreateEdit, name: "admin-edit-product", meta: { isAuth: true, onlyAdmin: true } },
  { path: "/admin/self-orders", component: ClientDashboard, name: "self-orders", meta: { isAuth: true, onlyAdmin: true } },
  { path: "/admin/client-orders", component: ClientOrders, name: "client-orders", meta: { isAuth: true, onlyAdmin: true } },
  { path: "/admin/client-orders/client/:id", component: ClientOrdersList, name: "client-orders-list", meta: { isAuth: true, onlyAdmin: true } },
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
    } else {
      if (userStore.user.isAdmin && to.path === '/client') {
        next('/admin');
        return;
      }
      if (!userStore.user.isAdmin && (to.matched.some(record => record.meta.onlyAdmin))) {
        next('/client');
        return;
      }
    }
  }
  else {
    if (isUserAuthenticated && (to.path === '/login' || to.path === '/register')) {
      next('/admin');
      return;
    }
  }
  next();
});

export default router;