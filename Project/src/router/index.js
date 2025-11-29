import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/training',
    name: 'Training',
    component: () => import('@/views/TrainingView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth) {
    // When auth is required, ensure the current session is valid
    if (!authStore.isAuthenticated) {
      // Attempt to restore auth state from local storage
      const isValid = await authStore.checkAuth()
      
      if (!isValid) {
        // Redirect to the home page if validation fails
        next('/')
        return
      }
    }
  }
  
  next()
})

export default router
