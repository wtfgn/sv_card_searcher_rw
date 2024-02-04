<template>
  <div
    class="shadow-lg rounded-lg bg-white text-slate-800 dark:bg-slate-800 dark:text-white
      flex flex-col justify-between items-start p-4"
  >
    <h2 class="text-2xl font-bold text-center flex items-center justify-center sm:justify-start mb-2">
      <slot name="title" /> <!-- Add a title slot here -->
    </h2>
    <p class="mt-2 text-lg h-full mb-2">
      <slot name="description" /> <!-- Add a description slot here -->
    </p>
    <div class="self-end">
      <slot name="button" /> <!-- Add a button slot here -->
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
