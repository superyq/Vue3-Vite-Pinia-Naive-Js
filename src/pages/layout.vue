<script setup>
  import { ref } from "vue";
  import {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
  } from "naive-ui";
  // menu
  import layoutMenu from "./components/layout-menu.vue";
  // 面包屑
  import layoutCrumbs from "./components/layout-crumbs.vue";
  // 用户信息
  import layoutUser from "./components/layout-user.vue";
  // 页面标签
  import layoutTag from "./components/layout-tag.vue";
  // 页面内容
  import layoutContent from "./components/layout-content.vue";
 
  // 是否展开menu
  let isOpen = ref(true);
  // n-layout-sider 折叠状态发生改变时的回调函数
  function handleChangeSider(isHide) {
    if (isHide) {
      isOpen.value = !isHide;
    }
  }
  // n-layout-sider 完成展开后的回调
  function handleEnter() {
    isOpen.value = true;
  }
 
  // n-layout-sider 是否显示边框
  let bordered = ref(true);
  // n-layout-sider 是否反转背景色
  let inverted = ref(false);
  // n-layout-sider 是否在自身使用原生滚动条。如果设定为 false，Sider 将会对内容使用 naive-ui 风格的滚动条
  let scrollbar = ref(false);
  // n-layout-sider 折叠宽度
  let colWidth = ref(50);
  // n-layout-sider 展开宽度
  let siderWidth = ref(155);
</script>
 
<template>
  <!-- layout 盒子 -->
  <n-layout has-sider class="layout-box">
    <!-- 左侧导航 -->
    <n-layout-sider
      collapse-mode="width"
      show-trigger="arrow-circle"
      :bordered="bordered"
      :inverted="inverted"
      :native-scrollbar="scrollbar"
      :collapsed-width="colWidth"
      :width="siderWidth"
      @update:collapsed="handleChangeSider"
      @after-enter="handleEnter"
    >
      <layout-menu :isOpen="isOpen" :inverted="inverted"></layout-menu>
    </n-layout-sider>
    <!-- 右侧内容 -->
    <n-layout>
      <n-layout-header :bordered="bordered">
        <div class="layout-header__box">
          <layout-crumbs></layout-crumbs>
          <layout-user></layout-user>
        </div>
        <!--  -->
        <layout-tag></layout-tag>
        <div class="layout-header__shadow"></div>
      </n-layout-header>
      <n-layout-content>
        <layout-content></layout-content>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
 
<style lang="scss" scoped>
  .layout-box {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
  }
  .layout-header__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    height: 50px;
    border-bottom: 1px solid rgb(239, 239, 245);
  }
  .layout-header__shadow {
    width: 100%;
    height: 2px;
    background: #d9d9d9;
  }
</style>