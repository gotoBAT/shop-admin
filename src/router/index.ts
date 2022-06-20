import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { store } from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  history: createWebHistory(),
  routes
})
export function setupRouter(app: App) {
  app.use(router)
}
router.beforeEach((to, from) => {
  nprogress.start()
  if (to.meta.requiresAuth && !store.state.user) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})
router.afterEach(() => {
  nprogress.done()
})
export default router
