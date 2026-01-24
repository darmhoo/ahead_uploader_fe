<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Layout from '../layouts/Layout.vue';
import { getJournalTransactions } from '../lib/api';
import TableComponent from '../components/TableComponent.vue';

const data = ref<Array<any>>([]);
const loading = ref(true);
const headers = ['account_id', 'transaction_id', 'account_no', 'amount', 'member_name', 'notes', 'payment_type', 'status', 'transaction_date'];



onMounted(async () => {
    try {
        const res = await getJournalTransactions()
        data.value = res.data
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
                <h1 class="text-2xl font-bold mb-4">Journal Transactions</h1>
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