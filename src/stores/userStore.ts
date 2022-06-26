import { defineStore } from "pinia";
import type { ILoginData, IRegisterData, User } from "@/apis/userApi";
import userApi from "@/apis/userApi";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { CacheEnum } from "@/enum/cacheEnum";
import { msg } from "@/utils/msg";
import router from "@/router";
import utils from "@/utils";
import { firebaseStores } from "./firebaseStore";
import { routes } from "../router/autoload/index";

export default defineStore({
  id: "user",
  state: () => {
    return {
      info: {} as null | IUser,
      auth: getAuth(),
      firebasestore: firebaseStores(),
    };
  },
  actions: {
    // async getUserInfo() {
    //   const res = await userApi.info();
    //   this.info = res.result;
    // },
    async getUserInfo() {
      return new Promise((resolve) => {
        onAuthStateChanged(this.auth, async (user) => {
          if (user) {
            this.info = (await this.firebasestore.get(
              "users",
              user.displayName!
            )) as null | IUser;
            // setTimeout(() => resolve(user), 3000) // 模擬網路延遲
            resolve(user);
          } else {
            resolve(user);
          }
        });
      });
    },
    async permissionlist() {
      await this.getUserInfo();
      routes.forEach((r) => {
        if (this.info?.permissions.includes(r.meta?.permission!)) {
          router.addRoute(r);
        }
      });
    },
    async createUser(userForm: IRegisterData) {
      const userName = await this.firebasestore.get("users", userForm.name);
      if (userName != null) {
        msg("此名稱已被使用", "error");
      } else {
        createUserWithEmailAndPassword(
          this.auth,
          `${userForm.account}@gmail.com`,
          userForm.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            utils.store.set(CacheEnum.TOKEN_NAME, user.uid);
            const routeName =
              utils.store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";
            if (this.auth.currentUser) {
              updateProfile(this.auth.currentUser, {
                displayName: userForm.name,
              })
                .then(async () => {
                  this.firebasestore.add("users", userForm.name, {
                    ...userForm,
                    permissions: [],
                    active: true,
                  });
                  await this.permissionlist();
                  router.push({ name: routeName });
                  msg(`歡迎${userForm.name}`);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    async login(loginForm: ILoginData) {
      signInWithEmailAndPassword(
        this.auth,
        `${loginForm.account}@gmail.com`,
        loginForm.password
      )
        .then(async (userCredential) => {
          await this.permissionlist();
          const user = userCredential.user;
          if (this.info?.active) {
            utils.store.set(CacheEnum.TOKEN_NAME, user.uid);
            const routeName =
              utils.store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";
            router.push({ name: routeName });
            msg(`歡迎${user.displayName}`);
          } else {
            this.info = null;
            msg("您以被停權，請聯繫管理員", "error");
          }
        })
        .catch((error) => {
          msg("帳號或密碼錯誤", "error");
          console.error(error);
        });
    },
  },
});
