import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layout/BasicLayout.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/users/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'articles',
        name: 'articles',
        component: () => import('../views/articles/Index.vue'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  // 简单的权限控制示例
  if (to.meta.requiresAuth) {
    // 假设登录后会在 localStorage 存储 token 或 userInfo
    const isAuthenticated = localStorage.getItem('isLogin') === 'true'
    if (isAuthenticated) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
