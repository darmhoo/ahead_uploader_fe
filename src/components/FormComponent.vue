<template>
    <div>
        <VeeForm>
            <div v-for="(field, index) in props.fields" :key="index" class="mb-4">
                <label :for="field" class="block text-sm font-medium text-gray-700 mb-1">{{ field }}</label>
                <VeeField :name="field" :id="field" class="w-full border border-gray-300 rounded-md p-2" />
                <VeeErrorMessage :name="field" class="text-red-500 text-sm mt-1" />
            </div>
        </VeeForm>

    </div>
</template>
<script lang="ts" setup>
import { Field as VeeField, Form as VeeForm, ErrorMessage as VeeErrorMessage } from 'vee-validate';
import type { FormContext } from 'vee-validate';
import { computed } from 'vue';
const props = defineProps<{
    // Define your props here
    fields: Array<string>,
    values: Record<string, any>[]
}>();
</script>