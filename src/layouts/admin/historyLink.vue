<template>
  <div class="hidden md:block">
    <div class="m-5 grid grid-flow-col gap-2 justify-start">
      <a
        href=""
        v-for="(link, index) of links"
        :key="index"
        class="bg-white rounded-md py-2 px-3 text-sm text-gray-600"
      >
        {{ link.title }}
        <i class="fas fa-xmark ml-1"></i>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const links = ref<{ title: string }[]>([
  { title: "編輯器1" },
  { title: "編輯器2" },
  { title: "編輯器3" },
  { title: "編輯器4" },
]);
</script>

<style lang="scss" scoped></style>
