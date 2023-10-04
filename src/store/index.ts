import { createPinia } from "pinia";
export { useConfigStore } from "./config";
export { useUserStore } from "./user";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(piniaPluginPersistedstate);
export default store;
