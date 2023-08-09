import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定缓存文件
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // 服务配置
  server: {
    // 是否开启https
    https: false,
    // 端口号
    port: 3000,
    // 监听所有地址
    host: "0.0.0.0",
    // 启服务自动打开浏览器
    open: false,
    // 允许跨域
    cors: true,
    proxy: {
      "/dev-api": {
        target: "http://xxx.x.xxx.xxx:8080",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
      "/dev/file": {
        target: "http://xxx.x.xxx.xxx:9300",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/dev/, ""),
      },
    },
  },
});
