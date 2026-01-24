<script setup lang="ts">
import { formatLabel } from '../lib/utils';
import Card from './ui/card/Card.vue';
import type { LucideIcon } from 'lucide-vue-next';

const props = defineProps<{
    data: string | number;
    label: string;
    icon?: LucideIcon;
}>();

</script>

<template>
    <Card>
        <div class="flex flex-row items-center w-full px-4 py-3 justify-between">
            <div>
                <div class="text-sm text-gray-500 mb-1">
                    {{ formatLabel(label) }}
                </div>
                <div class="text-xl font-bold">
                    {{ data }}
                </div>
            </div>

            <component v-if="icon" :is="icon" class="w-10 h-10 text-gray-400" />
        </div>
    </Card>
</template>