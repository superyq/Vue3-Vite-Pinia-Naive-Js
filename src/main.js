import { createApp } from "vue";
import App from "./App.vue";
 
// 共用样式
import "@/assets/style/index.scss";
// 路由
import router from "@/router/index.js";
// store 状态管理
import { createPinia } from "pinia";

// svg 组件
import SvgIcon from "@/components/SvgIcon.vue";
import "virtual:svg-icons-register";
 
createApp(App).use(createPinia()).component("svg-icon", SvgIcon).use(router).mount("#app");