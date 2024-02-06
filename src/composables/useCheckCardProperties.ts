import type { Card } from '@/types/card';

export function useCheckCardProperties() {
  // Check if the first digit is 9
  const isToken = (card: Card) => card.card_set_id.toString()[0] === '9';

  return {
    isToken,
  };
}
