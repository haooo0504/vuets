import type { RouteRecordRaw } from "vue-router";

export default {
  name: "editor",
  path: "/editor",
  component: () => import("@/layouts/admin.vue"),
  meta: {
    auth: true,
    menu: {
      title: "編輯器",
      icon: "fas fa-pen",
      isClick: false,
    },
    number: 3,
  },

  children: [
    {
      name: "markdown",
      path: "markdown",
      component: () => import("@/views/editor/markdown.vue"),
      meta: { menu: { title: "markdown" } },
    },
    {
      name: "base",
      path: "base",
      component: () => import("@/views/editor/base.vue"),
      meta: { menu: { title: "base" }, permission: "admin" },
    },
  ],
} as RouteRecordRaw;
