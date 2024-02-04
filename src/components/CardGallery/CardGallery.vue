<template>
  <ContainerTemplate>
    <template #heading>
      {{ props.filteredCards }}
      {{ props.fetchError ?? 'NULL' }}
      <slot name="heading">
        <h2 class="text-2xl mb-4 dark:text-white font-semibold">
          Default Heading
        </h2>
      </slot>
    </template>

    <!-- Main content -->
    <template #default>
      <slot name="default" :cards-to-display="cardsToDisplay">
        <!-- Default Content -->
        <div
          v-if="!props.fetchError && props.filteredCards.length"
          ref="cardsContainerEle"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
          overflow-y-scroll mx-6 h-screen mb-10
          border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
        >
          <CardImage
            v-for="card in cardsToDisplay" :key="card.card_id" :card="card"
            class="mx-auto"
          />
        </div>

        <slot v-else-if="!props.fetchError" name="loading">
          <div class="flex justify-center items-center h-96">
            <Spinner class="h-12 w-12 text-sky-600 dark:text-sky-300" />
          </div>
        </slot>

        <slot v-else name="error">
          <div class="flex justify-center items-center h-96">
            <p class="text-xl dark:text-white">
              {{ props.fetchError.message }}
            </p>
          </div>
        </slot>
      </slot>
    </template>
  </ContainerTemplate>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useDebounceFn, useInfiniteScroll } from '@vueuse/core';
import ContainerTemplate from '../Template/ContainerTemplate.vue';
import Spinner from '../Icons/Spinner.vue';
import CardImage from '@/components/CardGallery/CardImage.vue';

import type { Card } from '@/types/card';

const props = defineProps({
  filteredCards: {
    type: Array as PropType<Card[]>,
    required: true,
  },
  fetchError: {
    type: Object as PropType<Error | null>,
    default: undefined,
  },
});

const cardsContainerEle = ref<HTMLElement | null>(null);
const numToLoad = ref(20);
const cardsToDisplay = ref<Card[]>([]);

useInfiniteScroll(cardsContainerEle, (_state) => {
  if (!props.filteredCards)
    return;

  cardsToDisplay.value = [
    ...cardsToDisplay.value,
    ...props.filteredCards.slice(
      cardsToDisplay.value.length,
      cardsToDisplay.value.length + numToLoad.value,
    ),
  ];
}, { distance: 10 });

watchEffect(() => {
  if (!props.filteredCards)
    return;
  cardsToDisplay.value = props.filteredCards.slice(0, numToLoad.value);
});
</script>
