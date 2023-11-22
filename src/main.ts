import { createApp } from "vue";
import App from "./App.vue";
import plugins from "./plugins";

if (import.meta.env.MODE === "production") {
  window.console.log = () => {};
  window.console.info = () => {};
  window.console.error = () => {};
  window.console.warn = () => {};
}

const app = createApp(App);
// 安装相应插件
app.use(plugins);
app.mount("#app");
