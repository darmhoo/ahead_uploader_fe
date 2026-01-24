<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<template>
    <div class="px-5">
        <Button variant="link" :size="'lg'" @click="router.back()">
            <ArrowLeft class="w-10 h-10" /> Go Back

        </Button>
    </div>
</template>