<template>
  <div class="sticky top-0 w-full z-10 bg-white/95 dark:bg-slate-900/75 dark:text-gray-200 drop-shadow-md backdrop-blur border-b border-slate-900/10 dark:border-slate-50/[0.06]">
    <div class="mx-auto max-w-9xl">
      <div class="flex items-center lg:px-8 lg:mx-0 py-4 mx-4">
        <!-- Logo -->
        <div class="flex items-center space-x-4 p-1">
          <a href="#" class="flex items-center">
            <span>
              <Logo class="w-10 h-10" />
            </span>
            <span class="text-xl font-bold text-black dark:text-gray-200 ml-4">
              Shadowverse Helper
            </span>
          </a>
        </div>

        <!-- Navigation -->
        <ul class="flex items-center space-x-6 ml-auto">
          <li class="text-black dark:text-slate-200 hover:text-slate-400 dark:hover:text-gray-400 md:hidden">
            <a href="#">
              <EllipsisVerticalIcon class="w-8 h-8" />
            </a>
          </li>

          <li class="text-black dark:text-slate-200 hidden md:block">
            <a href="#">
              <span class="p-1 md:block lg:hidden rounded-full hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06] ">
                <CardPickIcon class="w-8 h-8 " />
              </span>
              <span class="lg:block hidden hover:text-slate-400 dark:hover:text-slate-400">Card Searcher</span>
            </a>
          </li>

          <li class="text-black dark:text-slate-200 hidden md:block">
            <a href="#">
              <span class="p-1 md:block lg:hidden rounded-full hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06] ">
                <HammerIcon class="w-8 h-8" />
              </span>
              <span class="lg:block hidden hover:text-slate-400 dark:hover:text-slate-400">Deck Builder</span>
            </a>
          </li>
        </ul>

        <!-- Theme Switch -->
        <div class="hidden items-center ml-4 space-x-2 md:flex">
          <button class="p-1 rounded-full hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06]" @click="handleThemeBtnClick">
            <SunIcon v-if="!isDark" class="w-8 h-8" />
            <MoonIcon v-else class="w-8 h-8" />
          </button>

          <a class="p-1 rounded-full hover:bg-slate-900/10 dark:hover:bg-slate-50/[0.06]">
            <GtihubIcon class="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EllipsisVerticalIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';
import Logo from '@/components/Icons/Logo.vue';
import HammerIcon from '@/components/Icons/HammerIcon.vue';
import GtihubIcon from '@/components/Icons/GithubIcon.vue';
import CardPickIcon from '@/components/Icons/CardPickIcon.vue';

const props = defineProps<{
  isDark: boolean
}>();
const emit = defineEmits<{
  (event: 'toggleTheme', isDark: boolean): void
}>();

const isDark = computed({
  get() {
    return props.isDark;
  },
  set(newIsDark) {
    emit('toggleTheme', newIsDark);
  },
});

function handleThemeBtnClick() {
  isDark.value = !isDark.value;
}
</script>
