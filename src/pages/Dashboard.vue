<script setup lang="ts">
import StatsCard from '../components/StatsCard.vue';
import Layout from '../layouts/Layout.vue';

</script>

<template>
    <div>
        <Layout>
            <div class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard />
                <StatsCard />
                <StatsCard />
                <StatsCard />
                <StatsCard />
                <StatsCard />

            </div>
        </Layout>
    </div>
</template>