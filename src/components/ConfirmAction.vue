<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-md">

      <div class="space-y-4">
        <h2 class="text-lg font-semibold">{{ title }}</h2>

        <p class="text-sm text-gray-600">
          {{ message }}
        </p>

        <div class="flex justify-end space-x-2 pt-4">
          <button
            class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            @click="close"
          >
            Cancel
          </button>

          <button
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            @click="confirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Dialog from './ui/dialog/Dialog.vue';
import DialogContent from './ui/dialog/DialogContent.vue';

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Confirm Action',
  },
  message: {
    type: String,
    default: 'Are you sure you want to continue?',
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const open = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

function close() {
  emit('update:modelValue', false);
}

function confirm() {
  emit('confirm');
  close();
}
</script>
