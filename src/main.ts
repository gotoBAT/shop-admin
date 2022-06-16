import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import '@/styles/index.scss'
async function bootstrap() {
  const app = createApp(App)
  // 加载路由
  setupRouter(app)
  // 加载vuex
  setupStore(app)
  await router.isReady()
  app.mount('#app')
}

bootstrap()
