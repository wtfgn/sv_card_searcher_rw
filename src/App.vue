<template>
  <div :class="{ dark: isDark }" class="y">
    <!-- App -->
    <div class="text-black bg-slate-100 dark:bg-slate-900 dark:text-gray-200 h-full">
      <!-- Header -->
      <Header :is-dark="isDark" @toggle-theme="(newIsDark) => isDark = newIsDark" />

      <!-- Main Section -->
      <main class="mx-auto md:mx-10 p-4 min-h-screen h-full">
        <RouterView />
      </main>

      <!-- Footer -->

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const isDark = ref(false);
</script>

<style scoped>
</style>
