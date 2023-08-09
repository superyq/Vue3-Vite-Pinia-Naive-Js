<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { NMenu } from "naive-ui";
import { usePermissionStore } from "@/store/permission.js";
import { useTagStore } from "@/store/tag.js";
import router from "@/router/index.js";

defineProps({
  isOpen: Boolean,
  inverted: Boolean,
});

let route = useRoute();
let permissionStore = usePermissionStore();
let tagStore = useTagStore();

let menuOptions = computed(() => {
  return permissionStore.siderMenu;
});

let activeMenuValue = ref("");
watch(
  () => route.name,
  () => {
    activeMenuValue.value = route.name;
    permissionStore.activeMenuValue = route.name;
  },
  { immediate: true, deep: true }
);

// 新增 tag
let obj = { title: route.meta.title, key: route.name };
tagStore.addTag(obj);

let handleUpdateMenu = (value, item) => {
  // 新增 tag
  let { title, key } = item;
  let obj = { title, key };
  tagStore.addTag(obj);

  router.push(`/${value}`);
  activeMenuValue.value = value;
};
</script>

<template>
  <!-- logo -->
  <div
    class="layout-sider__logo c-center"
    :class="{ isHide: !isOpen }"
    @click="$router.push('/home')"
  >
    <svg-icon name="vite"></svg-icon>
    <!-- <img src="@/assets/images/logo.png" /> -->
    <h1 v-show="isOpen">后台管理系统</h1>
  </div>
  <!-- menu组件 -->
  <n-menu
    :inverted="inverted"
    :indent="15"
    :root-indent="15"
    :options="menuOptions"
    :value="activeMenuValue"
    @update:value="handleUpdateMenu"
  ></n-menu>
</template>

<style lang="scss" scoped>
.layout-sider__logo {
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  img {
    margin-right: 5px;
    width: 25px;
    object-fit: contain;
  }
  svg {
    margin-right: 5px;
  }
}
.isHide {
  img {
    width: 30px;
  }
}
</style>
