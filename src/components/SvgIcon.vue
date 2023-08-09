<script setup>
import { computed } from 'vue'
 
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: String,
  color: String,
  width: String,
  height: String
})
 
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  let className = props.className ? `icon-${props.className}` : '';
  return ['svg-icon', className]
})
 
</script>
<template>
  <!-- aria-hidden: 让这个元素对浏览器隐藏 -->
  <svg :class="svgClass" :style="{ color, width, height }" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>
 
<style scoped>
.svg-icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
}
</style>