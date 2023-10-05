import type { Plugin } from 'vue'
import ImgCutter from './index.vue'
export default {
  install(app) {
    app.component(ImgCutter.name, ImgCutter)
  }
} as Plugin