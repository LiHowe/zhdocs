import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/flowchart',
      name: 'FlowChart',
      component: () => import('../views/FlowChart/index.vue')
    },
    {
      path: '/mindflow',
      name: 'MindFlow',
      component: () => import('../views/MindFlow/index.vue')
    }
  ]
})

export default router
