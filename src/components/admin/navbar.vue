<template>
  <div class="bg-white p-4 flex justify-between items-center">
    <div class="flex items-center">
      <div @click="menus.toggleState()">
        <!-- <section v-if="menus.close">
          <i class="fas fa-angles-right mr-2 cursor-pointer"></i>
        </section>
        <section v-else>
          <i class="fas fa-angles-left mr-2 cursor-pointer"></i>
        </section> -->

        <section
          :class="{ 'rotate-180': menus.close }"
          class="mr-2 cursor-pointer duration-300"
        >
          <i class="fas fa-angles-left text-[#3f3f3f] text-lg"></i>
        </section>
      </div>
      <Breadcrumb
        class="hidden md:block"
        :class="{ 'md:hidden': !menus.isBreadcrumbCollapse }"
      />
    </div>

    <div class="flex items-center relative">
      <Notification class="mr-5 text-[#3f3f3f] text-lg" />
      <section @click="fullscreen()">
        <i
          class="fas fa-maximize mr-5 cursor-pointer text-[#3f3f3f] text-lg"
        ></i>
      </section>
      <el-dropdown>
        <span class="el-dropdown-link text-[#3f3f3f] text-lg">
          <el-icon class="fas fa-user">
            <arrow-down />
          </el-icon>
          {{ useStore.info?.name }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <i class="fas fa-paste mr-1" /> 文檔資料</el-dropdown-item
            >
            <el-dropdown-item>
              <i class="fas fa-house-user mr-1" />用戶管理</el-dropdown-item
            >
            <el-dropdown-item divided @click="util.user.logout()">
              <i class="fas fa-sign-out-alt mr-1" />退出登入</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import user from "@/stores/userStore";
import { ArrowDown } from "@element-plus/icons-vue";
import util from "@/utils";
import menuStore from "@/stores/menuStore";
import { storeToRefs } from "pinia";
import Notification from "../notification.vue";
import Breadcrumb from "../breadcrumb.vue";
import ThemeSetting from "../ThemeSetting.vue";

const menus = menuStore();
const menu = storeToRefs(menus);

const useStore = user();
let isFullScreen = false;
const fullscreen = () => {
  isFullScreen
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen();
  isFullScreen = !isFullScreen;
};
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
