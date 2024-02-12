import { ref, toValue, watchEffect } from 'vue';
import type { CardInDeck, CardProperty } from '@/types/card';
import type { ComposableParam } from '@/types/utility';

export function useGenerateDeckHash(deck: ComposableParam<CardInDeck[]>, clan: ComposableParam<CardProperty | null>) {
  const radix = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  const deckHash = ref<string>('');

  const generateDeckHash = () => {
    let deckHash = `1.${toValue(clan)?.id}.`;

    for (const card of toValue(deck)) {
      let temp = '';
      let tempKey = card.card_id;

      while (tempKey > 0) {
        temp += radix[tempKey % 64];
        tempKey = Math.floor(tempKey / 64);
      }

      deckHash += `${temp.split('').reverse().join('')}.`.repeat(card.count);
    }

    return deckHash.substring(0, deckHash.length - 1);
  };

  watchEffect(() => {
    deckHash.value = generateDeckHash();
  });

  return { deckHash };
}
