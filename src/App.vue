<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './store/auth.store';
import GlobalLoader from './components/GlobalLoader.vue';
import { useLoaderStore } from './store/loader.store';

const authStore = useAuthStore();
authStore.hydrate();

const loaderStore = useLoaderStore();

</script>

<template>
  <div>
    <global-loader v-if="loaderStore.loading" />
    <router-view />

  </div>
</template>

<style scoped></style>
