import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "signin",
    path: "/signin",
    component: () => import("@/pages/auth/Signin.vue"),
    meta: {
      layout: "auth",
    },
  },
  {
    name: "signup",
    path: "/signup",
    component: () => import("@/pages/auth/Signup.vue"),
    meta: {
      layout: "auth",
    },
  },
  {
    name: "home",
    path: "/",
    component: () => import("@/pages/dashboard/Home.vue"),
    meta: {
      layout: "dashboard",
    },
  },
];

export default createRouter({
  history: createWebHistory("/"),
  routes,
});
