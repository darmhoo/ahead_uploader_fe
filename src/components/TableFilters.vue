<template>
    <div>
        <VeeForm :validation-schema="schema" @submit="values => emit('submit', values)"
            :initial-values="props.initialValues">
            <div class="flex w-full gap-3">
                <div v-for="field in props.fields" :key="field.name" class="mb-4 w-full">
                    <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-1">{{ field.label
                        }}</label>
                    <div v-if="field.type === 'select'">
                        <VeeField as="select" :name="field.name" :id="field.name"
                            class="border border-gray-300 rounded-md p-2 w-full">
                            <option v-for="option in field.options" :key="option.value" :value="option.value">{{
                                option.label }}</option>
                        </VeeField>
                    </div>
                    <div v-else-if="field.type === 'file'">
                        <VeeField type="file" :name="field.name" :id="field.name"
                            class="border border-gray-300 rounded-md p-2 w-full" />
                    </div>
                    <div v-else>
                        <VeeField type="text" :name="field.name" :id="field.name"
                            class="border border-gray-300 rounded-md p-2 w-full" />
                    </div>
                    <VeeErrorMessage :name="field.name" class="text-red-600 text-sm mt-1" />
                </div>
            </div>

            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Submit
            </button>
        </VeeForm>
    </div>
</template>
<script lang="ts" setup>
import {
    Field as VeeField,
    Form as VeeForm,
    ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import * as yup from 'yup'
import type { FieldConfig } from '../types';
const emit = defineEmits<{
    (e: 'submit', values: Record<string, any>): void
}>()
const props = defineProps<{
    fields: FieldConfig[]
    initialValues?: Record<string, any>
}>()
// Build validation schema dynamically
const schemaShape: Record<string, any> = {};
props.fields.forEach(field => {
    let validator = yup.mixed();

    schemaShape[field.name] = validator;
});
const schema = yup.object().shape(schemaShape);

</script>