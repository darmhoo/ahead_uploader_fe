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
import type { FieldConfig, PaginatedResponse, TableAction } from "../types/index";

import { ref, watch } from 'vue';
import { displayCell, formatLabel, STATUS_BADGES } from '../lib/utils';
import Button from './ui/button/Button.vue';

const props = defineProps<{
    caption?: string,
    headers?: string[],
    data?: PaginatedResponse<any> | any[],
    showAction?: boolean,
    actions?: Array<TableAction>,
    hasExport?: boolean,
    statuses?: Record<string, string>[]
    filters?: FieldConfig[]
}>();

import { computed } from 'vue';
import Dialog from './ui/dialog/Dialog.vue';
import DialogContent from './ui/dialog/DialogContent.vue';
import DialogHeader from './ui/dialog/DialogHeader.vue';
import DialogTitle from './ui/dialog/DialogTitle.vue';
import DialogDescription from './ui/dialog/DialogDescription.vue';
import TableFilters from './TableFilters.vue';
//ts-ignore
import ConfirmAction from './ConfirmAction.vue';


const emit = defineEmits(['page-change', 'confirm-action']);

const rows = computed(() => {
    const raw = Array.isArray(props.data)
        ? props.data
        : props.data?.data ?? [];


    return raw;
});

const selectedAction = ref()
const selectedRow = ref()


const paginationData = computed(() => {
    const data = props.data;
    if (Array.isArray(data)) {
        return {
            total: data.length,
            per_page: 10,
            current_page: 1,
            last_page: 1,
            from: 0,
        };
    }
    return {
        total: data?.total ?? 0,
        per_page: data?.per_page ?? 10,
        current_page: data?.current_page ?? 1,
        last_page: data?.last_page ?? 1,
        from: data?.from ?? 0,
    };
})


const openRow = ref<Record<string | number, boolean>>({});

const errorDialogOpen = ref(false);
const errorMessage = ref('');
const showErrorDialog = (message: string) => {
    errorMessage.value = message ?? 'No error details available.';
    errorDialogOpen.value = true;
}

const showConfirm = ref(false)

const getCell = (row: any, header: string): any => {
    return displayCell(row, header, STATUS_BADGES)
}

function fetchData(page: number) {
    console.log('Page change requested:', page);
    emit('page-change', page);
}

const doStuff = (action: any, value: string) => {
    if (action.name === 'Approve' || action.name === 'Reject') {
        selectedAction.value = action;
        selectedRow.value = value;
        showConfirm.value = true;
        return action.handler(value)
    } else {
        return action.handler(value)
    }


}

const confirmAction = (action: any, row: any) => {
    emit('confirm-action', {
        action, row
    })
}

const rowActions = (row: any) => {
    return (props.actions || []).filter((action: any) => {
        return !action.visible || action.visible(row)
    })
}

// Add _open property to each row for action dropdown state
watch(
    () => props.data,
    (newData) => {
        const rows = Array.isArray(newData) ? newData : newData?.data ?? [];
        openRow.value = {};
        rows.forEach(row => {
            openRow.value[row.id] = false;
        });
    },
    { immediate: true }
);

</script>

<template>
    <div v-if="Array.isArray(props.data) ? props.data.length > 0 : (props.data?.data?.length ?? 0) > 0" class="h-full">
        <div v-if="props.hasExport" class="float-right">
            <Button variant="outline" class="mb-2">
                Export
            </Button>
        </div>
        <div>
            <TableFilters v-if="props.filters" :fields="props.filters" />
        </div>
        <Table>

            <TableCaption>{{ caption }}</TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead style="width: 40px; min-width: 40px; max-width: 40px; text-align: center;">S/N
                    </TableHead>
                    <TableHead v-for="value in props.headers" :key="value">{{ formatLabel(value) }}</TableHead>
                    <TableHead v-if="props.showAction && props.actions?.length">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(value, index) in rows" :key="value.id" @mouseenter="openRow[value.id] = false">
                    <TableCell style="width: 40px; min-width: 40px; max-width: 40px; text-align: center;">
                        {{ paginationData.from + index }}
                    </TableCell>
                    <TableCell v-for="header in props.headers" :key="header">
                        <template v-if="typeof getCell(value, header) === 'object'">
                            <span :class="getCell(value, header).class" @click="
                                getCell(value, header).clickable &&
                                showErrorDialog(getCell(value, header).message)
                                ">
                                {{ getCell(value, header).text }}
                            </span>
                        </template>

                        <template v-else>
                            {{ getCell(value, header) }}
                        </template>
                    </TableCell>



                    <TableCell v-if="props.showAction && props.actions?.length" class="flex gap-1">
                        <Button v-for="action in rowActions(value)" :key="`${value.id}-${action.name}`"
                            :variant="(action.variant as 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined) || 'default'"
                            size="sm" @click="doStuff(action, value)">
                            <component v-if="action.icon" :is="action.icon" :class="action.class" />
                            <span v-else>{{ action.name }}</span>
                        </Button>
                    </TableCell>


                </TableRow>
            </TableBody>
            <Pagination :pagination="paginationData" @page-change="fetchData" />
        </Table>
        <Dialog v-model:open="errorDialogOpen">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle class="text-red-600">Transaction Error</DialogTitle>
                    <DialogDescription>
                        {{ errorMessage || 'No error details available.' }}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

        <ConfirmAction v-model="showConfirm" :title="selectedAction?.meta?.title"
            :message="selectedAction?.meta?.message" :confirmText="selectedAction?.meta?.confirmText"
            @confirm="confirmAction(selectedAction, selectedRow)" />

    </div>
    <div v-else class="p-4 text-center text-gray-600">
        No data available.
    </div>

</template>