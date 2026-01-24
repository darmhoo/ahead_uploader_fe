<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Layout from '../layouts/Layout.vue';
import { getAccountTransactions } from '../lib/api';
import TableComponent from '../components/TableComponent.vue';
import { toast } from 'vue3-toastify';


const data = ref<Array<any>>([]);
const loading = ref(true);
const headers = ['account_id', 'transaction_id', 'account_no', 'amount', 'member_name', 'notes', 'payment_type', 'status', 'transaction_date'];


const fetchData = async (page: number) => {
    loading.value = true;
    try {
        const res = await getAccountTransactions(page);
        data.value = res.data;
        console.log(`Account Transactions for page ${page}:`, data.value);
        toast.success(`Account transactions for page ${page} loaded successfully.`);
    } catch (error) {
        toast.error('Failed to load account transactions.');
    } finally {
        loading.value = false;
    }
};

const filters = ref([
    {
        type: 'text', // FieldConfig expects 'text' for search
        label: 'A',
        name: 'search',
        value: '',
        placeholder: 'Search transactions...'
    },
    {
        type: 'select',
        label: 'Status',
        name: 'status',
        value: '',
        options: [
            { label: 'All', value: '' },
            { label: 'Pending', value: 'pending' },
            { label: 'Completed', value: 'completed' },
            { label: 'Failed', value: 'failed' },
        ]
    },
    {
        type: 'dateRange', // FieldConfig expects 'dateRange' for date range
        label: 'Transaction Date',
        name: 'transaction_date',
        value: { from: '', to: '' }
    }
]);

onMounted(() => {
    fetchData(1);
});

</script>

<template>
    <div class="">
        <Layout>
            <div class="px-6">
                <h1 class="text-2xl font-bold mb-4">Account Transactions</h1>
                <!-- Detail content goes here -->
                <div>
                    <div>
                        <div>
                            <TableComponent :caption="'Transactions'" :headers="headers" :data="data"
                                @page-change="fetchData" :has-export="true" :filters="filters" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
</template>