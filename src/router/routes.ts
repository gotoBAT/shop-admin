import { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import productRoutes from './modules/product'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      productRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

export default routes
