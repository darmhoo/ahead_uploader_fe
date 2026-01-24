<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <img src="../assets/ahead.png" alt="Ahead Uploader Logo" class="mx-auto mb-6 w-20 h-20" />

        <div class="w-full max-w-xs">
            <Form @submit="onSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Username
                    </label>
                    <Field name="email" type="email" id="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email" />
                    <ErrorMessage name="email" class="text-red-500 text-xs italic mt-2" />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <Field name="password" type="password" id="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password" />
                    <ErrorMessage name="password" class="text-red-500 text-xs italic mt-2" />
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                </div>
            </Form>
        </div>
        <footer class="mt-8 text-gray-400 text-sm">&copy; 2026 Ahead Uploader. All rights reserved.</footer>
    </div>
</template>
<script setup lang="ts">

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { useAuthStore } from '../store/auth.store';
const authStore = useAuthStore();

defineRule('required', required);
defineRule('email', email);

configure({
    generateMessage: ctx => {
        const messages: Record<string, string> = {
            required: `${ctx.field} is required`,
            email: 'Please enter a valid email address',
        };
        return messages[ctx.rule?.name!] || `${ctx.field} is invalid`;
    },
});

function onSubmit(values: Record<string, any>) {
    // Handle login logic here
    authStore.login({ username: values.email, password: values.password });
}
</script>