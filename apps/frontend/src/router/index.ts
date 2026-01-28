import { createWebHashHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("../views/home/index.vue"),
        children: [
          {
            path: "games",
            name: "Games",
            component: () => import("../views/home/games/index.vue"),
            children: [
              {
                path: "demo",
                name: "demo",
                component: () => import("../views/home/games/demo/index.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/demo",
        name: "Demo",
        component: () => import("../views/demo/index.vue"),
        children: [
          {
            path: "canvas",
            name: "Canvas",
            component: () => import("../views/demo/canvas/index.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
  },
];

export const router = createRouter({
  routes: routes,
  history: createWebHashHistory(),
});
