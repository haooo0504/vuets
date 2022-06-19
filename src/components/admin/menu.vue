<template>
  <div class="admin-menu" :class="{ close: menu.close }">
    <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="menu.close"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu
        :index="menus.title"
        v-for="(menus, index) of menu.menus"
        :key="index"
      >
        <template #title>
          <i :class="menus.icon" class="text-2xl"></i>
          <span>{{ menus.title }}</span>
        </template>
        <el-menu-item
          :index="cmenu.route?.split('.').pop()"
          v-for="(cmenu, key) of menus?.children"
          :key="key"
          >{{ cmenu.title }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
    <div class="bg block md:hidden" @click="menu.toggleState()"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

import router from "@/router";

import menuStore from "@/stores/menuStore";
import { watch } from "vue";
import type { IMenu } from "types/menu";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const menu = menuStore();
const refmenu = storeToRefs(menu);
const route = useRoute();
watch(route, () => menu.setCurrentMenu(route), { immediate: true });

const reset = () => {
  menu.menus.forEach((menu) => {
    menu.isClick = false;
    menu.children?.forEach((cmenu) => {
      cmenu.isClick = false;
    });
  });
};

const handle = (pmenu: IMenu, cmenu?: IMenu) => {
  reset();
  pmenu.isClick = true;
  if (cmenu) {
    cmenu.isClick = true;
    router.push({ name: cmenu.route });
  }
};

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

@media screen and(max-width:768px) {
  .admin-menu {
    @apply h-screen w-[200px] absolute left-0 top-0 z-50;
    .el-menu-vertical-demo {
      @apply h-full z-50 absolute;
      .close {
      }
    }
    .bg {
      @apply bg-gray-100 z-40 opacity-75 w-screen h-screen absolute left-0 top-0;
    }
    &.close {
      @apply hidden;
    }
  }
}
</style>
