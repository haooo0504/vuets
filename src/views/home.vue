<template>
  <div class="bg-orange-50 w-screen h-screen flex justify-center items-center">
    <div>
      <router-link :to="{ name: 'admin.home' }" class="button"
        >後臺管理</router-link
      >
      <router-link
        v-if="!utils.user.isLogin()"
        :to="{ name: 'login' }"
        class="button ml-5 !bg-orange-500 hover:!bg-orange-400"
        >用戶登入</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import utils from "@/utils";
</script>

<style scoped></style>

<!-- <script lang="ts">
// export default {
//   route: { name: "home" },
// };
</script> -->
