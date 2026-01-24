<template>
    <div class="fixed inset-0 w-screen h-screen bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999]">
        <div class="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'GlobalLoader',
});
</script>
