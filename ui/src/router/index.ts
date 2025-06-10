import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/features/home/HomePage.vue";
import { authTokenKey } from "@/constants/common.ts";

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
      beforeEnter: () => {
        if (localStorage.getItem(authTokenKey)) {
          return true;
        } else {
          return { name: "auth" };
        }
      },
    },
    {
      name: "auth",
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
      beforeEnter: () => {
        localStorage.removeItem(authTokenKey);
      },
    },
  ],
});

export default router;
