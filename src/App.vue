<template>
  <div :class="{ dark: isDark }" class="y">
    <!-- App -->
    <div class="text-black bg-white dark:bg-slate-900 dark:text-gray-200 h-screen">
      <!-- Header -->
      <Header :is-dark="isDark" @toggle-theme="(newIsDark) => isDark = newIsDark" />

      <!-- Main -->
      <div class="">
        This is app
      </div>

      <!-- Footer -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/components/Header.vue';

const isDark = ref(false);
</script>

<style scoped>
</style>
