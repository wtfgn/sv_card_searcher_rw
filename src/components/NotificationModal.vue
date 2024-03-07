<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <div class="relative" :initial-focus="closeButton">
      <div class="fixed overflow-y-auto right-0 bottom-0">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="w-full rounded-2xl pt-6 p-4 max-w-xl transform overflow-hidden text-left text-base
              font-semibold shadow-xl align-middle transition-all
              ring-1 ring-slate-900/10 dark:ring-slate-50/[0.06] backdrop-blur-sm
              dark:bg-slate-800/[0.95] dark:text-slate-400 bg-white/[0.8] text-slate-900"
            >
              <button
                ref="closeButton"
                type="button"
                class="absolute top-3 right-3 md:top-5 md:right-5 w-8 h-8 flex items-center justify-center
                dark:text-slate-400 dark:hover:text-slate-300 text-slate-500 hover:text-slate-600"
                @click="$emit('closeModal')"
              >
                <svg viewBox="0 0 10 10" class="w-2.5 h-2.5 overflow-visible" aria-hidden="true"><path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
              </button>

              <h1
                class="text-xl xl:text-2xl md:mb-6 font-semibold rounded p-2 pl-0 text-slate-900 dark:text-white
                md:border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors flex flex-row items-center"
              >
                <component :is="iconComponent" class="h-8 w-8 rounded-full p-1 mr-1 transition-colors" :class="iconStyle" aria-hidden="true" />
                <span class="p-2 flex-1">
                  {{ notifactionData.title }}
                </span>
              </h1>

              <div class="mt-4 grid-cols-2 gap-4 hidden md:grid">
                <div class="col-span-full">
                  <p class="text-lg mb-2 font-semibold">
                    {{ notifactionData.message }}
                  </p>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import type { PropType } from 'vue';
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';

export interface NotificationData {
  title: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info' | 'default'
}

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  notifactionData: {
    type: Object as PropType<NotificationData>,
    required: true,
  },
});

defineEmits(['closeModal']);

const iconsData = {
  success: {
    icon: CheckIcon,
    color: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
  },
  error: {
    icon: ExclamationCircleIcon,
    color: 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100',
  },
  warning: {
    icon: ExclamationTriangleIcon,
    color: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
  },
  info: {
    icon: InformationCircleIcon,
    color: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
  },
  default: {
    icon: InformationCircleIcon,
    color: 'bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100',
  },
};

const iconStyle = computed(() => {
  return iconsData[props.notifactionData.type || 'default'].color;
});
const iconComponent = computed(() => {
  return iconsData[props.notifactionData.type || 'default'].icon;
});

const closeButton = ref<HTMLElement | null>(null);
</script>
