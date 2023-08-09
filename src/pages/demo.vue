<script setup>
import router from "@/router/index.js";
 
let toPage = (name) => {
  router.push({ name });
};
</script>
 
<template>
  <div class="demo">
    demo
    <button @click="toPage('home')">goHome</button>
    <button @click="toPage('login')">goLogin</button>
  </div>
</template>
 
<style lang="scss" scoped></style>