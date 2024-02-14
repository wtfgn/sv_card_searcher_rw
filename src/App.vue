<template>
  <div :class="{ dark: isDark }">
    <div class="font-mono text-black dark:text-gray-200 bg-slate-100 dark:bg-slate-900 transition-colors">
      <!-- App -->
      <div class="min-h-full">
        <div class="flex flex-col min-h-screen">
          <!-- Header -->
          <Header :is-dark="isDark" />

          <!-- Main Section -->
          <main class="">
            <RouterView v-slot="{ Component }">
              <template v-if="Component">
                <Transition
                  mode="out-in" name="fade"
                  enter-active-class="transition-opacity duration-300 ease-in-out"
                  leave-active-class="transition-opacity duration-300 ease-in-out"
                >
                  <KeepAlive>
                    <Suspense>
                      <!-- Main Content -->
                      <component :is="Component" />

                      <!-- Fallback -->
                      <template #fallback>
                        <div class="flex justify-center items-center h-96">
                          <Spinner />
                        </div>
                      </template>
                    </Suspense>
                  </KeepAlive>
                </Transition>
              </template>
            </RouterView>
          </main>

          <!-- Footer -->
          <Footer class="mt-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePreferredDark } from '@vueuse/core';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer.vue';
import { useUserStore } from '@/stores/user';
import Spinner from '@/components/Icons/Spinner.vue';

const userStore = useUserStore();
userStore.setTheme(usePreferredDark().value);
const { isDark } = storeToRefs(userStore);
</script>

<style scoped>
</style>
