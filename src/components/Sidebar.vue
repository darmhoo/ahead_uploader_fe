<template>
    <div>
        <aside class="w-64 h-screen bg-gray-800 text-white p-4">
            <img src="../assets/ahead.png" alt="Logo" class="mb-6 w-32 h-auto" />
            <h2 class="text-2xl font-bold mb-6">Uploader</h2>
            <nav>
                <ul>
                    <li class="mb-4" v-for="route in routes">
                        <a :href="route.path" class="hover:underline flex items-center" active-class="font-bold">
                            <component :is="route.icon" class="w-5 h-5 mr-2" v-if="route.icon" />
                            {{ route.name }}
                        </a>
                    </li>

                </ul>
            </nav>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { LayoutDashboardIcon, Settings2Icon, Upload, UserRound } from 'lucide-vue-next';

const routes = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboardIcon },
    { name: 'Settings', path: '/settings', icon: Settings2Icon },
    { name: 'Profile', path: '/profile', icon: UserRound },
    { name: 'Upload Requests', path: '/upload-requests', icon: Upload },
];
</script>