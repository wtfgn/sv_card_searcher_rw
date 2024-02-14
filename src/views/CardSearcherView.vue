<template>
  <div class="dark:bg-slate-900 bg-slate-100 p-6 transition-colors">
    <h1 class="text-3xl mb-4 dark:text-white text-black font-bold">
      Card Searcher
    </h1>

    <div class="flex flex-col gap-4 md:flex-row md:items-start">
      <FilterPanel
        v-model:selectedProperties="filter"
        class="md:sticky md:top-[6.5rem] w-full md:w-2/6 xl:w-1/4 p-6 overflow-y-auto h-[80vh] mb-6"
      />

      <CardGallery
        :filtered-cards="filteredCards"
        :fetch-error="fetchError"
        class="w-full md:w-4/6 xl:w-3/4"
      >
        <template #heading>
          <h2
            class="text-2xl dark:text-white font-semibold py-6 mx-4
          border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
          >
            Cards
          </h2>
        </template>

        <template #card="{ card }">
          <div
            class="hover:shadow-lg transition-shadow duration-300 ease-in-out w-fit rounded-lg
          hover:transform hover:scale-105 justify-self-center"
          >
            <a :href="`https://shadowverse-portal.com/card/${card.card_id}?lang=${language}`">
              <CardImage :card="card" class="m-1" />
            </a>
          </div>
        </template>
      </CardGallery>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { watchDebounced } from '@vueuse/core';
import FilterPanel from '@/components/FilterPanel/FilterPanel.vue';
import CardGallery from '@/components/CardGallery/CardGallery.vue';
import { useFetchCards } from '@/composables/useFetchCards';
import type { Card, CardFilterProperty, CardProperty } from '@/types/card';
import CardImage from '@/components/CardGallery/CardImage.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { language } = storeToRefs(userStore);

const filteredCards = ref<Card[] | null>(null);
const fetchError = ref<Error | null>(null);

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

watchDebounced([filter, language], async () => {
  // Reset the state
  filteredCards.value = null;
  fetchError.value = null;

  const { cards, error } = await useFetchCards(filter);
  filteredCards.value = cards.value;
  fetchError.value = error.value;
}, {
  debounce: 500,
  immediate: true,
  deep: true,
  maxWait: 2000,
});
</script>
