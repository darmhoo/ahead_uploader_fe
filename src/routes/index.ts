import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Import your views/components
import Index from '../pages/Index.vue'
import { useAuthStore } from '../store/auth.store'
import { toast } from 'vue3-toastify'

// Define the expected user type for type safety
type AuthUser = {
    is_admin: number
    // add other user properties as needed
}

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
        path: '/upload-requests',
        name: 'UploadRequests',
        component: () => import('../pages/UploadRequests.vue'),
        meta: { requiresAuth: true }

    },
    {
        path: '/upload-requests/:requestId',
        name: 'UploadRequestDetail',
        component: () => import('../pages/UploadRequestDetail.vue'),
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account-transactions',
        name: 'AccountTransactions',
        component: () => import('../pages/AccountTransactions.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/journal-transactions',
        name: 'JournalTransactions',
        component: () => import('../pages/JournalTransactions.vue'),
        meta: { requiresAuth: true }

    },
    {
        path: '/audit-reports',
        name: 'AuditReports',
        component: () => import('../pages/AuditReports.vue'),
        meta: { requiresAdmin: true, requiresAuth: true }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../pages/Settings.vue'),
        meta: { requiresAdmin: true, requiresAuth: true }
    }


    // Add more routes as needed
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()
    // Cast user to AuthUser or undefined for type safety
    const user = auth.user as unknown as AuthUser | undefined

    if (to.meta.requiresAuth && !user) {
        toast.error('Please log in to access this page.')
        return next({ name: 'login' })
    }

    if (to.meta.requiresAdmin && user?.is_admin !== 1) {
        console.log('Access denied: Admins only', user?.is_admin)
        toast.error('You do not have permission to access this page.')
        return next({ name: 'Dashboard' })
    }

    next()
})


export default router