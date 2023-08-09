<script setup>
const props = defineProps({
  color: {
    type: String,
  },
});
</script>
 
<template>
  <p :style="{ color }">
    版权所有 © YLD科技有限公司，保留所有权利，川F3-20233308号
  </p>
</template>
 
<style lang="scss" scoped>
p {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>