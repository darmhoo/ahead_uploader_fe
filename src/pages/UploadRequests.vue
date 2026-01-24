<template>
    <div>
        <Layout>
            <div v-if="loading" class="p-8">Loading...</div>
            <div v-else class="p-8">

                <h3 class="text-2xl font-bold mb-4">Upload Requests</h3>
                <Dialog v-if="!isAdmin" class="float-right">
                    <DialogTrigger as-child>
                        <Button variant="default" class="mb-4 float-right">
                            <Plus class="w-4 h-4 mr-2" />
                            New Upload Request
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <!-- Content for the dialog goes here -->
                        <h2 class="text-xl font-bold mb-4">Create New Upload Request</h2>
                        <FormComponent :fields="[
                            { name: 'request_name', label: 'Request Name', type: 'text' },
                            { name: 'notes', label: 'Notes', type: 'text' },
                            {
                                name: 'batch_type',
                                label: 'Type',
                                type: 'select',
                                options: [
                                    { label: 'Savings', value: 'savings' },
                                    { label: 'Loans', value: 'loans' },
                                    { label: 'Journal', value: 'journal' },
                                    { label: 'Post-No-Debit', value: 'post-no-debit' }
                                ]
                            },
                            { name: 'file', label: 'File', type: 'file' }
                        ]" :initial-values="{
                            request_name: '',
                            notes: '',
                            type: '',
                            file: null
                        }" @submit="submitRequest" />
                    </DialogContent>
                </Dialog>

                <div>
                    <div>
                        <TableComponent :caption="'Upload Requests'" :headers="headers" :data="data" :show-action="true"
                            :actions="actions" @confirm-action="performAction" />
                    </div>
                </div>

            </div>
        </Layout>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Layout from '../layouts/Layout.vue';
import { Button } from '../components/ui/button';
import { Check, Eye, Plus, X } from 'lucide-vue-next';
import TableComponent from '../components/TableComponent.vue';
import Dialog from '../components/ui/dialog/Dialog.vue';
import DialogTrigger from '../components/ui/dialog/DialogTrigger.vue';
import DialogContent from '../components/ui/dialog/DialogContent.vue';
import FormComponent from '../components/FormComponent.vue';
import { approveRequest, createUploadRequest, getUploadRequests, rejectRequest } from '../lib/api';
import router from '../routes';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '../store/auth.store';
import { storeToRefs } from 'pinia';

const data = ref<Array<any>>([]);

const loading = ref(true);

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const isAdmin = computed(() => Number(user.value?.is_admin) === 1);

const headers = ['batch_type', 'request_name', 'notes', 'status', 'total_records', 'total_successful_records', 'total_failed_records', 'uploader', 'uploaded_at'];

const actions = computed(() => [
    {
        icon: Eye,
        handler: (row: any) => {
            router.push({
                name: 'UploadRequestDetail',
                params: { requestId: row.id },
            })
        },
        name: 'View',
        variant: 'default',
        visible: () => true

    },
    {
        icon: Check,
        class: 'text-black-600 cursor-pointer',
        handler: (row: any) => {
            console.log('Approve action clicked for row:', row)
        },
        name: 'Approve',
        variant: 'success',
        meta: {
            title: "Approve File",
            message: "Are you sure you want to approve this request",
            confirmText: "Approve"
        },
        visible: (row: any) => row.status === 'awaiting_approval' && isAdmin.value


    },
    {
        icon: X,
        class: 'text-white-600 cursor-pointer',
        handler: (row: any) => {
            console.log('Reject action clicked for row:', row)
        },
        name: 'Reject',
        variant: 'destructive',
        meta: {
            title: "Reject File",
            message: "Are you sure you want to decline this request",
            confirmText: "Reject"
        },
        visible: (row: any) => row.status === 'awaiting_approval' && isAdmin.value

    },
]);




onMounted(async () => {
    await fetchData(1);
})

const fetchData = async (page: number) => {
    loading.value = true;
    try {
        const res = await getUploadRequests(page);
        data.value = res.data;
        console.log(`Upload Requests for page ${page}:`, data.value);
        toast.success(`Upload requests for page ${page} loaded successfully.`);
    } catch (error) {
        toast.error('Failed to load upload requests.');
    } finally {
        loading.value = false;
    }
};

const submitRequest = async (formData: any) => {
    console.log('Form submitted with data:', formData);
    try {
        const payload = new FormData();
        payload.append('request_name', formData.request_name);
        payload.append('notes', formData.notes);
        payload.append('batch_type', formData.batch_type);
        payload.append('file', formData.file);

        const res = await createUploadRequest(payload);
        console.log('Upload request created:', res);
        toast.success('Upload request submitted successfully.');
        fetchData(1); // Refresh data after submission

    }
    catch (error) {
        toast.error('Failed to submit upload request.');
        console.error('Error submitting upload request:', error);
    }

};

const performAction = async (data: any) => {
    const { action, row } = data;
    if (action.name === 'Approve') {
        console.log('Performing approve action for row:', row);
        try {
            await approveRequest(row.id);
            toast.success(`Upload request ${row.request_name} approved.`);
            fetchData(1); // Refresh data after action

        } catch (error) {
            toast.error(`Failed to approve upload request ${row.request_name}.`);
            console.error('Error approving upload request:', error);
        }
    } else if (action.name === 'Reject') {
        console.log('Performing reject action for row:', row);
        try {
            await rejectRequest(row.id);
            toast.success(`Upload request ${row.request_name} rejected.`);
            fetchData(1); // Refresh data after action

        } catch (error) {
            toast.error(`Failed to reject upload request ${row.request_name}.`);
            console.error('Error rejecting upload request:', error);
        }
    }

}
</script>