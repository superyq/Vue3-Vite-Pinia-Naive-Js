import { defineStore } from "pinia";
import { login, logout, getInfo } from "@/api/login.js";
import { getToken, setToken, removeToken } from "@/utils/cookie.js";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => {
    return {
      token: getToken() || "",
      user: {},
      roles: [],
    };
  },
  getters: {
    ageAfter(state) {
      return state.user.age + 10;
    },
  },
  actions: {
    // 登录接口
    async login(data) {
      return new Promise((resolve, reject) => {
        // 前端测试登录，下面代码为静态登录，调试登录请自己删除。
        if (data.username == "admin" && data.password == "admin123") {
          let token = "123456";
          setToken(token);
          this.token = token;
          resolve(true);
        } else {
          reject(false);
        }

        // 调用后端接口，联调接口后自己取消注释
        // login(data)
        //   .then((res) => {
        //     if (res.code !== 200) {
        //       reject(res);
        //     }

        //     const { data } = res;
        //     // 保存token
        //     setToken(data.access_token);
        //     this.token = data.access_token;
        //     resolve(data);
        //   })
        //   .catch((err) => {
        //     reject(err);
        //   });
      });
    },
    // 退出接口
    async logout() {
      return new Promise((resolve, reject) => {
        // 前端测试，下面代码为静态登出，调试接口时请自己删除。
        removeToken();
        this.token = "";
        this.roles = [];
        resolve();

        // 调用后端接口，联调接口后自己取消注释
        // logout()
        //   .then((res) => {
        //     if (res.code !== 200) {
        //       reject(res);
        //     }
        //     this.roles = [];
        //     this.token = "";
        //     removeToken();
        //     resolve();
        //   })
        //   .catch((err) => {
        //     reject(err);
        //   });
      });
    },
    // 获取用户信息
    async getInfo() {
      return new Promise((resolve, reject) => {
        // 前端测试，下面代码为静态获取用户信息，调试登录请自己删除。
        this.roles = ["admin"];
        resolve();

        // 调用后端接口，联调接口后自己取消注释
        // getInfo()
        //   .then((data) => {
        //     if (data.code !== 200) {
        //       reject(data);
        //     }
            
        //     this.roles = data.roles;
        //     this.user = data;
        //     resolve(data);
        //   })
        //   .catch((err) => {
        //     reject(err);
        //   });
      });
    },
  },
});
