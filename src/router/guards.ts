import { nprogress } from "@/utils";
import { i18n } from "@/config";
import type { NavigationHookAfter, NavigationGuard } from "vue-router";

export const beforeGuards: NavigationGuard = (_to, _from, next) => {
  nprogress.start();
  next();
};

export const afterGuards: NavigationHookAfter = (to) => {
  nprogress.end();
  to.meta?.title
    ? (document.title = `${i18n.global.t(to.meta.title)} | Photo Share`)
    : (document.title = "Photo Share");
};
