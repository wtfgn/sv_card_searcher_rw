<template>
  <div :class="{ dark: isDark }">
    <div class="text-black dark:text-gray-200 bg-slate-100 dark:bg-slate-900 transition-colors">
      <!-- App -->
      <div class="min-h-full">
        <div class="flex flex-col min-h-screen">
          <!-- Header -->
          <Header :is-dark="isDark" />

          <!-- Main Section -->
          <!-- mx-auto md:mx-10 px-4 p-4 -->
          <main class="flex-grow mx-auto md:mx-10 p-5">
            <RouterView />
          </main>

          <!-- Footer -->
          <Footer class="mt-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { isDark } = storeToRefs(userStore);
</script>

<style scoped>
</style>
