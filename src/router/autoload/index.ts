import userStore from "@/stores/userStore";
import util from "@/utils";
import type { Router, RouteRecordRaw } from "vue-router";
import autoloadModuleRoutes from "./module";
import getRoutes from "./view";

export let routes = [] as RouteRecordRaw[];
if (util.env.VITE_ROUTE_AUTOLOAD) {
  routes = getRoutes();
} else {
  routes = autoloadModuleRoutes();
}

function autoload(router: Router) {
  const user = userStore();
  routes = routes.map((route) => {
    route.children = route.children?.filter((r) => {
      const permission = r.meta?.permission;
      return permission ? user.info?.permissions.includes(permission) : true;
    });
    return route;
  });
  routes.forEach((r) => router.addRoute(r));
}
export default autoload;
// const routes = env.VITE_ROUTE_AUTOLOAD ? getRoutes() : ([] as RouteRecordRaw[]);
