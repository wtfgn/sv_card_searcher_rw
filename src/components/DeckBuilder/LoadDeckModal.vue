<template>
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
          class="flex min-h-full items-center justify-center p-4 text-center "
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
              class="w-full rounded-2xl p-6 max-w-xl transform overflow-hidden text-left text-base font-semibold shadow-xl align-middle transition-all
              "
              :class="isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-900'"
            >
              <button
                type="button" class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center"
                :class="isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'"
                @click="$emit('closeModal')"
              >
                <svg viewBox="0 0 10 10" class="w-2.5 h-2.5 overflow-visible" aria-hidden="true"><path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
              </button>

              <DialogTitle
                class="text-2xl mb-6 pb-2 dark:text-white font-semibold
                border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
              >
                Load Deck
              </DialogTitle>

              <div class="mt-4 grid grid-cols-2 gap-4">
                <div class="col-span-full">
                  <h3 class="text-lg mb-2 font-semibold">
                    Portal Deck URL
                  </h3>
                  <FilterPanelInput
                    v-model="portalDeckUrl"
                    :disabled="!!deckCode"
                    placeholder="Example: https://shadowverse-portal.com/deck/3.1.6lZu2.6lZu2.6lZu2..."
                    class="w-full p-2 rounded text-base"
                    type="text"
                  />
                </div>

                <div class="col-span-full">
                  <h3 class="text-lg mb-2 font-semibold">
                    Deck Code
                  </h3>
                  <FilterPanelInput
                    v-model="deckCode"
                    :disabled="!!portalDeckUrl"
                    placeholder="Example: 6ax8"
                    class="w-full p-2 rounded text-base "
                    type="text"
                  />
                </div>
              </div>

              <div class="mt-8">
                <button
                  class="w-full px-4 py-2 text-xl col-span-full
                   rounded  transition-colors  font-semibold"
                  :class="isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-slate-200  text-slate-800 hover:bg-slate-300'"
                  @click="handleLoadDeckButtonClick"
                >
                  Load Deck
                </button>
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
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import FilterPanelInput from '../FilterPanel/FilterPanelInput.vue';
import { useUserStore } from '@/stores/user';
import type { CardInDeck } from '@/types/card';
import { baseUrl } from '@/config/api';

export interface ParsedDeckHashData {
  clanId: number | null
  deck: CardInDeck[] | null
  deckSize: number | null
  error: Error | null
  isFetching: boolean
}

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['closeModal', 'loadDeck']);

const portalDeckUrl = ref('');
const deckCode = ref('');

const userStore = useUserStore();
const { isDark } = storeToRefs(userStore);

const parsedDechHashData = ref<ParsedDeckHashData | null>(null);

function handleLoadDeckButtonClick() {
  if (portalDeckUrl.value)
    loadDeck(portalDeckUrl.value, 'portal');
  else if (deckCode.value)
    loadDeck(deckCode.value, 'code');

  emit('closeModal');
}

async function loadDeck(deckUrlOrCode: string, type: 'portal' | 'code') {
  let portalDeckUrl = '';
  let deckCode = '';
  let parsedDeckHashData: ParsedDeckHashData = {
    clanId: null,
    deck: null,
    deckSize: null,
    error: null,
    isFetching: true,
  };

  parsedDechHashData.value = parsedDeckHashData;

  if (type === 'portal') {
    portalDeckUrl = deckUrlOrCode;
    const deckHash = portalDeckUrl.substring(portalDeckUrl.search(/\d\.\d\./g), portalDeckUrl.search(/\?/g));
    parsedDeckHashData = await parseDeckHash(deckHash);
  }
  else if (type === 'code') {
    deckCode = deckUrlOrCode;
    const { hash } = await parseDeckCode(deckCode);
    parsedDeckHashData = await parseDeckHash(hash);
  }

  parsedDechHashData.value = parsedDeckHashData;
}

async function parseDeckHash(deckHash: string): Promise<ParsedDeckHashData> {
  let clanId: number | null = null;
  let deck: CardInDeck[] | null = null;
  let deckSize: number | null = null;
  let error: Error | null = null;

  try {
    const response = await axios.get(`${baseUrl}/deckhash/${deckHash}`);
    const data = response.data;
    clanId = data.craftId;
    deck = data.deck;
    deckSize = data.deckSize;
  }
  catch (e) {
    error = e as Error;
  }
  return { clanId, deck, deckSize, error, isFetching: false };
}

async function parseDeckCode(deckCode: string): Promise<{ hash: string, error: Error | null }> {
  let hash = '';
  let error: Error | null = null;
  try {
    const response = await axios.get(`https://svgdb.me/api/deckcode/${deckCode}`);
    hash = response.data.hash;
  }
  catch (e) {
    error = e as Error;
  }
  return { hash, error };
}

watchEffect(() => {
  if (!parsedDechHashData.value)
    return;
  emit('loadDeck', parsedDechHashData.value);
});
</script>
