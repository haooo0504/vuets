<template>
  <el-pagination
    :model-value:currentPage="props.modelValue"
    :page-size="props.pagesize"
    :layout="props.layout"
    :total="props.total"
    @current-change="current_change"
  >
  </el-pagination>
</template>

<script setup lang="ts">
export interface IProps {
  modelValue: number;
  pagesize: number;
  layout?: string;
  total: number;
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: 1,
  pagesize: 0,
  layout: "total, prev, pager, next",
  total: 0,
});
const emit = defineEmits<{
  (e: "update:modelValue", modelValue: number): void;
}>();

const current_change = (Page: number) => {
  emit("update:modelValue", Page);
};
const aa = () => {
  console.log(111);
};
defineExpose({ aa });
</script>

<style scoped></style>
