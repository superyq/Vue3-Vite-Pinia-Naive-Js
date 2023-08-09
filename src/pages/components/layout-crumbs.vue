<script setup>
import { watch, ref } from "vue";
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { useRoute } from "vue-router";

let route = useRoute();

// 判断是二级目录
let getCrumList = (nowRoute) => {
  let arr = [nowRoute.meta.title];
  !!nowRoute.meta.parentTitle && arr.unshift(nowRoute.meta.parentTitle);
  return arr;
};

let crumbList = ref([]);
// 监听路由，获取crumlist
watch(
  () => route,
  (newRoute) => {
    crumbList.value = getCrumList(newRoute);
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      class="layout-crumbs-item"
      v-for="(item, index) in crumbList"
      :key="index"
      >{{ item }}</n-breadcrumb-item
    >
  </n-breadcrumb>
</template>

<style lang="scss" scoped>
.layout-crumbs-item {
  font-size: 16px;
}
</style>
