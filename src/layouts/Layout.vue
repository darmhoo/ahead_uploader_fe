<template>
    <div class="flex">
        <!-- Sidebar -->
        <Sidebar />
        <div class="flex-1 flex flex-col min-h-screen bg-background text-foreground p-4 rounded-lg shadow-lg">
            <Header />
            <slot></slot>

        </div>
    </div>

</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue'
</script>