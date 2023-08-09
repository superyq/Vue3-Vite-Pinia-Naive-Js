<script setup>
import { computed } from "vue";
import { NTag } from "naive-ui";
import { useTagStore } from "@/store/tag.js";
import { usePermissionStore } from "@/store/permission.js";
import router from "@/router/index.js";

let tagStore = useTagStore();
let permissionStore = usePermissionStore();

let tags = computed(() => {
  return tagStore.tags;
});

function handleClose(key) {
  tagStore.removeTag(key);

  if (permissionStore.activeMenuValue == key) {
    permissionStore.activeMenuValue = tags.value[tagStore.activeTagIndex].key;
    router.push(`/${permissionStore.activeMenuValue}`);
  }
}
function handleCheck(item) {
  let { key } = item;
  permissionStore.activeMenuValue = key;
  router.push(`/${key}`);
}
</script>

<template>
  <div class="layout-header__tag">
    <n-tag
      v-for="item in tags"
      :key="item.key"
      class="tag-item"
      :closable="item.key !== 'home'"
      :type="item.key == permissionStore.activeMenuValue ? 'success' : ''"
      size="small"
      @close="handleClose(item.key)"
      @click="handleCheck(item)"
      >{{ item.title }}</n-tag
    >
  </div>
</template>

<style lang="scss" scoped>
.layout-header__tag {
  padding-left: 10px;
  display: flex;
  align-items: center;
  height: 30px;
}
.tag-item {
  margin-right: 5px;
  cursor: pointer;
}
</style>
