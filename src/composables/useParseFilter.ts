import type { Ref } from 'vue';
import { toValue } from 'vue';
import type { CardFilterProperty } from '@/types/card';

export function useParseFilter(filter: CardFilterProperty | (() => CardFilterProperty) | Ref<CardFilterProperty>) {
  let params: Record<string, string | number | Array<string | number> | undefined> = {};

  const parseFilter = () => {
    const filterValue = toValue(filter);

    const convertCost = (costProperty: CardFilterProperty['costs']) => {
      const costs = costProperty?.map(cost => cost.id);
      if (costs?.includes(10))
        costs.splice(costs.indexOf(10), 1, ...Array.from({ length: 90 }, (_, i) => i + 10));

      return costs;
    };

    params = {
      card_name: filterValue.cardName,
      clan: filterValue.clans?.map(clan => clan.id),
      char_type: filterValue.charTypes?.map(charType => charType.id),
      tribe_name: filterValue.tribeNames?.map(tribeName => tribeName.id),
      card_set_id: filterValue.cardSets?.map(cardSet => cardSet.id),
      cost: convertCost(filterValue.costs),
      atk: filterValue.atks?.map(atk => atk.id),
      life: filterValue.lifes?.map(life => life.id),
      rarity: filterValue.rarities?.map(rarity => rarity.id),
      format_type: filterValue.format?.id,
      restricted_count: filterValue.restrictedCounts?.map(restrictedCount => restrictedCount.id),
      resurgent_card: filterValue.resurgentProperty?.id,
    };
  };

  parseFilter();

  return params;
}
