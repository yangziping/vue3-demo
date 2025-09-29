import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView,
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
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
