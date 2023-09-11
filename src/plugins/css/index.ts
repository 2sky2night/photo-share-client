import type { Plugin } from "vue";
import '@/styles/index.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
// nprogress
import 'nprogress/nprogress.css'

const CssFilePlugin: Plugin = {
  install(app) {}
}

export default CssFilePlugin