import store from "@/utils/store";
import type { RouteLocationNormalized, Router } from "vue-router";
import type { IData } from "@/utils/store";

class Guard {
  constructor(private router: Router) {}
  public run() {
    this.router.beforeEach((to, from) => {
      let token = store.get("token")?.token;
      if (this.isLogin(to, token) === false) return { name: "login" };
      if (this.isGuest(to, token) === false) return from;
    });
  }
  private isGuest(route: RouteLocationNormalized, token: IData | null) {
    return Boolean(!route.meta.guest || (route.meta.guest && !token));
  }
  private isLogin(route: RouteLocationNormalized, token: IData | null) {
    return Boolean(!route.meta.auth || (route.meta.auth && token));
  }
}

export default (router: Router) => {
  new Guard(router).run();
};
