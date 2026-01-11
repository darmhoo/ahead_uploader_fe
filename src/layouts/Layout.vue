<template>
    <div class="flex">
        <!-- Sidebar -->
        <Sidebar />
        <div>
            <Header />
            <slot></slot>

        </div>
    </div>

</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue'
</script>