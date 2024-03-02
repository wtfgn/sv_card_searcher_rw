<template>
  <ContainerTemplate>
    <template #heading>
      <h2
        class="text-2xl mb-6 pb-2 font-semibold border-b transition-colors"
        :class="isDark ? 'border-slate-50/[0.06] text-white' : 'border-slate-900/10'"
      >
        Filters
      </h2>
    </template>

    <template #default>
      <slot name="default">
        <div class="grid grid-cols-6 gap-4">
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
            class="w-full rounded text-lg col-span-full sm:col-span-2 md:col-span-full"
            :options="allowedCardProperties.costs"
            label="Cost"
            multiple
          />

          <!-- Attack -->
          <FilterPanelListBox
            v-model="selectedProperties.atks"
            class="w-full rounded text-lg col-span-3 sm:col-span-2 md:col-span-3"
            :options="allowedCardProperties.atks"
            label="Attack"
            multiple
          />

          <!-- Life -->
          <FilterPanelListBox
            v-model="selectedProperties.lifes"
            class="w-full rounded text-lg col-span-3 sm:col-span-2 md:col-span-3"
            :options="allowedCardProperties.lifes"
            label="Life"
            multiple
          />

          <!-- Tribe Name -->
          <FilterPanelListBox
            v-model="selectedProperties.tribeNames"
            class="w-full rounded text-lg col-span-full"
            :options="allowedCardProperties.tribeNames"
            label="Tribe Name"
            multiple
          />

          <!-- Restricted Count -->
          <FilterPanelListBox
            v-model="selectedProperties.restrictedCounts"
            class="w-full rounded text-lg col-span-full"
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
            :class="isDark
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-800'"
            class="px-4 py-2 rounded ml-4 transition-colors"
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
import type { PropType } from 'vue';
import FilterPanelRadioGroup from '@/components/FilterPanel/FilterPanelRadioGroup.vue';
import FilterPanelInput from '@/components/FilterPanel/FilterPanelInput.vue';
import FilterPanelListBox from '@/components/FilterPanel/FilterPanelListBox.vue';
import type { CardFilterProperty, CardProperty } from '@/types/card';
import { useUserStore } from '@/stores/user';
import { useCardProperties } from '@/composables/useCardProperties';
import ContainerTemplate from '@/components/Template/ContainerTemplate.vue';

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
const { language, isDark } = storeToRefs(userStore);
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
