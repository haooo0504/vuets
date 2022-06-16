<template>
  <div class="admin min-h-screen w-screen flex">
    <MenuComponent class="hidden md:block" />

    <div class="contect flex-1 bg-gray-100">
      <Navbar />
      <historyLink />
      <div class="m-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuComponent from "./admin/menu.vue";
import Navbar from "./admin/navbar.vue";
import historyLink from "./admin/historyLink.vue";
</script>

<script lang="ts">
export default {
  route: { meta: { auth: true } },
};
</script>

<style lang="scss" scoped></style>
