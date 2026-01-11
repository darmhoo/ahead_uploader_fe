<script setup lang="ts">
import { useLink } from 'vue-router';


</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <img src="../assets/ahead.png" alt="Ahead Uploader Logo" class="mx-auto mb-6 w-20 h-20" />
            <h1 class="text-3xl font-bold mb-4 text-gray-800">Welcome to Ahead Uploader</h1>
            <p class="text-gray-600 mb-6">Easily upload and manage your files with a fast, secure, and user-friendly
                interface.</p>
            <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mb-4">Get
                Started</button>
            <div class="mt-6">
                <p class="text-gray-500 mb-2">Already have an account?</p>
                <a href="/login">
                <button
                    class="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">Login</button>
                </a>
            </div>
        </div>
        <footer class="mt-8 text-gray-400 text-sm">&copy; 2026 Ahead Uploader. All rights reserved.</footer>
    </div>
</template>