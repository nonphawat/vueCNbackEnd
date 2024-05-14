import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },

  {
    path: "",
    name: "toolbar",
    component: () => import("../views/ToolBarView.vue"),
    children: [
      {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/me",
        name: "me",
        component: () => import("../views/MeView.vue"),
      },
      {
        path: "/simple",
        name: "simple",
        component: () => import("../views/Simple.vue"),
      },
      {
        path: "/apicon",
        name: "apicon",
        component: () => import("../views/Apicon.vue"),
      }, 
      {
        path: "/products",
        name: "products",
        component: () => import("../views/Products.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
