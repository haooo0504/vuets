<template>
  <div class="admin min-h-screen w-screen flex">
    <MenuComponent class="" />

    <div class="contect flex-1 bg-gray-100">
      <Navbar />
      <historyLink />
      <div class="m-5">
        <router-view #default="{ Component }">
          <Transition
            appear
            class="animate__animated"
            enter-active-class="animate__fadeIn"
            leave-active-class="animate__fadeOut"
          >
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuComponent from "@/components/admin/menu.vue";
import Navbar from "@/components/admin/navbar.vue";
import historyLink from "@/components/admin/historyLink.vue";
import menuStore from "@/stores/menuStore";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { watch } from "vue";
const route = useRoute();
const menu = menuStore();
menu.init();
watch(
  route,
  () => {
    menu.addHistoryMenu(route);
  },
  { immediate: true }
);
</script>

<script lang="ts">
export default {
  route: { meta: { auth: true } },
};
</script>

<style lang="scss" scoped></style>
