import axios from "axios";
import errorCode from "@/utils/errorCode.js";
import { getToken } from "@/utils/cookie.js";
import { tansParams } from "@/utils/common.js";
import { useUserStore } from "@/store/user.js";
 
// 请求和响应的消息主体用什么方式编码
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
});
 
// 请求拦截器
service.interceptors.request.use((config) => {
  // 是否需要 token
  const isToken = (config.headers || {}).isToken === true;
  if (getToken() && !isToken) {
    // 让请求携带token
    config.headers["Authorization"] = "Bearer " + getToken();
  }
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?" + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config;
});
 
// 响应拦截器
service.interceptors.response.use((res) => {
  let userStore = useUserStore();
  // 未设置返回码默认200
  let code = res.data.code || 200;
  // 获取错误信息
  let msg = errorCode[code] || res.data.msg || errorCode["default"];
  // 二进制数据直接返回
  if (
    res.request.responseType === "blob" ||
    res.request.responseType === "arraybuffer"
  ) {
    return res.data;
  }
  if (code === 401) {
    window.$msg.info("登录状态已过期,请重新登录");
    userStore.logout().then(() => {
      window.location.href = "/home";
    });
  }
  if (code !== 200) {
    window.$msg.error(msg);
  }
  return res.data;
});
 
export default service;