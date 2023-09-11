import { createRouter, createWebHistory } from "vue-router";
import { initRoutes } from "./routes";
import { afterGuards, beforeGuards } from "./guards";

const router = createRouter({
  history: createWebHistory(),
  routes: initRoutes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0
    }
  }
})

router.beforeEach(beforeGuards)
router.afterEach(afterGuards)

export default router