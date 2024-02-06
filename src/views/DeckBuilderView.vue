<template>
  <div class="relative dark:bg-slate-900 p-6">
    <!-- Toggle Filter Panel -->
    <button
      v-if="selectedClan"
      class="
      bottom-4 right-4 fixed
      bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300 z-20
      px-4 py-2 rounded ml-4 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      @click="toggleFilterPanel"
    >
      <AdjustmentsHorizontalIcon class="h-8 w-8" />
    </button>
    <h1 class="text-3xl mb-4 dark:text-white font-semibold">
      Deck Builder
    </h1>

    <div v-if="!selectedClan" class="flex flex-col gap-4 ">
      <h2 class="text-2xl dark:text-white font-semibold py-6 mx-4 border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors text-center">
        Select a clan to start building a deck
      </h2>

      <div class="flex flex-row flex-wrap justify-evenly items-center py-6 gap-4 mx-6 mb-10 ">
        <template v-for="clan in clans" :key="clan.id">
          <div
            v-if="clan.id !== 0"
            class="duration-300 ease-in-out w-fit hover:transform hover:scale-105 justify-self-center cursor-pointer"
            @click="handleSelecteClan(clan)"
          >
            <img
              :src="`/src/assets/clan_icons/${clan.id}.png`"
              :alt="clan.name"
              class="w-24 h-24 p-2 rounded-full hover:ring-2 hover:ring-slate-200 dark:hover:ring-slate-700 transition-all"
            >

            <p class="text-lg dark:text-white text-center">
              {{ clan.name }}
            </p>
          </div>
        </template>
      </div>
    </div>

    <div v-else class="flex flex-col space-y-4">
      <CardGallery
        :cards-container-ele="cardsContainerEle"
        :filtered-cards="filteredCards"
        :fetch-error="fetchError"
        class=""
        scroll-diection="right"
      >
        <template #heading>
          <h2
            class="text-2xl dark:text-white font-semibold py-6 mx-4
          border-b border-slate-900/10 dark:border-slate-50/[0.06]"
          >
            Cards
          </h2>
        </template>

        <template #default="{ cardsToDisplay }">
          <div
            ref="cardsContainerEle"
            class="flex gap-4
            overflow-x-scroll overflow-y-hidden mx-6 mb-10 py-4
            border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
          >
            <div
              v-for="card in cardsToDisplay"
              :key="card.card_id"
              class="shrink-0 hover:shadow-lg transition-shadow duration-300 ease-in-out w-fit rounded-lg
              hover:transform hover:scale-105 justify-self-center cursor-pointer"
              @click="addCardToDeck(card)"
            >
              <CardImage :card="card" class="m-1" />
            </div>
          </div>
        </template>
      </CardGallery>

      <ContainerTemplate class="w-full">
        <template #heading>
          <h2
            class="text-2xl dark:text-white font-semibold py-6 mx-4
            border-b border-slate-900/10 dark:border-slate-50/[0.06]"
          >
            Deck
            <span
              class="border-l pl-4 border-slate-900/10 dark:border-slate-50/[0.06]"
              :class="{ 'text-red-500 dark:text-red-400': !isValidDeck }"
            >
              {{ totalCardCountInDeck }} / 40
            </span>

            <button
              :disabled="!isValidDeck || !isSupported || copied"
              class="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300
              px-4 py-2 rounded ml-4 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
              @click="copy(deckUrl)"
            >
              {{ copied ? 'Copied!' : 'Copy Link' }}
            </button>
          </h2>
        </template>

        <div
          class="flex gap-4
            overflow-x-scroll overflow-y-hidden mx-6 mb-10 py-4
            border-b border-slate-900/10 dark:border-slate-50/[0.06]"
        >
          <p
            v-if="!builtDeck.length"
            class="text-lg text-center w-full text-black/45 dark:text-slate-300/45"
          >
            No cards in the deck
          </p>

          <div
            v-for="card in builtDeck"
            :key="card.card_id"
            class="relative shrink-0 hover:shadow-lg transition-shadow duration-300 ease-in-out w-fit rounded-lg
              hover:transform hover:scale-105 justify-self-center cursor-pointer"
            @click="removeFromDeck(card)"
          >
            <!-- Red layer -->
            <div v-if="!isValidCard(card)" class="absolute z-10 inset-0 bg-red-500 bg-opacity-50 rounded-lg" />

            <CardImage :card="card" class="m-1" />
            <p class="text-center dark:text-white">
              × {{ card.count }}
            </p>
          </div>
        </div>
      </ContainerTemplate>
    </div>

    <!-- Only one root element is allowed here -->
    <div>
      <FilterPanelModal
        v-model:isOpen="isFilterPanelModalOpen"
        v-model:selectedProperties="filter"
        :disabled-properties="disabledProperties"
        @close-modal="isFilterPanelModalOpen = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { useClipboard, watchDebounced } from '@vueuse/core';
import CardGallery from '@/components/CardGallery/CardGallery.vue';
import { useFetchCards } from '@/composables/useFetchCards';
import type { Card, CardFilterProperty, CardInDeck, CardProperty } from '@/types/card';
import CardImage from '@/components/CardGallery/CardImage.vue';
import FilterPanelModal from '@/components/FilterPanel/FilterPanelModal.vue';
import { useUserStore } from '@/stores/user';
import { clansData } from '@/config/card_properties';
import { useCardProperties } from '@/composables/useCardProperties';
import { useCheckCardProperties } from '@/composables/useCheckCardProperties';
import ContainerTemplate from '@/components/Template/ContainerTemplate.vue';

// const userStore = useUserStore();
// const { language } = storeToRefs(userStore);
const selectedClan = ref<CardProperty | undefined>(undefined);

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

const userStore = useUserStore();
const { language } = storeToRefs(userStore);
const clans = clansData[language.value];
const { isToken } = useCheckCardProperties();
const portalUrl = 'https://shadowverse-portal.com/deck/';

const filteredCards = ref<Card[] | null>(null);
const fetchError = ref<Error | null>(null);

const cardsContainerEle = ref<HTMLElement | null>(null);
const isFilterPanelModalOpen = ref(false);
const builtDeck = ref<CardInDeck[]>([]);

const disabledProperties = computed(() => {
  const disabledProperties: CardFilterProperty = {};
  // Disable other clans when a clan is selected, except for neutral
  if (selectedClan.value)
    disabledProperties.clans = clans.filter(clan => clan.id !== selectedClan.value?.id && clan.id !== 0);
  return disabledProperties;
});
const totalCardCountInDeck = computed(() => builtDeck.value.reduce((acc, c) => acc + c.count, 0));

function isValidCard(card: Card) {
  // If card format type is unlimited, check if the card is in the selected format
  // unlimited format card can only be added if the selected format is unlimited
  if (card.format_type === 0)
    return card.format_type === filter.value.format?.id;
  // If card format type is rotation, check if the selected format is rotation
  else
    return card.format_type === 1;
}

const isValidDeck = computed(() => {
  return totalCardCountInDeck.value === 40 && builtDeck.value.every(isValidCard);
});

function toggleFilterPanel() {
  isFilterPanelModalOpen.value = !isFilterPanelModalOpen.value;
}

function addCardToDeck(pickedCard: Card) {
  const cardInDeck = builtDeck.value.find(c => c.card_id === pickedCard.card_id);
  // Sum all count if they have the same base_card_id
  const totalCardCountByCard = builtDeck.value.filter(c => c.base_card_id === pickedCard.base_card_id).reduce((acc, c) => acc + c.count, 0);

  if (cardInDeck) {
    if (totalCardCountByCard < cardInDeck.restricted_count)
      cardInDeck.count += 1;
  }
  else {
    if (totalCardCountByCard < pickedCard.restricted_count)
      builtDeck.value.push({ ...pickedCard, count: 1 });
  }
}

function removeFromDeck(card: Card) {
  const cardInDeck = builtDeck.value.find(c => c.card_id === card.card_id);
  if (cardInDeck) {
    if (cardInDeck.count > 1)
      cardInDeck.count -= 1;
    else
      builtDeck.value = builtDeck.value.filter(c => c.card_id !== card.card_id);
  }
}

function handleSelecteClan(clan: CardProperty) {
  selectedClan.value = clan;
  filter.value.clans = [clan];
  filter.value.format = useCardProperties(language.value).formats[1];
}

const deckHash = computed(() => {
  const radix = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  let hash = `1.${selectedClan.value?.id}.`;

  for (const card of builtDeck.value) {
    let temp = '';
    let tempKey = card.card_id;

    while (tempKey > 0) {
      temp += radix[tempKey % 64];
      tempKey = Math.floor(tempKey / 64);
    }

    hash += `${temp.split('').reverse().join('')}.`.repeat(card.count);
  }

  return hash.substring(0, hash.length - 1);
});

const deckUrl = computed(() => portalUrl + deckHash.value);

const { copy, copied, isSupported } = useClipboard({ legacy: true, source: deckUrl });

watch(() => builtDeck, () => {
  // sort cards by cost
  builtDeck.value.sort((a, b) => a.cost - b.cost);
}, { deep: true });

watchDebounced([filter, language], async () => {
  // If no clan is selected, do nothing
  if (!selectedClan.value)
    return;
  // Reset the state
  filteredCards.value = null;
  fetchError.value = null;
  // Fetch cards
  const { cards, error } = await useFetchCards(filter);
  // Filter out tokens
  filteredCards.value = cards.value?.filter(card => !isToken(card)) ?? null;
  fetchError.value = error.value;
}, {
  debounce: 500,
  immediate: true,
  deep: true,
  maxWait: 2000,
});
</script>
