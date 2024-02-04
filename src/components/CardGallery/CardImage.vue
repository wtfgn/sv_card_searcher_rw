<template>
  <div class="relative">
    <img
      :src="imageUrl"
      :alt="props.card.card_name || 'Card Image'"
      class="relative top-0 left-0 w-[215px] h-[280px]"
    >

    <div
      class="absolute top-[31px] w-[132px] h-[18px]"
      :class="nameSpaceSizeClass"
    >
      <img
        :src="cardNameImgUrl"
        :alt="props.card.card_name || 'Card Name'"
        class="h-full mx-auto my-0"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import type { Card } from '@/types/card';
import { useUserStore } from '@/stores/user';

const props = defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true,
  },
});

const userStore = useUserStore();
const { language } = storeToRefs(userStore);

const imageUrl = computed(() => `https://shadowverse-portal.com/image/card/phase2/common/C/C_${props.card.card_id}.png`);
const cardNameImgUrl = computed(() => `https://shadowverse-portal.com/image/card/phase2/${language.value}/N/N_${props.card.card_id}.png`);
const nameSpaceSizeClass = computed(() =>
  (props.card.card_name?.length || 0) <= 11 ? 'left-[40px]' : 'left-[50px]',
);
</script>
