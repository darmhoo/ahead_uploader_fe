import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Import your views/components
import Index from '../pages/Index.vue'
import { useAuthStore } from '../store/auth.store'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard.vue')
    }


    // Add more routes as needed
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/', '/dashboard']
    const authRequired = !publicPages.includes(to.path)
    const auth = useAuthStore()
    if (authRequired && !auth.user) {
        return next('/login')
    }
    next()
})

export default router