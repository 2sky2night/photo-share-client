import { createPinia } from "pinia";
export { useConfigStore } from './config'
export { useUserStore } from './user'

const store = createPinia()
export default store