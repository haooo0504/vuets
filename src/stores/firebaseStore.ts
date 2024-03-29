import { CacheEnum } from "@/enum/cacheEnum";
import utils from "@/utils";
import { msg } from "@/utils/msg";
import { ElMessage } from "element-plus";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
  deleteDoc,
  type DocumentData,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "../plugin/firebase";

export const firebaseStores = defineStore({
  id: "firebase",
  state: () => ({}),
  actions: {
    async add(name: string, id: string, obj: object) {
      try {
        await setDoc(doc(collection(db, name), id), {
          date:
            new Date().getFullYear() +
            "-" +
            (new Date().getUTCMonth() + 1) +
            "-" +
            new Date().getDate() +
            " " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes(),
          ...obj,
        });
      } catch (error) {
        console.error("新增資料錯誤", error);
      }
    },
    // (獲取單筆資料)
    async get(name: string, id: string): Promise<DocumentData | null> {
      console.log(name, id);
      const getdoc = await getDoc(doc(db, name, id));

      return getdoc.exists() ? getdoc.data() : null;
    },
    // (更新資料)
    async update(name: string, id: string, obj: object) {
      if (utils.store.get(CacheEnum.TOKEN_NAME) != "hao05hao05") {
        msg("沒有權限修改資料", "error");
      } else {
        try {
          console.log(db, name, id, obj);
          await updateDoc(doc(db, name, id), obj);
          ElMessage.success("儲存成功");
        } catch (e) {
          console.error("更新資料失敗: ", e);
        }
      }
    },
    // (刪除資料)
    async delete(name: string, id: string) {
      try {
        await deleteDoc(doc(db, name, id));
      } catch (e) {
        console.error("刪除資料失敗: ", e);
      }
    },
    // (動態更新資料)
    async data(name: string) {
      const datalist = ref<any>([]);
      onSnapshot(collection(db, name), (querySnapshot) => {
        datalist.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });

      return datalist;
    },
  },
});
