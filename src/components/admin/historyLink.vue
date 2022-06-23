<template>
  <div
    class="bg-gray-50 border-t border-b shadow-sm"
    v-show="menu.historyMenu.length"
  >
    <div class="m-5 grid grid-flow-col gap-2 justify-start">
      <div
        href=""
        v-for="(item, index) of menu.historyMenu"
        :key="index"
        class="bg-white hover:bg-hd-theme-color rounded-md py-2 px-3 text-sm text-gray-600 border"
        :class="{
          'bg-hd-theme-color text-white': $route.name == item.route,
        }"
      >
        <router-link :to="{ name: item.route }">
          {{ item.title }}
        </router-link>
        <span @click="menu.removeHistoryMenu(item)">
          <i class="fas fa-xmark ml-2 hover:text-white cursor-pointer"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import menuStore from "@/stores/menuStore";

const menu = menuStore();
</script>

<style lang="scss" scoped></style>
