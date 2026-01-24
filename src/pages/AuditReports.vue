<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Layout from '../layouts/Layout.vue';
import { getAuditReports } from '../lib/api';
import TableComponent from '../components/TableComponent.vue';

const data = ref<Array<any>>([]);
const loading = ref(true);
const headers = ['action', 'description', 'ip_address', 'module', 'new_values', 'old_values', 'user.name', 'created_at'];



onMounted(async () => {
    try {
        const res = await getAuditReports()
        data.value = res.data.audits
        console.log('Account Transactions:', data.value)
    } finally {
        loading.value = false
    }
})

</script>

<template>
    <div class="">
        <Layout>
            <div>
                <h1 class="text-2xl font-bold mb-4">Audit Reports</h1>
                <!-- Detail content goes here -->
                <div>
                    <div>
                        <div>
                            <TableComponent :caption="'Transactions'" :headers="headers" :data="data"
                                :has-export="true" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
</template>