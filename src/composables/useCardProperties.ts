import {
  atkData,
  cardSetsData,
  charTypesData,
  clansData,
  costData,
  formatData,
  lifeData,
  rarityData,
  restrictedCountData,
  resurgentData,
  tribeNamesData,
} from '@/config/card_properties';
import type { useUserStore } from '@/stores/user';
import type { LangaugeType } from '@/types/user';

export function useCardProperties(language: LangaugeType) {
  const clans = clansData[language];
  const charTypes = charTypesData[language];
  const tribeNames = tribeNamesData[language];
  const cardSets = cardSetsData[language];
  const costs = costData;
  const atks = atkData;
  const lifes = lifeData;
  const rarities = rarityData[language];
  const formats = formatData[language];
  const restrictedCounts = restrictedCountData;
  const resurgentProperties = resurgentData[language];

  return {
    clans,
    charTypes,
    tribeNames,
    cardSets,
    costs,
    atks,
    lifes,
    rarities,
    formats,
    restrictedCounts,
    resurgentProperties,
  };
}
