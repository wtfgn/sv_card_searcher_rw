import axios from 'axios';
import { type Ref, toValue, watch, watchEffect } from 'vue';
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { baseUrl } from '@/config/api';
import type { Card, CardFilterProperty } from '@/types/card';
import { useParseFilter } from '@/composables/useParseFilter';
import { useUserStore } from '@/stores/user';

export interface UseFetchCardsReturn {
  cards: Ref<Card[]>
  error: Ref<Error | null>
}

export async function useFetchCards(filter: CardFilterProperty | (() => CardFilterProperty) | Ref<CardFilterProperty>) {
  const userStore = useUserStore();
  const { language } = storeToRefs(userStore);
  const cards = ref<Card[] | null>(null);
  const error = ref<Error | null>(null);

  watchDebounced([filter, language], async () => {
    try {
      cards.value = null;
      error.value = null;

      const res = await axios.get(`${baseUrl}/cards`, {
        params: {
          ...useParseFilter(toValue(filter)),
          lang: userStore.language,
        },
      });
      cards.value = res.data;
    }
    catch (err) {
      error.value = err as Error;
    }
  }, {
    debounce: 1000,
    maxWait: 2000,
    immediate: true,
    deep: true,
  });

  return { cards, error };
}
