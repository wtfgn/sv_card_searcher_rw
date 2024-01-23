<template>
  <RouterLink
    :to="to"
    class="inline-flex items-center
      border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-700 hover:bg-slate-800
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
      dark:bg-slate-800 dark:hover:bg-slate-900 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900
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
