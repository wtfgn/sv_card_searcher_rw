<template>
  <div class="dark:bg-slate-900 p-6">
    <h1 class="text-3xl mb-4 dark:text-white font-semibold">
      Card Searcher
    </h1>

    <div class="flex flex-col gap-4 md:flex-row md:items-start">
      <FilterPanel
        v-model:selectedProperties="filter"
        class="md:sticky md:top-[6.5rem] w-full md:w-2/6 xl:w-1/4 p-6 overflow-y-auto h-[80vh]"
      />

      <CardGallery
        :filtered-cards="filteredCards"
        :fetch-error="fetchError"
        class="w-full md:w-4/6 xl:w-3/4"
      >
        <template #heading>
          <h2
            class="text-2xl dark:text-white font-semibold p-6
          border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
          >
            Cards
          </h2>
        </template>

        <template #default />
      </CardGallery>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { watchDebounced } from '@vueuse/core';
import FilterPanel from '@/components/FilterPanel/FilterPanel.vue';
import CardGallery from '@/components/CardGallery/CardGallery.vue';
import { useFetchCards } from '@/composables/useFetchCards';
import type { Card, CardFilterProperty, CardProperty } from '@/types/card';
import type { UseFetchCardsReturn } from '@/composables/useFetchCards';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { language } = storeToRefs(userStore);

const filter = ref<CardFilterProperty>({
  cardName: '',
  clans: [],
  charTypes: [],
  tribeNames: [],
  cardSets: [],
  costs: [],
  atks: [],
  lifes: [],
  rarities: [],
  format: {} as CardProperty,
  restrictedCounts: [],
  resurgentProperty: {} as CardProperty,
});

const filteredCards = ref<Card[]>([]);
const fetchError = ref<Error | null>(null);

watchDebounced([filter, language], async () => {
  const { cards, error } = await useFetchCards(filter);
  filteredCards.value = cards.value;
  fetchError.value = error.value;
}, { debounce: 1000, maxWait: 2000, immediate: true, deep: true });
</script>
