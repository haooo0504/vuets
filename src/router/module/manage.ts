import type { RouteRecordRaw } from "vue-router";

export default {
  name: "manage",
  path: "/manage",
  component: () => import("@/layouts/admin.vue"),
  meta: {
    auth: true,
    menu: {
      title: "管理頁面",
      icon: "fas fa-pen-to-square",
      isClick: false,
    },
  },
  children: [
    {
      name: "manage.goods",
      path: "goods",
      component: () => import("@/views/manage/manage.vue"),
      meta: { menu: { title: "用戶管理" } },
    },
  ],
} as RouteRecordRaw;
