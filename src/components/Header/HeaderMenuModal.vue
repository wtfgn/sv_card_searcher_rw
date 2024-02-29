<template>
  <!-- Mobile Menu Modal -->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="$emit('closeModal')">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0  backdrop-blur-sm"
          :class="isDark ? 'bg-slate-900/80' : 'bg-black/20'"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="min-h-full p-4 text-center "
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="fixed top-4 right-4 w-full max-w-xs transform overflow-hidden rounded-2xl p-6 text-left text-base font-semibold align-middle shadow-xl transition-all"
              :class="isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-900'"
            >
              <button
                type="button" class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center"
                :class="isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'"
                @click="$emit('closeModal')"
              >
                <svg viewBox="0 0 10 10" class="w-2.5 h-2.5 overflow-visible" aria-hidden="true"><path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
              </button>

              <ul class="space-y-6">
                <li>
                  <RouterLink
                    to="/card_searcher"
                    :class="isDark ? 'hover:text-sky-400' : 'hover:text-sky-500'"
                  >
                    Card Searcher
                  </RouterLink>
                </li>

                <li>
                  <RouterLink
                    to="/deck_builder"
                    :class="isDark ? 'hover:text-sky-400' : 'hover:text-sky-500'"
                  >
                    Deck Builder
                  </RouterLink>
                </li>

                <li>
                  <a
                    href="https://github.com/wtfgn/sv_helper"
                    :class="isDark ? 'hover:text-sky-400' : 'hover:text-sky-500'"
                  >
                    Github
                  </a>
                </li>
              </ul>

              <!-- Theme Switch -->
              <div
                class="mt-6 pt-6 border-t"
                :class="isDark ? 'border-slate-200/10' : 'border-slate-200'"
              >
                <div class="flex items-center justify-between">
                  <span class="">Theme</span>

                  <button
                    class="p-1 rounded-full"
                    :class="isDark ? 'hover:bg-slate-50/[0.06]' : 'hover:bg-slate-900/10'"
                    @click="switchTheme"
                  >
                    <SunIcon v-if="!isDark" class="w-8 h-8" />
                    <MoonIcon v-else class="w-8 h-8" />
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { storeToRefs } from 'pinia';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
import { useUserStore } from '@/stores/user';

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['closeModal']);

const userStore = useUserStore();
const { switchTheme } = userStore;
const { isDark } = storeToRefs(userStore);
</script>
