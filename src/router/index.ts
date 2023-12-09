import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/views/home-page/HomePage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
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
    }
  ]
})

export default router
