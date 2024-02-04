<template>
  <header
    class="sticky top-0 w-full z-20 bg-white/75 dark:bg-slate-900/75 dark:text-gray-200 drop-shadow-md backdrop-blur border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
  >
    <div class="mx-auto max-w-9xl">
      <div class="flex items-center lg:px-8 lg:mx-0 py-4 mx-4">
        <!-- Logo -->
        <div class="flex items-center space-x-4 p-1">
          <RouterLink to="/" class="flex items-center">
            <span class="flex-shrink-0">
              <Logo class="w-10 h-10 object-cover hover:animate-bounce200" />
            </span>
            <span class="text-xl font-bold text-black dark:text-gray-200 ml-4">
              Shadowverse Helper
            </span>
          </RouterLink>
        </div>

        <!-- Navigation -->
        <nav class="ml-auto">
          <ul class="flex items-center space-x-6">
            <HeaderNavItem to="/card_searcher" class="hidden md:block">
              <span class="p-1 md:block lg:hidden rounded-full hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06]">
                <CardPickIcon class="w-8 h-8 " />
              </span>
              <span class="lg:block hidden">Card Searcher</span>
            </HeaderNavItem>

            <HeaderNavItem to="/deck_builder" class="hidden md:block">
              <span class="p-1 md:block lg:hidden rounded-full hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06]">
                <HammerIcon class="w-8 h-8 " />
              </span>
              <span class="lg:block hidden">Deck Builder</span>
            </HeaderNavItem>
          </ul>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            class="p-1 rounded-md hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06]"
            @click="openModal"
          >
            <EllipsisVerticalIcon class="w-8 h-8" />
          </button>
        </div>

        <div class="hidden items-center ml-4 space-x-2 md:flex border-l border-slate-200 dark:border-slate-800 pl-3">
          <!-- Theme Switch -->
          <button
            class="p-1 rounded-full hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06]"
            @click="switchTheme"
          >
            <SunIcon v-if="!isDark" class="w-8 h-8" />
            <MoonIcon v-else class="w-8 h-8" />
          </button>

          <!-- Github Link -->
          <a
            href="https://github.com/wtfgn/sv_helper"
            class="p-1 rounded-full hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06]"
          >
            <GtihubIcon class="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Modal -->
  <div class="md:hidden">
    <HeaderMenuModal :is-open="isMobileMenuOpen" @close-modal="isMobileMenuOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { EllipsisVerticalIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import HeaderNavItem from './HeaderNavItem.vue';
import HeaderMenuModal from './HeaderMenuModal.vue';
import Logo from '@/components/Icons/Logo.vue';
import HammerIcon from '@/components/Icons/HammerIcon.vue';
import GtihubIcon from '@/components/Icons/GithubIcon.vue';
import CardPickIcon from '@/components/Icons/CardPickIcon.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { switchTheme } = userStore;
const { isDark } = storeToRefs(userStore);
const isMobileMenuOpen = ref(false);

function openModal() {
  isMobileMenuOpen.value = true;
}
</script>
