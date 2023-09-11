import { createApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'

const app = createApp(App)
// 安装相应插件
app.use(plugins)
app.mount('#app')
