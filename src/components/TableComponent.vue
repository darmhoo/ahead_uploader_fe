<script setup lang="ts">
// @ts-ignore
import Pagination from './Pagination.vue';
import Table from './ui/table/Table.vue';
import TableBody from './ui/table/TableBody.vue';
import TableCaption from './ui/table/TableCaption.vue';
import TableCell from './ui/table/TableCell.vue';
import TableHead from './ui/table/TableHead.vue';
import TableHeader from './ui/table/TableHeader.vue';
import TableRow from './ui/table/TableRow.vue';

import { ref } from 'vue';

const props = defineProps<{
    caption?: string,
    headers?: string[],
    data?: Record<string, any>[]


}>();

const currentPage = ref(1);

</script>

<template>
    <Table>
        <TableCaption>{{ props.caption }}</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead v-for="value in props.headers" :key="value">{{ value }}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="value in props.data" :key="value.id">
                <TableCell v-for="(cell, index) in value" :key="index">{{ cell }}</TableCell>
            </TableRow>
        </TableBody>
        <Pagination :totalItems="props.data?.length ?? 0" :itemsPerPage="10" v-model="currentPage" />
    </Table>
</template>