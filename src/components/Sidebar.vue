<template>
    <aside class="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
        <img src="../assets/ahead.png" alt="Logo" class="mb-6 w-32 h-auto" />
        <h2 class="text-2xl font-bold mb-6">Uploader</h2>

        <nav class="flex flex-col justify-between all flex-1">
            <ul>
                <template v-for="route in routes" :key="route.path">
                    <li v-if="canViewRoute(route)" class="mb-4">
                        <RouterLink :to="route.path" class="flex items-center gap-2 text-gray-300 hover:text-white"
                            active-class="font-bold text-blue-400 bg-gray-700 p-2 rounded">
                            <component :is="route.icon" class="w-5 h-5" />
                            <span>{{ route.name }}</span>
                        </RouterLink>
                    </li>
                </template>
            </ul>
            <ul>
                <li>
                    <button @click="logout"
                        class="flex items-center gap-2 p-2 rounded w-full text-gray-300 hover:text-white hover:bg-gray-700">
                        <log-out class="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </li>

            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
    BadgeDollarSign,
    LayoutDashboardIcon,
    LogOut,
    NotepadTextDashed,
    Settings2Icon,
    ShieldBan,
    Upload,
} from 'lucide-vue-next'
import { useAuthStore } from '../store/auth.store'

const routes = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboardIcon },
    { name: 'Upload Requests', path: '/upload-requests', icon: Upload },
    { name: 'Account Transactions', path: '/account-transactions', icon: BadgeDollarSign },
    { name: 'Journal Transactions', path: '/journal-transactions', icon: NotepadTextDashed },
    { name: 'Audit Reports', path: '/audit-reports', icon: ShieldBan, roles: ['admin'] },
    { name: 'Settings', path: '/settings', icon: Settings2Icon, roles: ['admin'] },
]

type User = {
    is_admin?: boolean
    // add other user properties as needed
}
const auth = useAuthStore() as { user: User | null | undefined; logout: () => Promise<void> }

const logout = () => {
    auth.logout()
}
const canViewRoute = (route: any) => {
  if (!route.roles) return true
  return route.roles.includes('admin') && auth.user?.is_admin
}

</script>
