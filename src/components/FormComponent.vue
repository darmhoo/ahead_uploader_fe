<template>
    <VeeForm :validation-schema="schema" :initial-values="initialValues" @submit="handleSubmit">
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
            <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-1">
                {{ field.label }}
            </label>

            <!-- FILE -->
            <VeeField v-if="field.type === 'file'" :name="field.name" v-slot="{ handleChange }">
                <input type="file" :id="field.name" @change="handleChange" class="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100" />
            </VeeField>

            <!-- SELECT -->
            <VeeField v-else-if="field.type === 'select'" :name="field.name" as="select" :id="field.name"
                class="w-full border border-gray-300 rounded-md p-2">
                <option value="">Select {{ field.name }}</option>
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </VeeField>

            <!-- TEXT (default) -->
            <VeeField v-else :name="field.name" :id="field.name" class="w-full border border-gray-300 rounded-md p-2" />

            <VeeErrorMessage :name="field.name" class="text-red-500 text-sm mt-1" />
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Submit
        </button>
    </VeeForm>
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

/**
 * Build schema dynamically
 */
const schema = yup.object(
    Object.fromEntries(
        props.fields.map(field => {
            if (field.type === 'file') {
                return [
                    field.name,
                    yup.mixed().required(`${field.name} is required`)
                ]
            }

            if (field.type === 'select') {
                return [
                    field.name,
                    yup.mixed().required(`Please select ${field.name}`)
                ]
            }

            return [
                field.name,
                yup.string().required(`${field.name} is required`)
            ]
        })
    )
)

/**
 * Emit validated values
 */
function handleSubmit(values: Record<string, any>) {
    emit('submit', values)
}
</script>
