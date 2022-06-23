<template>
  <div>
    <div class="flex">
      <el-input v-model="input" placeholder="Please input" class="w-[500px]" />
      <el-button type="primary" class="bg-cyan-600 ml-2">Primary</el-button>
      <el-button type="primary" class="bg-cyan-600 ml-2">Primary</el-button>
    </div>
    <div class="mt-5">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column
          :prop="item.prop"
          :label="item.lable"
          width="flex"
          v-for="(item, index) of options"
          :key="index"
        />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { memberlist } from "@/apis/memberApi";
import { options } from "./options";

const input = ref("");

interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};
const tableData = ref([]);

const germemberList = async () => {
  const res = await memberlist();
  tableData.value = res.result;
  console.log(res.result);
};
germemberList();
</script>

<style lang="scss" scoped></style>
