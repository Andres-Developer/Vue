import {createRouter, createWebHistory} from "vue-router";

import HomePage from "./views/HomePage.vue";
import CartContentVue from "./views/CartContent.vue";
import ProductDetail from "./views/ProductDetail.vue";
// import NotFound from "./views/NotFound.vue";

const routes = [
  { path: '/', component: HomePage, name: "home" },
  { path: "/cart", component: CartContentVue, name: "cart-content" },
  { path: "/product/:id", component: ProductDetail, name: "product-detail-id" },
  // { path: "/:pathMatch(.*)*", component: NotFound, name: "not-found" },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;