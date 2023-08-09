export const routerData = [
  {
    name: "home",
    path: "/home",
    hidden: false,
    component: "home.vue",
    meta: {
      title: "首页",
      icon: "home",
    },
    children: null,
  },
  {
    name: "system",
    path: "/system",
    hidden: false,
    component: null,
    meta: {
      title: "系统管理",
      icon: "system",
    },
    children: [
      {
        name: "system-menu",
        path: "/system-menu",
        hidden: false,
        component: "system-menu.vue",
        meta: {
          title: "系统菜单",
          icon: "system-menu",
        },
        children: null,
      },
      {
        name: "system-dict",
        path: "/system-dict",
        hidden: false,
        component: "system-dict.vue",
        meta: {
          title: "系统字典",
          icon: "system-dict",
        },
        children: null,
      },
    ],
  },
  {
    name: "user",
    path: "/user",
    hidden: false,
    component: null,
    meta: {
      title: "用户管理",
      icon: "user",
    },
    children: [
      {
        name: "user-user",
        path: "/user-user",
        hidden: false,
        component: "user-user.vue",
        meta: {
          title: "用户管理",
          icon: "user-user",
        },
        children: null,
      },
      {
        name: "user-role",
        path: "/user-role",
        hidden: false,
        component: "user-role.vue",
        meta: {
          title: "角色管理",
          icon: "user-role",
        },
        children: null,
      },
    ],
  },
];