import type { Plugin } from "vue";
import CssFilePlugin from "./css";
import router from "@/router";
import store from "@/store";
import { i18n } from "@/config";
import components from "./components";
export default {
  install(app) {
    app.use(store);
    app.use(router);
    app.use(i18n);
    app.use(CssFilePlugin);
    app.use(components);
  },
} as Plugin;
