<template>
  <div
    class=" rounded border  shadow-lg transition-all"
    :class="isDark ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white border-gray-200 '"
  >
    <slot name="heading" />

    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { isDark } = storeToRefs(userStore);
</script>
