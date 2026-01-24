<template>
  <nav class="flex items-center justify-center space-x-1 mt-4" aria-label="Pagination">

    <!-- Prev -->
    <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700" :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)">
      Prev
    </button>

    <!-- Pages -->
    <button v-for="item in pages" :key="item.key" class="px-3 py-1 border border-gray-300 bg-white text-gray-700"
      :class="{
        'bg-blue-500 text-white': item.page === currentPage,
        'cursor-default': item.ellipsis
      }" @click="!item.ellipsis && goToPage(item.page)">
      {{ item.label }}
    </button>

    <!-- Next -->
    <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700" :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)">
      Next
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['page-change']);

const currentPage = computed(() => props.pagination.current_page);
const totalPages = computed(() => props.pagination.last_page);

/**
 * Build smart page list
 */
const pages = computed(() => {
  const cur = currentPage.value;
  const last = totalPages.value;
  const delta = 2; // pages around current

  const range = [];
  const rangeWithDots = [];

  // Always show first page
  range.push(1);

  // Pages around current
  for (let i = cur - delta; i <= cur + delta; i++) {
    if (i > 1 && i < last) {
      range.push(i);
    }
  }

  // Always show last page
  if (last > 1) {
    range.push(last);
  }

  // Remove duplicates & sort
  const unique = [...new Set(range)].sort((a, b) => a - b);

  // Insert ellipsis
  for (let i = 0; i < unique.length; i++) {
    const page = unique[i];
    const prev = unique[i - 1];

    if (prev && page - prev > 1) {
      rangeWithDots.push({
        key: `dots-${page}`,
        label: '...',
        ellipsis: true,
      });
    }

    rangeWithDots.push({
      key: `page-${page}`,
      page,
      label: page,
      ellipsis: false,
    });
  }

  return rangeWithDots;
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-change', page);
  }
}
</script>
