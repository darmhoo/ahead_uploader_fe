<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StatsCard from '../components/StatsCard.vue'
import Layout from '../layouts/Layout.vue'
import { getDashboardStats } from '../lib/api'
import { BanknoteArrowDown, BanknoteArrowUp, CircleX, LaptopMinimalCheck, LibraryBig, NotebookPen, PercentDiamond, SquircleDashed } from 'lucide-vue-next'

const stats = ref<any>(null)
const loading = ref(true)
const iconMap: Record<string, any> = {
    totalBatches: PercentDiamond,
    totalRecords: LibraryBig,
    successfulRecords: LaptopMinimalCheck,
    failedRecords: CircleX,
    pendingRecords: SquircleDashed,
    noOfJournals: NotebookPen,
    noOfDeposits: BanknoteArrowUp,
    noOfWithdrawals: BanknoteArrowDown,    // Map your stat keys to Lucide icons if needed
}

onMounted(async () => {
    try {
        const res = await getDashboardStats()
        stats.value = res.data.stats
        console.log('Dashboard Stats:', stats.value)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <Layout>
        <div v-if="loading" class="p-8">Loading...</div>

        <div v-else class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <StatsCard v-for="(item, key) in stats" :key="key" :data="item" :label="String(key)" :icon="iconMap[key]" />
        </div>
    </Layout>
</template>
