<template>
  <ContainerTemplate>
    <template #heading>
      <slot name="heading">
        <h2 class="text-2xl mb-4 dark:text-white font-semibold">
          Default Heading
        </h2>
      </slot>
    </template>

    <!-- Main content -->
    <template #default>
      <slot
        v-if="!props.fetchError && props.filteredCards"
        name="default"
        :cards-to-display="cardsToDisplay"
      >
        <!-- Default Content -->
        <div

          ref="defaultCardsContainerEle"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
          overflow-y-scroll mx-6 h-screen mb-10
          border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
        >
          <slot v-for="card in cardsToDisplay" :key="card.card_id" name="card" :card="card">
            <div>
              <CardImage :card="card" />
            </div>
          </slot>
        </div>
      </slot>

      <!-- Loading -->
      <slot v-else-if="!props.fetchError" name="loading">
        <div class="flex justify-center items-center h-96">
          <Spinner class="h-12 w-12 text-sky-600 dark:text-sky-400" />
        </div>
      </slot>

      <!-- Error -->
      <slot v-else name="error">
        <div class="flex justify-center items-center h-96">
          <p class="text-xl dark:text-white">
            {{ props.fetchError.message }}
          </p>
        </div>
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
    type: Array as PropType<Card[] | null>,
    required: true,
  },
  fetchError: {
    type: Object as PropType<Error | null>,
    default: undefined,
  },
  cardsContainerEle: {
    type: Object as PropType<HTMLElement | null>,
    default: null,
  },
  scrollDiection: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    default: 'bottom',
  },
});
const numToLoad = ref(20);
const cardsToDisplay = ref<Card[]>([]);

const defaultCardsContainerEle = ref<HTMLElement | null>(null);
const cardsContainerEle = computed(() => props.cardsContainerEle ?? defaultCardsContainerEle.value);

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
}, { distance: 10, direction: props.scrollDiection });

watchEffect(() => {
  if (!props.filteredCards)
    return;
  cardsToDisplay.value = props.filteredCards.slice(0, numToLoad.value);
});
</script>
