<template>
  <div class="menu w-[200px] bg-gray-700 p-4">
    <div class="logo text-gray-300 flex items-center">
      <i class="fab fa-codepen text-[30px] mr-2"></i>
      <span class="text-md">hello</span>
    </div>
    <div class="left-container">
      <dl v-for="(menu, index) of menus" :key="index">
        <dt @click="handle(menu)">
          <section>
            <i :class="menu.icon" class="mr-2 text-2xl"></i>
            <span class="text-md">{{ menu.title }}</span>
          </section>
          <section :class="{ 'rotate-180': menu.active }">
            <i class="fas fa-angle-down duration-200"></i>
          </section>
        </dt>
        <dd
          v-show="menu.active"
          :class="{ active: cmenu.active }"
          v-for="(cmenu, key) of menu.children"
          :key="key"
        >
          {{ cmenu.title }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface IMenuItem {
  title: string;
  icon?: string;
  active?: boolean;
}
interface IMenu extends IMenuItem {
  children?: IMenuItem[];
}
const menus = ref<IMenu[]>([
  {
    title: "錯誤頁面",
    icon: "fas fa-bug",
    active: true,
    children: [
      { title: "404頁面", active: true },
      { title: "403頁面" },
      { title: "500頁面" },
    ],
  },
  {
    title: "編輯器",
    icon: "fab fa-app-store-ios",
    children: [
      { title: "404編輯器" },
      { title: "403編輯器" },
      { title: "500編輯器" },
    ],
  },
]);
const resetMenus = () => {
  menus.value.forEach((pmenu) => {
    pmenu.active = false;
    pmenu.children?.forEach((m) => (m.active = false));
  });
};
const handle = (pmenu: IMenuItem, cmenu?: IMenuItem) => {
  resetMenus();
  pmenu.active = true;
};
</script>

<style lang="scss" scoped>
.admin {
  .left-container {
    dl {
      @apply text-gray-100 text-sm;
      dt {
        @apply text-sm mt-6 flex justify-between cursor-pointer items-center;
        section {
          @apply flex items-center;
        }
      }
      dd {
        @apply py-3 pl-4 my-2  text-white rounded-md cursor-pointer hover:bg-amber-500 duration-200;
        &.active {
          @apply bg-amber-600 hover:bg-amber-500 duration-200;
        }
      }
    }
  }
}
</style>
