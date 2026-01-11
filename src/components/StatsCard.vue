<script setup lang="ts">
import Card from './ui/card/Card.vue';

</script>

<template>
    <Card>
        <div class="flex flex-col items-center w-full px-4">
            <h2 class="text-2xl font-bold">Statistics</h2>
            <p class="text-gray-600">Here are some important stats:</p>
            <ul class="mt-4 space-y-2">
                <li>Total Users: 1,234</li>
                <li>Active Sessions: 567</li>
                <li>Conversion Rate: 4.5%</li>
            </ul>
        </div>
    </Card>
</template>