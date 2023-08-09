<script setup>
import MessageApi from "@/components/MessageApi.vue";
import {
  NMessageProvider,
  NDialogProvider,
  NConfigProvider,
  zhCN,
  dateZhCN,
} from "naive-ui";
</script>
 
<template>
  <!-- 如果你想使用信息，你需要把调用其方法的组件放在 n-message-provider 内部并且使用 useMessage 去获取 API。 -->
  <n-message-provider>
    <!-- 将 message API 通过 message-api 组件注入 window.$msg，之后在其他 SFC 可以直接使用 window.$msg -->
    <message-api></message-api>
  </n-message-provider>
 
  <!-- 如果你想使用对话框，你需要把调用其方法的组件放在 n-dialog-provider 内部并且使用 useDialog 去获取 API。 -->
  <n-dialog-provider>
    <!-- 将 n-config-provider 的 locale 设为从 naive-ui 导入的 zhCN 来设定全局中文。 -->
    <!-- 将 n-config-provider 的 date-locale 设为从 naive-ui 导入的 dateZhCN 来设定全局日期中文。 -->
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <router-view></router-view>
    </n-config-provider>
  </n-dialog-provider>
</template>
 
<style scoped></style>