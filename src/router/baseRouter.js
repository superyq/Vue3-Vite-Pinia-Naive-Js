export default [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
  },
  // 所有未知页面都是404
  {
    path: '/:catchAll(.*)',
    component: () => import("@/pages/404.vue")
  },
  {
    component: () => import("@/pages/layout.vue"),
    children: [
      {
        path: '/userinfo',
        name: 'userinfo',
        meta: {
          title: '个人信息'
        },
        component: () => import("@/pages/userinfo.vue")
      },
      {
        path: '/editpassword',
        name: 'editpassword',
        meta: {
          title: '修改密码'
        },
        component: () => import("@/pages/editpassword.vue")
      },
    ],
  }
];
