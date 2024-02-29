import axios from 'axios';
import { type Ref, toValue } from 'vue';
import { ref } from 'vue';
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

  try {
    cards.value = null;
    error.value = null;

    const res = await axios.get(`${baseUrl}/cards`, {
      params: {
        ...useParseFilter(toValue(filter)),
        lang: language.value,
      },
    });
    cards.value = res.data;
  }
  catch (err) {
    error.value = err as Error;
  }

  return { cards, error };
}
