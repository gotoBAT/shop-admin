import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import '@/styles/index.scss'
import setupPlugins from '@/plugins'
async function bootstrap() {
  const app = createApp(App)
  // 加载路由
  setupRouter(app)
  // 加载vuex
  setupStore(app)
  // 加载插件
  setupPlugins(app)
  await router.isReady()
  app.mount('#app')
}

bootstrap()
