<template>
  <nav class="flex items-center justify-center space-x-1 mt-4" aria-label="Pagination">
    <button
      class="px-3 py-1 rounded-l bg-gray-200 hover:bg-gray-300 text-gray-700"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Prev
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      class="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
      :class="{ 'bg-blue-500 text-white': page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button
      class="px-3 py-1 rounded-r bg-gray-200 hover:bg-gray-300 text-gray-700"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  modelValue: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['update:modelValue']);

const currentPage = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>