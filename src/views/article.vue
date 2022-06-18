<template>
  <div>
    <ul>
      <li v-for="(article, index) of result" :key="index" @click="del(index)">
        {{ article.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { article } from "@/apis/articleApi";
const { result } = await article();
console.log(result);

const articles = ref(result);
// const del=(index:number){
//   articles.value.splice(index,1)
// }
</script>

<style lang="scss" scoped></style>
