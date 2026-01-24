<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Layout from '../layouts/Layout.vue';
import { getUploadRequestDetail } from '../lib/api';
import { useRoute } from 'vue-router';
import TableComponent from '../components/TableComponent.vue';
import BackButton from '../components/BackButton.vue';
import { toast } from 'vue3-toastify';

const route = useRoute();
const data = ref<Array<any>>([]);
const records = ref<Array<any>>([]);
const headers = ['account_id', 'transaction_id', 'account_no', 'amount', 'member_name', 'notes', 'payment_type', 'status', 'transaction_date'];

const loading = ref(true);

onMounted(async () => {
    try {
        console.log('Fetching details for requestId:', route.params.requestId);
        const res = await getUploadRequestDetail(route.params.requestId as string)
        data.value = res.data
        records.value = res.data.records || [];
        toast.success('Upload request details loaded successfully.');
        console.log('Upload Requests:', data.value)
    } catch (error) {
        toast.error('Failed to load upload request details.');
    } finally {
        loading.value = false
    }
})

</script>

<template>
    <div class="">
        <Layout>
            <div class="px-6">
                <BackButton />
                <h1 class="text-2xl font-bold mb-4">Upload Request Detail</h1>
                <!-- Detail content goes here -->
                <div>
                    Batch Detail
                </div>
                <div>
                    <div>
                        <div>
                            <TableComponent :caption="'Transactions'" :headers="headers" :data="records"
                                :has-export="true" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
</template>