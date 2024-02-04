<template>
  <RouterLink
    :to="to"
    class="inline-flex items-center
    border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600/80 hover:bg-sky-700
    dark:text-sky-200 dark:bg-sky-700/15 dark:border-sky-600/15 dark:hover:bg-sky-700/25
    transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
  >
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
