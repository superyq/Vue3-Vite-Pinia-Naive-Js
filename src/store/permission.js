import { defineStore } from "pinia";
import { h } from "vue";
import { RouterLink } from "vue-router";
// 接口获取路由 自己对接口
// import { getRouters } from "@/api/menu.js";
import SvgIcon from "@/components/SvgIcon.vue";
import { routerData } from "@/mock/datas.js";
 
const modules = import.meta.glob("../pages/*.vue");
 
//  icon 标签
let renderIcon = (name) => {
  return () => h(SvgIcon, { name }, null);
};
 
// 单个路由
let getRouterItem = (item) => {
  let { name, path, meta, component } = item;
  let obj = {
    path,
    name,
    meta,
    component: modules[`../pages/${component}`],
  };
  return obj;
};
 
// 获取异步路由
// 所有异步路由都是layout的子路由，并且routers只有一层children，没有考虑很复杂的情况。
// 将所有异步路由都存放在rmenu数组中，返回。
let getAayncRouter = (routers) => {
  let rmenu = [];
  routers.forEach((item) => {
    if (item.children && item.children.length) {
      item.children.map((_item) => {
        let obj = getRouterItem(_item);
        obj.meta.parentTitle = item.meta.title;
        rmenu.push(obj);
      });
    } else {
      rmenu.push(getRouterItem(item));
    }
  });
  return rmenu;
};
 
// 获取侧边栏导航
let getSiderMenu = (routers) => {
  let smenu = [];
 
  routers.forEach((item) => {
    let children = [];
    let obj = {};
 
    if (item.children && item.children.length) {
      // 二级 menu
      item.children.map((_item) => {
        if (!_item.hidden) {
          children.push({
            label: () =>
              h(
                RouterLink,
                { to: _item.path },
                { default: () => _item.meta.title }
              ),
            title: _item.meta.title,
            key: _item.name,
            icon: renderIcon(_item.meta.icon),
          });
        }
      });
 
      obj = {
        label: item.meta.title,
        title: item.meta.title,
        key: item.name,
        icon: renderIcon(item.meta.icon),
        children,
      };
    } else {
      // 一级 menu
      obj = {
        label: () =>
          h(RouterLink, { to: item.path }, { default: () => item.meta.title }),
        title: item.meta.title,
        key: item.name,
        icon: renderIcon(item.meta.icon),
      };
    }
 
    smenu.push(obj);
  });
  return smenu;
};
 
export const usePermissionStore = defineStore({
  id: "permissionStore",
  state: () => {
    return {
      siderMenu: [],
      activeMenuValue: "",
    };
  },
  actions: {
    getRouters() {
      return new Promise((resolve, reject) => {
        this.siderMenu = getSiderMenu(routerData);
        resolve(getAayncRouter(routerData));
        // getRouters()
        //   .then(({ data }) => {
        //     this.siderMenu = getSiderMenu(data);
        //     resolve(data);
        //   })
        //   .catch((err) => {
        //     reject(err);
        //   });
      });
    },
  },
});