<template>
    <div class="px-8">
        Welcome, <b>{{ user ? user.name : '' }}</b>!
    </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '../store/auth.store';
import type { User } from '../types';
const user: User | null = useAuthStore().user;
console.log('Header user:', user);
</script>