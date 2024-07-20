import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home-page/HomePage.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/account-page/AccountPage.vue')
    },
    {
      path: '/breakfast',
      name: 'breakfast',
      component: () => import('../views/breakfast/Breakfast.vue')
    },
    {
      path: '/podium',
      name: 'podium',
      component: () => import('../views/podium/Podium.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
  ]
})

export default router
