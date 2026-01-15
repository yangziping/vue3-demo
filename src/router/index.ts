import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/counter',
    name: 'counter',
    component: () => import('../views/CounterView.vue'),
  },
  {
    path: '/indexPage',
    name: 'indexPage',
    component: () => import('../views/IndexPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Login.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
