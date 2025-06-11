import { createRouter, createWebHistory } from "vue-router";

import { authGuard, logoutGuard, userDataGuard } from "@/router/guards.ts";
import CommonLayout from "@/components/layout/CommonLayout.vue";
import HomeView from "@/features/home/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: CommonLayout,
      children: [
        {
          name: "home",
          path: "/home",
          component: HomeView,
        },
        {
          name: "dashboard",
          path: "/dashboard",
          component: () => import("@/features/dashboard/DashboardPage.vue"),
          beforeEnter: authGuard,
        },
      ],
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
      beforeEnter: logoutGuard,
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/features/not-found/NotFoundPage.vue"),
    },
  ],
});

router.beforeEach(userDataGuard);

export default router;
