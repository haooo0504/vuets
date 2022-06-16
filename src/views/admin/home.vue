<template>
  <div class="grid md:grid-flow-col gap-3">
    <el-card
      class="box-card cursor-pointer"
      v-for="(card, index) in cards"
      :key="index"
      shadow="hover"
    >
      <template #header>
        <div class="card-header">
          <span class="flex justify-between items-center"
            >{{ card.title }}
            <el-tag class="ml-2" type="danger" effect="dark" size="small"
              >月</el-tag
            >
          </span>
        </div>
      </template>
      <section class="flex my-3 justify-between items-center">
        <span class="text-3xl">${{ card.price }}</span>
        <i :class="[card.icon]" class="text-2xl"></i>
      </section>
      <section class="text-base mt-6 flex justify-between">
        {{ card.totalTitle }}
        <span>{{ card.total }}</span>
      </section>
    </el-card>
  </div>
  <div class="bg-white p-3 mt-5 grid md:grid-flow-col">
    <div id="echart1" style="height: 500px" class="w-full md:w-[600px]"></div>
    <div id="echart2" style="height: 500px" class="w-full md:w-[600px]"></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";
import { echart1, echart2 } from "./echart";

interface ICard {
  title: string;
  price: number;
  icon: string;
  iconColor: string;
  totalTitle: string;
  total: number;
}
const cards = ref<ICard[]>([
  {
    title: "訪問數",
    price: 541315,
    icon: "fas fa-chart-column",
    iconColor: "string",
    totalTitle: "總人數",
    total: 5462444,
  },
  {
    title: "銷售數",
    price: 457888,
    icon: "fas fa-money-check-dollar",
    iconColor: "string",
    totalTitle: "總銷售數",
    total: 2545314,
  },
  {
    title: "訂單數",
    price: 48524,
    icon: "fas fa-money-bill-trend-up",
    iconColor: "string",
    totalTitle: "總訂單數",
    total: 453423,
  },
  {
    title: "評論數",
    price: 13545,
    icon: "fas fa-comment-dots",
    iconColor: "string",
    totalTitle: "總評論數",
    total: 215615,
  },
]);

nextTick(() => {
  echarts.init(document.getElementById("echart1")).setOption(echart1);
  echarts.init(document.getElementById("echart2")).setOption(echart2);
});
</script>

<style lang="scss" scoped></style>
