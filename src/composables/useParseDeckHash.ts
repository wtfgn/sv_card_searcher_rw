import { ref, toValue } from 'vue';
import axios from 'axios';
import type { ComposableParam } from '@/types/utility';
import type { CardInDeck } from '@/types/card';
import { baseUrl } from '@/config/api';

export interface ParsedDeckHashData {
  clanId: number | null
  deck: CardInDeck[] | null
  deckSize: number | null
}

export function useParseDeckHash() {
  const parsedDeckHashData = ref<ParsedDeckHashData | null>(null);
  const isParsingDeckHash = ref(false);
  const parseDeckHashError = ref<Error | null>(null);

  const parseDeckHash = async (deckHash: ComposableParam<string | null>) => {
    if (!toValue(deckHash))
      return;

    try {
      isParsingDeckHash.value = true;
      const response = await axios.get(`${baseUrl}/deckhash/${toValue(deckHash)}`);
      const data = response.data;
      parsedDeckHashData.value = {
        clanId: data.craftId,
        deck: data.deck,
        deckSize: data.deckSize,
      };
    }
    catch (err) {
      parseDeckHashError.value = err as Error;
    }
    finally {
      isParsingDeckHash.value = false;
    }
  };

  return {
    parsedDeckHashData,
    isParsingDeckHash,
    parseDeckHashError,
    parseDeckHash,
  };
}
