import * as Router from "vue-router";
import * as Vue from "vue";
import Home from "./views/Home.vue";

const router = Router.createRouter({
  history: Router.createWebHistory(),

  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/nextPage",
      component: () => import("./views/NextPage.vue"),
    },
  ],
});

export default router;
