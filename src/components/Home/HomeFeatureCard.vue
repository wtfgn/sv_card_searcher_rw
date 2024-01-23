<template>
  <div
    class="shadow-lg rounded-lg bg-gradient-to-r from-slate-500 to-slate-600 text-white
      dark:from-slate-700 dark:to-slate-800 flex flex-col justify-between items-start"
  >
    <h2 class="text-2xl font-bold text-center flex items-center justify-center sm:justify-start">
      <slot name="title" /> <!-- Add a title slot here -->
    </h2>
    <p class="mt-2 text-lg h-full">
      <slot name="description" /> <!-- Add a description slot here -->
    </p>
    <slot name="button" /> <!-- Add a button slot here -->
  </div>
</template>

<script setup lang="ts">

</script>
