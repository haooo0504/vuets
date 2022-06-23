import userApi, { type ILoginData } from "@/apis/userApi";
import { CacheEnum } from "@/enum/cacheEnum";
import store from "./store";
import util from "./index";
import router from "@/router";
import { remove } from "lodash";
import userStore from "../stores/userStore";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

export function isLogin() {
  return Boolean(store.get(CacheEnum.TOKEN_NAME));
}

export async function login(values: ILoginData) {
  const {
    result: { token },
  } = await userApi.login(values);
  util.store.set(
    CacheEnum.TOKEN_NAME,
    {
      token,
      expire: 50000,
    },
    50000
  );
  const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";
  router.push({ name: routeName });
}

export function logout() {
  store.remove(CacheEnum.TOKEN_NAME);
  router.push("/");
  userStore().info = null;
  ElMessage({
    message: "登出成功",
    type: "success",
    duration: 2000,
  });
}
