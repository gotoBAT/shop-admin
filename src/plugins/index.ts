import { App } from 'vue'
import setupElementPlus from './elementplus'
export default function setupPlugins(app: App) {
  // 注册 ElementPlus
  setupElementPlus(app)
}
