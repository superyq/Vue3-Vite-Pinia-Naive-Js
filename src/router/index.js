import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import baseRouters from "./baseRouter.js";
import { getToken } from "@/utils/cookie.js";
import { useUserStore } from "@/store/user.js";
import { usePermissionStore } from "@/store/permission.js";
 
const whiteList = ["/", "/login"];
 
const routes = [...baseRouters];
const _createRouter = () =>
  createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return {
        el: "#app",
        top: 0,
        behavior: "smooth",
      };
    },
  });
 
export function resetRouter() {
  const newRouter = _createRouter();
  router.matcher = newRouter.matcher;
}
 
const router = _createRouter();
 
// 路由监听
router.beforeEach((to, from, next) => {
  NProgress.start();
  let userStore = useUserStore();
  let permissionStore = usePermissionStore();
 
  // 判断是否登录
  if (!!getToken()) {
    // 已登录，跳转登录页，转跳首页
    if (to.path === "/login") {
      next("");
      NProgress.done();
    } else {
      if (userStore.roles.length === 0) {
        userStore
          .getInfo()
          .then((res) => {
            // 获取动态路由
            permissionStore.getRouters().then((_res) => {
              let resetRouters = {
                path: "/layout",
                name: "layout",
                component: () => import("@/pages/layout.vue"),
                children: _res,
              };
              router.addRoute(resetRouters);
 
              // 这句代码，重要！重要！重要！
              // 来确保addRoute()时动态添加的路由已经被完全加载上去。没有这句，动态路由加载后无效
              next({ ...to, replace: true });
            });
          })
          .catch((err) => {
            window.$msg.error(err);
            userStore.logout().then(() => {
              next({ name: "login" });
            });
          });
      } else {
        next();
      }
    }
    NProgress.done();
  } else {
    // 判断路由是否在白名单，是直接跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next();
      // 未登录页面跳转，直接跳转到登录页
    } else {
      next(`/login?redirect=${to.fullPath}`);
    }
    NProgress.done();
  }
});
 
export default router;