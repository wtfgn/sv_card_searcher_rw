<template>
  <ContainerTemplate>
    <template #heading>
      <slot name="heading">
        <h2
          class="text-2xl dark:text-white font-semibold py-6 mx-4
          border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"
        >
          Deck
          <span class="border-l pl-4 border-slate-900/10 dark:border-slate-50/[0.06] transition-colors">
            {{ totalCardCount }} / 40
          </span>
        </h2>
      </slot>
    </template>

    <template #default>
      <slot name="default" :cards-to-display="deck">
        <slot v-for="card in deck" :key="card.card_id" name="card" :card="card">
          <div>
            <CardImage :card="card" />
          </div>
        </slot>
      </slot>
    </template>
  </ContainerTemplate>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref } from 'vue';
import ContainerTemplate from '@/components/Template/ContainerTemplate.vue';
import CardImage from '@/components/CardGallery/CardImage.vue';
import type { CardInDeck } from '@/types/card';

const props = defineProps({
  deck: {
    type: Object as PropType<CardInDeck[]>,
    required: true,
  },
});

const totalCardCount = computed(() => {
  return props.deck.reduce((acc, c) => acc + c.count, 0);
});
</script>
