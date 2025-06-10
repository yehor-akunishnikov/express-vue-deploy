import { createRouter, createWebHistory } from "vue-router";

import DashboardPage from "@/features/dashboard/DashboardPage.vue";
import { removeAuthToken } from "@/utils/localStorage.ts";
import HomeView from "@/features/home/HomePage.vue";
import { authGuard } from "@/router/guards.ts";

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
      name: "dashboard",
      path: "/dashboard",
      component: DashboardPage,
      beforeEnter: authGuard,
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
        removeAuthToken();
      },
    },
  ],
});

export default router;
