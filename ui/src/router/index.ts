import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/features/home/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      children: [
        {
          path: "/home",
          component: HomeView,
        },
      ],
    },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: () => import("@/features/auth/AuthLayout.vue"),
      children: [
        {
          path: "login",
          component: () => import("@/features/auth/LoginPage.vue"),
          name: "auth:login",
        },
        {
          path: "register",
          component: () => import("@/features/auth/RegisterPage.vue"),
          name: "auth:register",
        },
      ],
    },
  ],
});

export default router;
