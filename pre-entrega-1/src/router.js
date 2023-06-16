import {createRouter, createWebHistory} from "vue-router";

import HomePage from "./views/HomePage.vue";
import QuienesSomos from "./views/QuienesSomos.vue";
import PostId from "./views/PostId.vue";
// import NotFound from "./views/NotFound.vue";

const routes = [
  { path: '/', component: HomePage, name: "home" },
  { path: "/somos-increibles", component: QuienesSomos, name: "quienes-somos" },
  { path: "/posts/:id", component: PostId, name: "post-id" },
  // { path: "/:pathMatch(.*)*", component: NotFound, name: "not-found" },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;