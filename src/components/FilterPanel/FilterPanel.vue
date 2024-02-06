<template>
  <ContainerTemplate>
    <template #heading>
      <h2
        class="text-2xl mb-6 dark:text-white font-semibold
      border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
      >
        Filters
      </h2>
    </template>

    <template #default>
      <slot name="default">
        <div class="grid grid-cols-2 gap-4">
          <!-- Search -->
          <FilterPanelInput
            v-model="selectedProperties.cardName"
            class="w-full p-2 rounded text-lg col-span-full"
            placeholder="Search for a card"
            type="text"
          />

          <!-- Clan -->
          <FilterPanelListBox
            v-model="selectedProperties.clans"
            class="w-full rounded text-lg col-span-full"
            :options="allowedCardProperties.clans"
            label="Clan"
            multiple
          />

          <!-- Card Set -->
          <FilterPanelListBox
            v-model="selectedProperties.cardSets"
            class="w-full rounded text-lg col-span-full"
            :options="allowedCardProperties.cardSets"
            label="Card Set"
            multiple
          />

          <!-- Format -->
          <FilterPanelRadioGroup
            v-model="selectedProperties.format"
            class="w-full rounded text-lg col-span-full"
            :options="allowedCardProperties.formats"
            label="Format"
            options-container-class="flex flex-row gap-4 justify-evenly"
          />

          <!-- Character Type -->
          <FilterPanelListBox
            v-model="selectedProperties.charTypes"
            class="w-full rounded text-lg col-span-full"
            :options="allowedCardProperties.charTypes"
            label="Character Type"
            multiple
          />

          <!-- Rarity -->
          <FilterPanelListBox
            v-model="selectedProperties.rarities"
            class="w-full rounded text-lg col-span-full"
            :options="allowedCardProperties.rarities"
            label="Rarity"
            multiple
          />

          <!-- Cost -->
          <FilterPanelListBox
            v-model="selectedProperties.costs"
            class="w-full rounded text-lg col-span-full"
            :options="allowedCardProperties.costs"
            label="Cost"
            multiple
          />

          <!-- Attack -->
          <FilterPanelListBox
            v-model="selectedProperties.atks"
            class="w-full rounded text-lg"
            :options="allowedCardProperties.atks"
            label="Attack"
            multiple
          />

          <!-- Life -->
          <FilterPanelListBox
            v-model="selectedProperties.lifes"
            class="w-full rounded text-lg"
            :options="allowedCardProperties.lifes"
            label="Life"
            multiple
          />

          <!-- Tribe Name -->
          <FilterPanelListBox
            v-model="selectedProperties.tribeNames"
            class="w-full rounded text-lg"
            :options="allowedCardProperties.tribeNames"
            label="Tribe Name"
            multiple
          />

          <!-- Restricted Count -->
          <FilterPanelListBox
            v-model="selectedProperties.restrictedCounts"
            class="w-full rounded text-lg"
            :options="allowedCardProperties.restrictedCounts"
            label="Restricted Count"
            multiple
          />

          <!-- Resurgent -->
          <FilterPanelRadioGroup
            v-model="selectedProperties.resurgentProperty"
            class="w-full rounded text-lg col-span-full"
            :options="allowedCardProperties.resurgentProperties"
            label="Is Resurgent?"
            options-container-class="flex flex-row gap-4 justify-evenly"
          />

          <!-- Add more filters as needed -->
        </div>
      </slot>

      <!-- Button Bar -->
      <slot name="button-bar">
        <div class="flex justify-end mt-6">
          <button
            class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300
          px-4 py-2 rounded ml-4 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            @click="clearFilters"
          >
            Clear
          </button>
        </div>
      </slot>
    </template>
  </ContainerTemplate>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { RadioGroupDescription, RadioGroupLabel } from '@headlessui/vue';
import axios from 'axios';
import type { PropType } from 'vue';
import { watchDebounced } from '@vueuse/core';
import FilterPanelRadioGroup from '@/components/FilterPanel/FilterPanelRadioGroup.vue';
import FilterPanelComboBox from '@/components/FilterPanel/FilterPanelComboBox.vue';
import FilterPanelInput from '@/components/FilterPanel/FilterPanelInput.vue';
import FilterPanelListBox from '@/components/FilterPanel/FilterPanelListBox.vue';
import { baseUrl } from '@/config/api';
import type { Card, CardFilterProperty, CardProperty } from '@/types/card';
import { useUserStore } from '@/stores/user';
import { useCardProperties } from '@/composables/useCardProperties';
import { useFetchCards } from '@/composables/useFetchCards';
import ContainerTemplate from '@/components/Template/ContainerTemplate.vue';
import type { UseFetchCardsReturn } from '@/composables/useFetchCards';

const props = defineProps({
  disabledProperties: {
    type: Object as PropType<CardFilterProperty>,
  },
});

const selectedProperties = defineModel<CardFilterProperty>('selectedProperties', {
  type: Object as PropType<CardFilterProperty>,
  required: true,
});

const userStore = useUserStore();
const { language } = storeToRefs(userStore);
const {
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
} = useCardProperties(language.value);

const allowedCardProperties = computed(() => {
  return {
    clans: clans.filter(clan => !props.disabledProperties?.clans?.includes(clan)),
    charTypes: charTypes.filter(charType => !props.disabledProperties?.charTypes?.includes(charType)),
    tribeNames: tribeNames.filter(tribeName => !props.disabledProperties?.tribeNames?.includes(tribeName)),
    cardSets: cardSets.filter(cardSet => !props.disabledProperties?.cardSets?.includes(cardSet)),
    costs: costs.filter(cost => !props.disabledProperties?.costs?.includes(cost)),
    atks: atks.filter(atk => !props.disabledProperties?.atks?.includes(atk)),
    lifes: lifes.filter(life => !props.disabledProperties?.lifes?.includes(life)),
    rarities: rarities.filter(rarity => !props.disabledProperties?.rarities?.includes(rarity)),
    formats: formats.filter(format => props.disabledProperties?.format?.id !== format.id),
    restrictedCounts: restrictedCounts.filter(restrictedCount => !props.disabledProperties?.restrictedCounts?.includes(restrictedCount)),
    resurgentProperties: resurgentProperties.filter(resurgentProperty => props.disabledProperties?.resurgentProperty?.id !== resurgentProperty.id),
  };
});

function clearFilters() {
  selectedProperties.value = {
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
  };
}
</script>
