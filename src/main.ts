import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'

async function bootstrap() {
  const app = createApp(App)
  // 加载路由
  setupRouter(app)
  await router.isReady()
  app.mount('#app')
}

bootstrap()
