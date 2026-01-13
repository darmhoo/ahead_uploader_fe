<template>
    <div>
        <Layout>
            <div>
                <h3 class="text-2xl font-bold mb-4">Upload Requests</h3>
                <p>This is the Upload Requests page.</p>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button variant="default" class="mb-4">
                            <Plus class="w-4 h-4 mr-2" />
                            New Upload Request
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <!-- Content for the dialog goes here -->
                        <h2 class="text-xl font-bold mb-4">Create New Upload Request</h2>
                        <FormComponent :fields="['Name', 'Title', 'Date']" />
                    </DialogContent>
                </Dialog>

                <div>
                    <div>
                        <TableComponent :caption="'Upload Requests'" :headers="['SN', 'Name', 'Title', 'Date']" />
                    </div>

                    <!-- Placeholder for future upload requests list -->
                    <p class="mt-6 text-gray-600">No upload requests available.</p>
                </div>

            </div>
        </Layout>
    </div>
</template>
<script setup lang="ts">
import Layout from '../layouts/Layout.vue';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-vue-next';
import TableComponent from '../components/TableComponent.vue';
import Dialog from '../components/ui/dialog/Dialog.vue';
import DialogTrigger from '../components/ui/dialog/DialogTrigger.vue';
import DialogContent from '../components/ui/dialog/DialogContent.vue';
</script>